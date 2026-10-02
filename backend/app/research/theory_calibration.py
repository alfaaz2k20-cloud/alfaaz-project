"""Theory-specified measurement models for research and synthetic verification.

Nothing in this module creates production thresholds, bands, or participant scores.
Empirical parameters must be supplied separately before production use is possible.
Hard separation is maintained between:
- THEORY
- SYNTHETIC / ALGORITHMIC VERIFICATION
- EMPIRICAL ESTIMATION
- EMPIRICAL VALIDATION
"""

from __future__ import annotations

from dataclasses import dataclass
from enum import Enum
from math import sqrt
from typing import Mapping, Sequence


class ProvenanceState(str, Enum):
    THEORY_SPECIFIED = "THEORY_SPECIFIED"
    MODEL_IMPLEMENTED = "MODEL_IMPLEMENTED"
    ALGORITHMICALLY_VERIFIED = "ALGORITHMICALLY_VERIFIED"
    EMPIRICALLY_ESTIMATED = "EMPIRICALLY_ESTIMATED"
    EMPIRICALLY_VALIDATED = "EMPIRICALLY_VALIDATED"


class DataClassification(str, Enum):
    SYNTHETIC = "SYNTHETIC"
    EMPIRICAL = "EMPIRICAL"


class MarginProvenance(str, Enum):
    THEORY_SPECIFIED_MARGIN = "THEORY_SPECIFIED_MARGIN"
    EMPIRICALLY_JUSTIFIED_MARGIN = "EMPIRICALLY_JUSTIFIED_MARGIN"


_STATE_ORDER: tuple[ProvenanceState, ...] = (
    ProvenanceState.THEORY_SPECIFIED,
    ProvenanceState.MODEL_IMPLEMENTED,
    ProvenanceState.ALGORITHMICALLY_VERIFIED,
    ProvenanceState.EMPIRICALLY_ESTIMATED,
    ProvenanceState.EMPIRICALLY_VALIDATED,
)


def advance_provenance(current: ProvenanceState, target: ProvenanceState) -> ProvenanceState:
    """Permit only adjacent lifecycle transitions; empirical validation cannot be skipped.

    Lifecycle:
      THEORY_SPECIFIED -> MODEL_IMPLEMENTED -> ALGORITHMICALLY_VERIFIED ->
      EMPIRICALLY_ESTIMATED -> EMPIRICALLY_VALIDATED
    """
    if not isinstance(current, ProvenanceState) or not isinstance(target, ProvenanceState):
        raise TypeError("current and target must be ProvenanceState instances")
    current_idx = _STATE_ORDER.index(current)
    target_idx = _STATE_ORDER.index(target)
    if target_idx != current_idx + 1:
        raise ValueError(
            f"Illegal provenance transition: cannot advance from {current.value} to {target.value}. "
            "Provenance must advance strictly one adjacent state at a time."
        )
    return target


# -----------------------------------------------------------------------------
# Explicit Provenance & Verification Artifacts
# -----------------------------------------------------------------------------

@dataclass(frozen=True)
class TheorySpecification:
    construct_id: str
    rationale: str
    provenance: ProvenanceState = ProvenanceState.THEORY_SPECIFIED
    data_classification: DataClassification = DataClassification.SYNTHETIC

    def __post_init__(self) -> None:
        if not self.construct_id.strip() or not self.rationale.strip():
            raise ValueError("TheorySpecification requires non-empty construct_id and rationale")
        if self.provenance != ProvenanceState.THEORY_SPECIFIED:
            raise ValueError("TheorySpecification provenance must be THEORY_SPECIFIED")


@dataclass(frozen=True)
class SyntheticModelFixture:
    fixture_id: str
    description: str
    data_classification: DataClassification = DataClassification.SYNTHETIC
    provenance: ProvenanceState = ProvenanceState.ALGORITHMICALLY_VERIFIED

    def __post_init__(self) -> None:
        if not self.fixture_id.strip() or not self.description.strip():
            raise ValueError("SyntheticModelFixture requires non-empty fixture_id and description")
        if self.data_classification != DataClassification.SYNTHETIC:
            raise ValueError("SyntheticModelFixture must have data_classification=SYNTHETIC")
        if self.provenance not in {ProvenanceState.MODEL_IMPLEMENTED, ProvenanceState.ALGORITHMICALLY_VERIFIED}:
            raise ValueError("SyntheticModelFixture provenance must be MODEL_IMPLEMENTED or ALGORITHMICALLY_VERIFIED")


@dataclass(frozen=True)
class AlgorithmicallyVerifiedArtifact:
    artifact_id: str
    fixture: SyntheticModelFixture
    verification_method: str
    status: ProvenanceState = ProvenanceState.ALGORITHMICALLY_VERIFIED
    data_classification: DataClassification = DataClassification.SYNTHETIC

    def __post_init__(self) -> None:
        if not isinstance(self.fixture, SyntheticModelFixture):
            raise TypeError("AlgorithmicallyVerifiedArtifact requires a SyntheticModelFixture")
        if self.fixture.data_classification != DataClassification.SYNTHETIC:
            raise ValueError("Fixture data_classification must be SYNTHETIC")
        if self.status != ProvenanceState.ALGORITHMICALLY_VERIFIED:
            raise ValueError("AlgorithmicallyVerifiedArtifact status must be ALGORITHMICALLY_VERIFIED")


@dataclass(frozen=True)
class EmpiricalStudyReference:
    study_id: str
    dataset_reference: str
    reviewer: str
    estimation_timestamp: str
    data_classification: DataClassification = DataClassification.EMPIRICAL

    def __post_init__(self) -> None:
        if not (self.study_id.strip() and self.dataset_reference.strip() and self.reviewer.strip() and self.estimation_timestamp.strip()):
            raise ValueError("EmpiricalStudyReference requires non-empty study_id, dataset_reference, reviewer, and estimation_timestamp")
        if self.data_classification != DataClassification.EMPIRICAL:
            raise ValueError("EmpiricalStudyReference must have data_classification=EMPIRICAL")


@dataclass(frozen=True)
class IndicatorParameter:
    intercept: float
    loading: float
    error_variance: float

    def __post_init__(self) -> None:
        if self.loading == 0:
            raise ValueError("loading cannot be zero")
        if self.error_variance <= 0:
            raise ValueError("error_variance must be positive")


@dataclass(frozen=True)
class EmpiricalParameterBundle:
    parameter_id: str
    parameters: Mapping[str, IndicatorParameter]
    study_reference: EmpiricalStudyReference
    reviewer: str
    parameter_version: str
    covariance_matrix: Mapping[str, Mapping[str, float]] | None = None
    provenance: ProvenanceState = ProvenanceState.EMPIRICALLY_ESTIMATED
    data_classification: DataClassification = DataClassification.EMPIRICAL

    def __post_init__(self) -> None:
        if not isinstance(self.study_reference, EmpiricalStudyReference):
            raise TypeError("EmpiricalParameterBundle requires a valid EmpiricalStudyReference")
        if self.study_reference.data_classification != DataClassification.EMPIRICAL:
            raise ValueError("EmpiricalStudyReference data_classification must be EMPIRICAL")
        if self.data_classification != DataClassification.EMPIRICAL:
            raise ValueError("EmpiricalParameterBundle must have data_classification=EMPIRICAL")
        if not self.reviewer.strip() or not self.parameter_version.strip():
            raise ValueError("reviewer and parameter_version must not be empty")
        if len(self.parameters) < 2:
            raise ValueError("parameters must contain at least 2 indicators")
        loadings = [p.loading for p in self.parameters.values()]
        if len(set(loadings)) == 1:
            raise ValueError("equal loadings cannot be assumed without empirical support")
        if self.provenance not in {ProvenanceState.EMPIRICALLY_ESTIMATED, ProvenanceState.EMPIRICALLY_VALIDATED}:
            raise ValueError("EmpiricalParameterBundle provenance must be EMPIRICALLY_ESTIMATED or EMPIRICALLY_VALIDATED")


@dataclass(frozen=True)
class EmpiricallyValidatedArtifact:
    artifact_id: str
    parameter_bundle: EmpiricalParameterBundle
    validation_evidence_reference: str
    review_record: str
    status: ProvenanceState = ProvenanceState.EMPIRICALLY_VALIDATED
    data_classification: DataClassification = DataClassification.EMPIRICAL

    def __post_init__(self) -> None:
        if not isinstance(self.parameter_bundle, EmpiricalParameterBundle):
            raise TypeError("EmpiricallyValidatedArtifact requires a valid EmpiricalParameterBundle")
        if not self.validation_evidence_reference.strip() or not self.review_record.strip():
            raise ValueError("validation_evidence_reference and review_record must not be empty")
        if self.status != ProvenanceState.EMPIRICALLY_VALIDATED:
            raise ValueError("status must be EMPIRICALLY_VALIDATED")
        if self.data_classification != DataClassification.EMPIRICAL:
            raise ValueError("data_classification must be EMPIRICAL")


# -----------------------------------------------------------------------------
# Common-Scale Linking Governance
# -----------------------------------------------------------------------------

@dataclass(frozen=True)
class RawIndicator:
    indicator_id: str
    value: float
    standard_error: float
    measure_id: str

    def __post_init__(self) -> None:
        if not self.indicator_id.strip() or not self.measure_id.strip():
            raise ValueError("indicator_id and measure_id must not be empty")
        if self.standard_error <= 0:
            raise ValueError("standard_error must be strictly positive")


@dataclass(frozen=True)
class LinkingModel:
    source_measure_id: str
    target_scale_id: str
    transformation_type: str
    transformation_parameters: Mapping[str, float]
    parameter_provenance: ProvenanceState
    model_version: str
    status: str
    study_reference: EmpiricalStudyReference | None = None
    synthetic_fixture: SyntheticModelFixture | None = None

    def __post_init__(self) -> None:
        if not self.source_measure_id.strip() or not self.target_scale_id.strip():
            raise ValueError("source_measure_id and target_scale_id must be non-empty")
        if self.transformation_type not in {"LINEAR", "IDENTITY"}:
            raise ValueError(f"Unsupported transformation_type: {self.transformation_type}")
        if self.parameter_provenance in {ProvenanceState.EMPIRICALLY_ESTIMATED, ProvenanceState.EMPIRICALLY_VALIDATED}:
            if not isinstance(self.study_reference, EmpiricalStudyReference):
                raise ValueError("Empirically estimated LinkingModel requires EmpiricalStudyReference")
            if self.status != "EMPIRICALLY_ESTIMATED":
                raise ValueError("Empirical LinkingModel status must be EMPIRICALLY_ESTIMATED")
        else:
            if not isinstance(self.synthetic_fixture, SyntheticModelFixture):
                raise ValueError("Synthetic/algorithmic LinkingModel requires SyntheticModelFixture")
            if self.status != "SYNTHETIC_FIXTURE":
                raise ValueError("Synthetic LinkingModel status must be SYNTHETIC_FIXTURE")


@dataclass(frozen=True)
class CommonScaleIndicator:
    value: float
    standard_error: float
    scale_id: str
    indicator_id: str
    provenance: ProvenanceState = ProvenanceState.ALGORITHMICALLY_VERIFIED
    linking_model_version: str = "synthetic_v1"

    def __post_init__(self) -> None:
        if not self.scale_id.strip() or not self.indicator_id.strip():
            raise ValueError("scale_id and indicator_id must not be empty")
        if self.standard_error <= 0:
            raise ValueError("standard_error must be strictly positive")


def link_indicator(raw: RawIndicator, model: LinkingModel) -> CommonScaleIndicator:
    """Transform a RawIndicator into a CommonScaleIndicator using a verified LinkingModel."""
    if not isinstance(raw, RawIndicator) or not isinstance(model, LinkingModel):
        raise TypeError("raw must be RawIndicator and model must be LinkingModel")
    if raw.measure_id != model.source_measure_id:
        raise ValueError(
            f"Cannot link raw indicator measure '{raw.measure_id}' with model configured for '{model.source_measure_id}'"
        )
    if model.transformation_type in {"LINEAR", "IDENTITY"}:
        slope = model.transformation_parameters.get("slope", 1.0)
        intercept = model.transformation_parameters.get("intercept", 0.0)
        if slope == 0:
            raise ValueError("Slope cannot be zero in linear transformation")
        linked_val = raw.value * slope + intercept
        linked_se = raw.standard_error * abs(slope)
        return CommonScaleIndicator(
            value=linked_val,
            standard_error=linked_se,
            scale_id=model.target_scale_id,
            indicator_id=raw.indicator_id,
            provenance=model.parameter_provenance,
            linking_model_version=model.model_version,
        )
    raise ValueError(f"Unsupported transformation_type: {model.transformation_type}")


# -----------------------------------------------------------------------------
# Delta & Equivalence Margin Governance
# -----------------------------------------------------------------------------

@dataclass(frozen=True)
class EquivalenceMargin:
    margin_id: str
    construct_scope: str
    numeric_margins: Mapping[str, float]
    derivation_method: str
    supporting_evidence_reference: str
    provenance: MarginProvenance
    review_record: str
    status: str

    def __post_init__(self) -> None:
        if not self.margin_id.strip() or not self.construct_scope.strip():
            raise ValueError("margin_id and construct_scope must not be empty")
        small_max = self.numeric_margins.get("small_max", 0.0)
        material_max = self.numeric_margins.get("material_max", 0.0)
        if small_max <= 0 or material_max <= small_max:
            raise ValueError("numeric_margins requires ordered positive margins: 0 < small_max < material_max")
        if self.provenance == MarginProvenance.EMPIRICALLY_JUSTIFIED_MARGIN:
            if not self.supporting_evidence_reference.strip() or not self.review_record.strip():
                raise ValueError("EMPIRICALLY_JUSTIFIED_MARGIN requires supporting_evidence_reference and review_record")
            if self.status not in {"EMPIRICALLY_ESTIMATED", "EMPIRICALLY_VALIDATED"}:
                raise ValueError("Empirically justified margin status must be EMPIRICALLY_ESTIMATED or EMPIRICALLY_VALIDATED")
        else:
            if self.provenance != MarginProvenance.THEORY_SPECIFIED_MARGIN:
                raise ValueError("provenance must be THEORY_SPECIFIED_MARGIN or EMPIRICALLY_JUSTIFIED_MARGIN")


@dataclass(frozen=True)
class DeltaPolicy:
    """Wrapper / policy for equivalence margins in research comparisons."""
    small_max: float
    material_max: float
    justification: str
    provenance: ProvenanceState
    margin_provenance: MarginProvenance = MarginProvenance.THEORY_SPECIFIED_MARGIN
    evidence_reference: str = ""
    review_record: str = ""

    def __post_init__(self) -> None:
        if not self.justification.strip() or self.small_max <= 0 or self.material_max <= self.small_max:
            raise ValueError("delta margins require a non-empty justification and ordered positive margins")
        if self.provenance in {ProvenanceState.EMPIRICALLY_ESTIMATED, ProvenanceState.EMPIRICALLY_VALIDATED}:
            if self.margin_provenance != MarginProvenance.EMPIRICALLY_JUSTIFIED_MARGIN:
                raise ValueError("Empirically claimed delta policy requires EMPIRICALLY_JUSTIFIED_MARGIN")
            if not self.evidence_reference.strip() or not self.review_record.strip():
                raise ValueError("Empirically claimed delta policy requires evidence_reference and review_record")
        else:
            if self.margin_provenance == MarginProvenance.EMPIRICALLY_JUSTIFIED_MARGIN:
                raise ValueError("Non-empirical provenance cannot carry EMPIRICALLY_JUSTIFIED_MARGIN")


def evaluate_delta(
    left: CommonScaleIndicator,
    right: CommonScaleIndicator,
    policy: EquivalenceMargin | DeltaPolicy,
    *,
    covariance: float = 0.0,
) -> dict[str, float | str]:
    """Compare already-linked indicators; never accepts raw SJT or game values.

    Until empirical margin evidence exists, substantive delta categories
    (DELTA_SMALL, DELTA_MATERIAL, DELTA_LARGE) remain NOT_DETERMINED;
    only DELTA_WITHIN_MEASUREMENT_ERROR can be evaluated against observed uncertainty.
    """
    if not isinstance(left, CommonScaleIndicator) or not isinstance(right, CommonScaleIndicator):
        raise TypeError("left and right must be CommonScaleIndicator instances")
    if left.scale_id != right.scale_id:
        raise ValueError("indicators must be linked to the same common scale")

    variance = left.standard_error ** 2 + right.standard_error ** 2 - 2 * covariance
    if variance < 0:
        raise ValueError("covariance implies negative standard-error-of-difference variance")

    difference = abs(left.value - right.value)
    standard_error_difference = sqrt(variance)

    if difference <= standard_error_difference:
        state = "DELTA_WITHIN_MEASUREMENT_ERROR"
        note = "Difference is within standard error of measurement difference."
    else:
        # Check whether empirical margin justification is present
        is_empirical_margin = False
        small_max = 0.0
        material_max = 0.0

        if isinstance(policy, EquivalenceMargin):
            if policy.provenance == MarginProvenance.EMPIRICALLY_JUSTIFIED_MARGIN:
                is_empirical_margin = True
                small_max = policy.numeric_margins["small_max"]
                material_max = policy.numeric_margins["material_max"]
        elif isinstance(policy, DeltaPolicy):
            if policy.margin_provenance == MarginProvenance.EMPIRICALLY_JUSTIFIED_MARGIN and policy.provenance in {
                ProvenanceState.EMPIRICALLY_ESTIMATED,
                ProvenanceState.EMPIRICALLY_VALIDATED,
            }:
                is_empirical_margin = True
                small_max = policy.small_max
                material_max = policy.material_max

        if not is_empirical_margin:
            state = "NOT_DETERMINED"
            note = (
                "Substantive delta classification requires EMPIRICALLY_JUSTIFIED_MARGIN. "
                "Theoretical or synthetic margins cannot classify beyond measurement error."
            )
        else:
            if difference <= small_max:
                state = "DELTA_SMALL"
            elif difference <= material_max:
                state = "DELTA_MATERIAL"
            else:
                state = "DELTA_LARGE"
            note = "Classified against empirically justified margin."

    return {
        "state": state,
        "difference": difference,
        "standard_error_difference": standard_error_difference,
        "note": note,
    }


# -----------------------------------------------------------------------------
# Latent Construct Model Safeguards
# -----------------------------------------------------------------------------

@dataclass(frozen=True)
class LatentModel:
    parameter: str
    indicators: Mapping[str, IndicatorParameter]
    parameter_bundle: EmpiricalParameterBundle | None = None
    synthetic_fixture: SyntheticModelFixture | None = None
    provenance: ProvenanceState = ProvenanceState.ALGORITHMICALLY_VERIFIED

    def __post_init__(self) -> None:
        if not self.parameter.strip():
            raise ValueError("parameter must be non-empty")
        if self.provenance in {ProvenanceState.EMPIRICALLY_ESTIMATED, ProvenanceState.EMPIRICALLY_VALIDATED}:
            if not isinstance(self.parameter_bundle, EmpiricalParameterBundle):
                raise TypeError("Empirically estimated LatentModel requires an EmpiricalParameterBundle")
            if self.parameter_bundle.data_classification != DataClassification.EMPIRICAL:
                raise ValueError("EmpiricalParameterBundle must have data_classification=EMPIRICAL")
            if self.indicators != self.parameter_bundle.parameters:
                raise ValueError("LatentModel indicators must match parameter_bundle parameters")
        else:
            if not isinstance(self.synthetic_fixture, SyntheticModelFixture):
                raise TypeError("Synthetic/algorithmic LatentModel requires a SyntheticModelFixture")
            if self.synthetic_fixture.data_classification != DataClassification.SYNTHETIC:
                raise ValueError("SyntheticModelFixture must have data_classification=SYNTHETIC")

        if len(self.indicators) < 2 or any(p.loading == 0 or p.error_variance <= 0 for p in self.indicators.values()):
            raise ValueError("latent models require at least two non-zero-loading indicators with positive error variance")
        if len({p.loading for p in self.indicators.values()}) == 1:
            raise ValueError("equal loadings cannot be assumed without empirical support")


def estimate_latent(model: LatentModel, observations: Mapping[str, float]) -> dict[str, float | str]:
    """Inverse-variance linked construct estimate; never termed 'true score'.

    Only available for empirically parameterized models or verified algorithmic test fixtures.
    """
    if not isinstance(model, LatentModel):
        raise TypeError("model must be a LatentModel instance")
    if set(observations) != set(model.indicators):
        raise ValueError("all and only model indicators must be present")

    transformed: list[tuple[float, float]] = []
    for indicator_id, observed in observations.items():
        param = model.indicators[indicator_id]
        transformed.append(((observed - param.intercept) / param.loading, param.error_variance / (param.loading ** 2)))

    weight_sum = sum(1 / variance for _, variance in transformed)
    estimate = sum(value / variance for value, variance in transformed) / weight_sum
    standard_error = sqrt(1 / weight_sum)

    return {
        "latent_construct_estimate": estimate,
        "estimate": estimate,
        "standard_error": standard_error,
        "provenance": model.provenance.value,
    }


# -----------------------------------------------------------------------------
# Binomial Precision
# -----------------------------------------------------------------------------

@dataclass(frozen=True)
class ProportionPrecision:
    estimate: float
    standard_error: float
    opportunities: int
    provenance: ProvenanceState = ProvenanceState.MODEL_IMPLEMENTED


def binomial_precision(successes: int, opportunities: int) -> ProportionPrecision:
    """Design-based sampling precision, not an empirical reliability coefficient."""
    if not isinstance(successes, int) or not isinstance(opportunities, int) or not 0 < opportunities or not 0 <= successes <= opportunities:
        raise ValueError("successes must be an integer between zero and opportunities")
    estimate = successes / opportunities
    return ProportionPrecision(estimate, sqrt(estimate * (1 - estimate) / opportunities), opportunities)


# -----------------------------------------------------------------------------
# Authoritative 21-Game Specification Catalogue
# -----------------------------------------------------------------------------

@dataclass(frozen=True)
class GameMeasurementSpec:
    game_id: str
    parameter: str
    world: str
    observation_structure: str
    extractor_state: str
    observed_feature: str
    construct_link: str
    expected_direction: str
    precision_method: str
    expected_sjt_relationship: str
    sibling_relationship: str
    discriminant_relationship: str
    accessibility_note: str
    empirical_requirement: str
    provenance: ProvenanceState = ProvenanceState.THEORY_SPECIFIED


def _spec(
    game_id: str,
    parameter: str,
    world: str,
    observation_structure: str,
    feature: str,
    link: str,
    direction: str,
    method: str,
    accessibility: str = "Inspect device, modality, and accessibility effects; do not interpret timing as construct level.",
) -> GameMeasurementSpec:
    return GameMeasurementSpec(
        game_id,
        parameter,
        world,
        observation_structure,
        "ACTIVE" if game_id in {"A1", "A2"} else "QUARANTINED",
        feature,
        link,
        direction,
        method,
        "Convergent hypothesis only; estimate against the same-parameter SJT indicator with empirical data.",
        "Sibling tasks may covary through the shared construct and task-specific method variance.",
        "Relationships with other parameters are discriminant hypotheses, not expected equivalence.",
        accessibility,
        "Estimate distribution, task-appropriate reliability, convergence, discriminant evidence, and fairness with consented human data.",
    )


GAME_SPECS: tuple[GameMeasurementSpec, ...] = (
    _spec("F1", "empathy", "W1 The Frequency", "6 trials", "cue_response_latency_ms", "responsive attention to cues", "Contextual response pattern; speed alone is not interpreted.", "trial-level variance / test-retest"),
    _spec("F2", "empathy", "W1 The Frequency", "4 ambiguity trials", "clarification_vs_assumption_ratio", "information-seeking under ambiguity", "Higher clarification proportion", "binomial/proportion precision"),
    _spec("F3", "empathy", "W1 The Frequency", "3 context transitions", "post_shift_adaptation_latency_ms", "context-sensitive response adjustment", "Adjustment pattern; speed alone is not interpreted.", "transition-level variance / test-retest"),
    _spec("A1", "conscientiousness", "W2 The Archive", "5 classification items", "classification_rule_adherence_rate", "rule-guided classification", "Higher correct classification proportion", "binomial/proportion precision"),
    _spec("A2", "conscientiousness", "W2 The Archive", "at least 3 genuine exception opportunities; clean controls excluded", "exception_flagging_precision", "exception-sensitive rule application", "Higher correct genuine-exception proportion", "binomial/proportion precision with the locked N>=3 gate"),
    _spec("A3", "conscientiousness", "W2 The Archive", "5 quality-control records", "error_detection_sensitivity", "quality-control checking", "Higher detection and lower false alarms", "signal-detection / binomial precision"),
    _spec("C1", "collaborative_spirit", "W3 The Shared Canvas", "3 rounds", "need_sensitive_sharing_index", "need-sensitive resource sharing", "More need-sensitive allocation", "multilevel round variance / test-retest"),
    _spec("C2", "collaborative_spirit", "W3 The Shared Canvas", "3 coordinated placement rounds", "coordination_collision_avoidance_rate", "coordination with a partner representation", "Higher collision avoidance", "binomial/proportion precision"),
    _spec("C3", "collaborative_spirit", "W3 The Shared Canvas", "3 breakdown/recovery opportunities", "constructive_repair_score", "repair following coordination breakdown", "More constructive repair pattern", "episode-level variance / test-retest"),
    _spec("E1", "emotional_agility", "W4 The Shifting Grid", "9 trials: baseline T1-T3, shift T4, recovery T5-T9", "perseverative_error_count", "adaptation after a rule change", "Fewer post-shift perseverative errors", "change-point/recovery-curve variance"),
    _spec("E2", "emotional_agility", "W4 The Shifting Grid", "4 sequences: 3 disrupted and 1 control", "cadence_stability_ratio", "stability through disruption", "Contextual stability relative to control", "within-person disrupted-versus-control contrast"),
    _spec("E3", "emotional_agility", "W4 The Shifting Grid", "3 condition transitions with unchanged input modality", "strategy_shift_efficiency", "strategy adjustment across conditions", "Higher efficient adjustment", "transition-level variance / test-retest"),
    _spec("Q1", "curiosity", "W5 The Hidden Gallery", "4 required decisions plus optional resources and useful/low-value controls", "optional_alcove_exploration_rate", "selective exploration", "More useful exploration, not indiscriminate activity", "choice-model / binomial precision"),
    _spec("Q2", "curiosity", "W5 The Hidden Gallery", "4 exploration opportunities", "anomaly_investigation_depth", "investigation of anomaly cues", "Greater investigation depth", "ordinal/episode-level variance"),
    _spec("Q3", "curiosity", "W5 The Hidden Gallery", "3 ambiguity/integration episodes", "integrated_insight_utilization", "using retrieved context in downstream choices", "More supported integration", "episode-level variance / test-retest"),
    _spec("CR1", "creative_initiative", "W6 The Broken Tool", "2 construction stages with multiple valid solutions", "solution_uniqueness_index", "flexible construction under open constraints", "Diverse functional solutions, not a single correct answer", "variance components with human-coded criterion only if independently rated"),
    _spec("CR2", "creative_initiative", "W6 The Broken Tool", "3 constraint-shift episodes", "creative_pivot_latency_ms", "reframing after constraints change", "Pivot pattern; speed alone is not interpreted.", "episode-level variance / test-retest"),
    _spec("CR3", "creative_initiative", "W6 The Broken Tool", "3 tool-use opportunities", "functional_fixedness_overcome_rate", "flexible use of available affordances", "Higher functional adaptation proportion", "binomial/proportion precision"),
    _spec("M1", "motivation", "W7 The Repetition", "3 mandatory units", "mandatory_cadence_consistency", "sustained engagement through mandatory units", "Contextual consistency; timing alone is not interpreted.", "within-task variance / test-retest"),
    _spec("M2", "motivation", "W7 The Repetition", "3 mandatory, explicit finish/continue, up to 3 optional", "optional_units_completed", "voluntary continuation after required work", "More voluntary units conditional on opportunity", "right-censored count / survival model"),
    _spec("M3", "motivation", "W7 The Repetition", "3 mandatory, up to 3 voluntary, explicit stop, reduced feedback, right-censored", "reduced_feedback_persistence_count", "persistence under reduced feedback", "More voluntary continuation conditional on opportunity", "right-censored count / survival model"),
)

PARAMETERS: tuple[str, ...] = tuple(dict.fromkeys(spec.parameter for spec in GAME_SPECS))
