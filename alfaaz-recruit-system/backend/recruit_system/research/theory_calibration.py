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


# -----------------------------------------------------------------------------
# Stage 2: Theory-Driven Calibration & Identifiability Architecture
# -----------------------------------------------------------------------------

class IdentifiabilityClass(str, Enum):
    MODEL_NUMERICALLY_ESTIMABLE = "MODEL_NUMERICALLY_ESTIMABLE"
    MODEL_BOUND_ESTIMABLE = "MODEL_BOUND_ESTIMABLE"
    PRIOR_RANGE_ONLY = "PRIOR_RANGE_ONLY"
    EMPIRICAL_DATA_REQUIRED = "EMPIRICAL_DATA_REQUIRED"


@dataclass(frozen=True)
class TheoryPrior:
    component_id: str
    parameter: str
    lower_bound: float | None
    upper_bound: float | None
    central_assumption: float | None
    rationale: str
    source_type: str
    status: str = "THEORY_DERIVED"
    sensitivity_class: str = "MODERATE"

    def __post_init__(self) -> None:
        if not self.component_id.strip() or not self.parameter.strip():
            raise ValueError("component_id and parameter must not be empty")
        if self.lower_bound is not None and self.upper_bound is not None:
            if self.lower_bound > self.upper_bound:
                raise ValueError("lower_bound cannot exceed upper_bound")
        if self.status not in {"THEORY_DERIVED", "MODEL_BASED"}:
            raise ValueError("status must be THEORY_DERIVED or MODEL_BASED")


@dataclass(frozen=True)
class GameMeasurementCalibration:
    game_id: str
    parameter: str
    world: str
    observed_indicator: str
    estimand: str
    identifiability: IdentifiabilityClass
    observation_count: int
    formula: str | None
    worst_case_se: float | None
    nominal_se_range: tuple[float, float] | None
    theoretical_bounds: tuple[float, float] | None
    missing_empirical_parameters: tuple[str, ...]
    empirical_requirement_to_identify: str
    priors: tuple[TheoryPrior, ...] = ()


GAME_CALIBRATIONS: tuple[GameMeasurementCalibration, ...] = (
    # W1: The Frequency (empathy)
    GameMeasurementCalibration(
        game_id="F1",
        parameter="empathy",
        world="W1 The Frequency",
        observed_indicator="cue_response_latency_ms",
        estimand="Within-person mean response latency and trial-level latency variance across 6 audio cues",
        identifiability=IdentifiabilityClass.EMPIRICAL_DATA_REQUIRED,
        observation_count=6,
        formula=None,
        worst_case_se=None,
        nominal_se_range=None,
        theoretical_bounds=(150.0, 10000.0),
        missing_empirical_parameters=(
            "population_mean_latency_ms",
            "between_person_variance",
            "within_person_trial_variance",
            "test_retest_icc",
        ),
        empirical_requirement_to_identify=(
            "Requires repeated-measures latency telemetry from consented human participants to separate "
            "attentional attunement from individual baseline motor speed."
        ),
        priors=(
            TheoryPrior(
                "F1_latency_bounds", "empathy", 150.0, 10000.0, None,
                "Physiological motor reaction time limit (150ms) to UI interaction timeout (10000ms)",
                "PHYSIOLOGICAL_MOTOR_LIMIT",
            ),
        ),
    ),
    GameMeasurementCalibration(
        game_id="F2",
        parameter="empathy",
        world="W1 The Frequency",
        observed_indicator="clarification_vs_assumption_ratio",
        estimand="Binomial proportion p = clarifications / 4 of clarifying ambiguous interpersonal cues",
        identifiability=IdentifiabilityClass.MODEL_NUMERICALLY_ESTIMABLE,
        observation_count=4,
        formula="SE(p) = sqrt(p * (1 - p) / 4)",
        worst_case_se=0.2500,
        nominal_se_range=(0.0, 0.2500),
        theoretical_bounds=(0.0, 1.0),
        missing_empirical_parameters=(
            "population_trait_mean",
            "true_score_variance",
            "latent_factor_loading",
        ),
        empirical_requirement_to_identify=(
            "Design identifies sampling standard error SE(p)=sqrt(p(1-p)/4); trait reliability requires "
            "candidate variance across human participants."
        ),
        priors=(
            TheoryPrior(
                "F2_proportion_bounds", "empathy", 0.0, 1.0, 0.5,
                "Binomial proportion range across 4 ambiguity trials", "TASK_DESIGN_BOUND",
            ),
        ),
    ),
    GameMeasurementCalibration(
        game_id="F3",
        parameter="empathy",
        world="W1 The Frequency",
        observed_indicator="post_shift_adaptation_latency_ms",
        estimand="Mean adaptation latency across 3 acoustic context transitions",
        identifiability=IdentifiabilityClass.EMPIRICAL_DATA_REQUIRED,
        observation_count=3,
        formula=None,
        worst_case_se=None,
        nominal_se_range=None,
        theoretical_bounds=(150.0, 10000.0),
        missing_empirical_parameters=(
            "baseline_context_latency",
            "transition_shift_effect",
            "transition_variance",
        ),
        empirical_requirement_to_identify=(
            "Requires human context-updating distributions to separate cognitive perspective taking "
            "from general sensory deceleration."
        ),
        priors=(
            TheoryPrior(
                "F3_transition_bounds", "empathy", 150.0, 10000.0, None,
                "Physiological motor reaction time limit to task timeout across transitions",
                "PHYSIOLOGICAL_MOTOR_LIMIT",
            ),
        ),
    ),

    # W2: The Archive (conscientiousness)
    GameMeasurementCalibration(
        game_id="A1",
        parameter="conscientiousness",
        world="W2 The Archive",
        observed_indicator="classification_rule_adherence_rate",
        estimand="Binomial proportion p = k / 5 of rule-guided document classifications",
        identifiability=IdentifiabilityClass.MODEL_NUMERICALLY_ESTIMABLE,
        observation_count=5,
        formula="SE(p) = sqrt(p * (1 - p) / 5)",
        worst_case_se=round(0.5 / sqrt(5), 4),
        nominal_se_range=(0.0, round(0.5 / sqrt(5), 4)),
        theoretical_bounds=(0.0, 1.0),
        missing_empirical_parameters=(
            "population_adherence_distribution",
            "test_retest_stability",
            "latent_factor_loading",
        ),
        empirical_requirement_to_identify=(
            "Sampling error model SE(p)=sqrt(p(1-p)/5) is fully identified by design; empirical reliability "
            "requires observed between-person variance."
        ),
        priors=(
            TheoryPrior(
                "A1_adherence_bounds", "conscientiousness", 0.0, 1.0, 0.8,
                "Classification proportion bounded in [0, 1] across 5 items", "TASK_DESIGN_BOUND",
            ),
        ),
    ),
    GameMeasurementCalibration(
        game_id="A2",
        parameter="conscientiousness",
        world="W2 The Archive",
        observed_indicator="exception_flagging_precision",
        estimand="Binomial proportion p = k / N_genuine of genuine exceptions flagged (N_genuine >= 3, controls excluded)",
        identifiability=IdentifiabilityClass.MODEL_NUMERICALLY_ESTIMABLE,
        observation_count=3,
        formula="SE(p) = sqrt(p * (1 - p) / N_genuine) for N_genuine >= 3",
        worst_case_se=round(0.5 / sqrt(3), 4),
        nominal_se_range=(0.0, round(0.5 / sqrt(3), 4)),
        theoretical_bounds=(0.0, 1.0),
        missing_empirical_parameters=(
            "population_exception_detection_rate",
            "false_positive_control_rate",
            "population_trait_variance",
        ),
        empirical_requirement_to_identify=(
            "Locked N>=3 gate enforces minimum sampling stability; empirical human testing is required "
            "for ROC sensitivity and false alarm rate."
        ),
        priors=(
            TheoryPrior(
                "A2_genuine_bounds", "conscientiousness", 0.0, 1.0, 0.67,
                "Genuine exception precision bounded in [0, 1] for N>=3 genuine opportunities",
                "TASK_DESIGN_BOUND",
            ),
        ),
    ),
    GameMeasurementCalibration(
        game_id="A3",
        parameter="conscientiousness",
        world="W2 The Archive",
        observed_indicator="error_detection_sensitivity",
        estimand="Signal detection sensitivity d' across 5 QC records (3 error, 2 clean control)",
        identifiability=IdentifiabilityClass.MODEL_BOUND_ESTIMABLE,
        observation_count=5,
        formula="d' = z(H) - z(F) with log-linear boundary correction",
        worst_case_se=None,
        nominal_se_range=None,
        theoretical_bounds=(-3.0, 3.0),
        missing_empirical_parameters=(
            "population_hit_rate",
            "population_false_alarm_rate",
            "decision_criterion_c",
        ),
        empirical_requirement_to_identify=(
            "Requires human proofreading records to estimate empirical d' and separate vigilance from "
            "conservative response bias."
        ),
        priors=(
            TheoryPrior(
                "A3_sensitivity_bounds", "conscientiousness", -3.0, 3.0, 0.0,
                "Log-linear corrected d' effective observable range across 3 signal and 2 noise records",
                "SAMPLING_MODEL",
            ),
        ),
    ),

    # W3: The Shared Canvas (collaborative_spirit)
    GameMeasurementCalibration(
        game_id="C1",
        parameter="collaborative_spirit",
        world="W3 The Shared Canvas",
        observed_indicator="need_sensitive_sharing_index",
        estimand="Mean resource allocation proportion conditional on partner need state across 3 rounds",
        identifiability=IdentifiabilityClass.MODEL_BOUND_ESTIMABLE,
        observation_count=3,
        formula=None,
        worst_case_se=None,
        nominal_se_range=None,
        theoretical_bounds=(0.0, 1.0),
        missing_empirical_parameters=(
            "round_to_round_covariance",
            "partner_need_weighting_parameter",
            "between_person_sharing_variance",
        ),
        empirical_requirement_to_identify=(
            "Requires human multi-round gameplay to estimate intraclass correlation (ICC) across rounds."
        ),
        priors=(
            TheoryPrior(
                "C1_sharing_bounds", "collaborative_spirit", 0.0, 1.0, 0.5,
                "Sharing proportion bounded [0, 1] across 3 allocation rounds", "TASK_DESIGN_BOUND",
            ),
        ),
    ),
    GameMeasurementCalibration(
        game_id="C2",
        parameter="collaborative_spirit",
        world="W3 The Shared Canvas",
        observed_indicator="coordination_collision_avoidance_rate",
        estimand="Binomial proportion p = k / 3 of collision-free coordinated placements",
        identifiability=IdentifiabilityClass.MODEL_NUMERICALLY_ESTIMABLE,
        observation_count=3,
        formula="SE(p) = sqrt(p * (1 - p) / 3)",
        worst_case_se=round(0.5 / sqrt(3), 4),
        nominal_se_range=(0.0, round(0.5 / sqrt(3), 4)),
        theoretical_bounds=(0.0, 1.0),
        missing_empirical_parameters=(
            "coordination_learning_slope",
            "motor_trajectory_confound",
            "population_coordination_variance",
        ),
        empirical_requirement_to_identify=(
            "Sampling error is identified by N=3; empirical data required to disentangle motor trajectory "
            "slips from genuine social coordination."
        ),
        priors=(
            TheoryPrior(
                "C2_collision_bounds", "collaborative_spirit", 0.0, 1.0, 0.67,
                "Avoidance rate bounded [0, 1] across 3 placement rounds", "TASK_DESIGN_BOUND",
            ),
        ),
    ),
    GameMeasurementCalibration(
        game_id="C3",
        parameter="collaborative_spirit",
        world="W3 The Shared Canvas",
        observed_indicator="constructive_repair_score",
        estimand="Mean constructive repair index across 3 breakdown episodes",
        identifiability=IdentifiabilityClass.MODEL_BOUND_ESTIMABLE,
        observation_count=3,
        formula=None,
        worst_case_se=None,
        nominal_se_range=None,
        theoretical_bounds=(0.0, 1.0),
        missing_empirical_parameters=(
            "breakdown_response_covariance",
            "repair_strategy_frequencies",
            "test_retest_reliability",
        ),
        empirical_requirement_to_identify=(
            "Requires human breakdown recovery logs to evaluate inter-episode consistency and repair persistence."
        ),
        priors=(
            TheoryPrior(
                "C3_repair_bounds", "collaborative_spirit", 0.0, 1.0, 0.5,
                "Repair score bounded [0, 1] across 3 breakdown episodes", "TASK_DESIGN_BOUND",
            ),
        ),
    ),

    # W4: The Shifting Grid (emotional_agility)
    GameMeasurementCalibration(
        game_id="E1",
        parameter="emotional_agility",
        world="W4 The Shifting Grid",
        observed_indicator="perseverative_error_count",
        estimand="Integer count of perseverative errors k in {0..5} on recovery trials T5-T9 after rule shift T4",
        identifiability=IdentifiabilityClass.MODEL_BOUND_ESTIMABLE,
        observation_count=9,
        formula="k in {0..5}; for error proportion p=k/5, SE(p) = sqrt(p * (1 - p) / 5)",
        worst_case_se=round(0.5 / sqrt(5), 4),
        nominal_se_range=(0.0, round(0.5 / sqrt(5), 4)),
        theoretical_bounds=(0.0, 5.0),
        missing_empirical_parameters=(
            "baseline_reinforcement_strength",
            "hazard_of_rule_adaptation",
            "population_error_distribution",
        ),
        empirical_requirement_to_identify=(
            "Requires human set-shifting trials to fit change-point recovery curves and estimate perseveration rate."
        ),
        priors=(
            TheoryPrior(
                "E1_error_bounds", "emotional_agility", 0.0, 5.0, 1.0,
                "Integer perseverative error count bounded [0, 5] on trials T5-T9", "TASK_DESIGN_BOUND",
            ),
        ),
    ),
    GameMeasurementCalibration(
        game_id="E2",
        parameter="emotional_agility",
        world="W4 The Shifting Grid",
        observed_indicator="cadence_stability_ratio",
        estimand="Ratio of cadence variance in 3 disrupted sequences relative to 1 control baseline sequence",
        identifiability=IdentifiabilityClass.EMPIRICAL_DATA_REQUIRED,
        observation_count=4,
        formula=None,
        worst_case_se=None,
        nominal_se_range=None,
        theoretical_bounds=(0.0, 10.0),
        missing_empirical_parameters=(
            "baseline_cadence_std",
            "disruption_shock_variance",
            "recovery_half_life",
        ),
        empirical_requirement_to_identify=(
            "Variance ratio requires empirical baseline timing distributions from human gameplay."
        ),
        priors=(
            TheoryPrior(
                "E2_ratio_bounds", "emotional_agility", 0.0, 10.0, 1.0,
                "Cadence variance ratio relative to baseline control", "THEORETICAL_CONJECTURE",
            ),
        ),
    ),
    GameMeasurementCalibration(
        game_id="E3",
        parameter="emotional_agility",
        world="W4 The Shifting Grid",
        observed_indicator="strategy_shift_efficiency",
        estimand="Mean strategy adjustment efficiency across 3 modality-stable condition transitions",
        identifiability=IdentifiabilityClass.MODEL_BOUND_ESTIMABLE,
        observation_count=3,
        formula=None,
        worst_case_se=None,
        nominal_se_range=None,
        theoretical_bounds=(0.0, 1.0),
        missing_empirical_parameters=(
            "transition_efficiency_distribution",
            "learning_curve_parameters",
        ),
        empirical_requirement_to_identify=(
            "Requires human strategy selection data across consecutive rule shifts."
        ),
        priors=(
            TheoryPrior(
                "E3_efficiency_bounds", "emotional_agility", 0.0, 1.0, 0.5,
                "Efficiency index bounded [0, 1] across 3 condition transitions", "TASK_DESIGN_BOUND",
            ),
        ),
    ),

    # W5: The Hidden Gallery (curiosity)
    GameMeasurementCalibration(
        game_id="Q1",
        parameter="curiosity",
        world="W5 The Hidden Gallery",
        observed_indicator="optional_alcove_exploration_rate",
        estimand="Binomial proportion p = k / 4 of useful optional resources inspected (N_useful = 4)",
        identifiability=IdentifiabilityClass.MODEL_NUMERICALLY_ESTIMABLE,
        observation_count=4,
        formula="SE(p) = sqrt(p * (1 - p) / 4)",
        worst_case_se=0.2500,
        nominal_se_range=(0.0, 0.2500),
        theoretical_bounds=(0.0, 1.0),
        missing_empirical_parameters=(
            "curiosity_utility_weighting",
            "low_value_control_click_rate",
            "between_person_variance",
        ),
        empirical_requirement_to_identify=(
            "Requires human data to calibrate the discrete choice model separating informational "
            "exploration from random clicking."
        ),
        priors=(
            TheoryPrior(
                "Q1_exploration_bounds", "curiosity", 0.0, 1.0, 0.5,
                "Exploration proportion bounded [0, 1] across 4 useful optional resources",
                "TASK_DESIGN_BOUND",
            ),
        ),
    ),
    GameMeasurementCalibration(
        game_id="Q2",
        parameter="curiosity",
        world="W5 The Hidden Gallery",
        observed_indicator="anomaly_investigation_depth",
        estimand="Mean multi-stage inspection depth across 4 exploration opportunities",
        identifiability=IdentifiabilityClass.MODEL_BOUND_ESTIMABLE,
        observation_count=4,
        formula=None,
        worst_case_se=None,
        nominal_se_range=None,
        theoretical_bounds=(0.0, 3.0),
        missing_empirical_parameters=(
            "investigation_stopping_hazard",
            "depth_scale_properties",
        ),
        empirical_requirement_to_identify=(
            "Requires human clickstream logs to estimate ordinal transition probabilities across investigation stages."
        ),
        priors=(
            TheoryPrior(
                "Q2_depth_bounds", "curiosity", 0.0, 3.0, 1.5,
                "Investigation depth stages bounded [0, 3] across 4 opportunities", "TASK_DESIGN_BOUND",
            ),
        ),
    ),
    GameMeasurementCalibration(
        game_id="Q3",
        parameter="curiosity",
        world="W5 The Hidden Gallery",
        observed_indicator="integrated_insight_utilization",
        estimand="Binomial proportion p = k / 3 of downstream decisions utilizing discovered contextual clues",
        identifiability=IdentifiabilityClass.MODEL_NUMERICALLY_ESTIMABLE,
        observation_count=3,
        formula="SE(p) = sqrt(p * (1 - p) / 3)",
        worst_case_se=round(0.5 / sqrt(3), 4),
        nominal_se_range=(0.0, round(0.5 / sqrt(3), 4)),
        theoretical_bounds=(0.0, 1.0),
        missing_empirical_parameters=(
            "baseline_uninformed_choice_rate",
            "context_retention_decay",
        ),
        empirical_requirement_to_identify=(
            "Requires human trials to verify that downstream accuracy is causally attributable to alcove inspection."
        ),
        priors=(
            TheoryPrior(
                "Q3_utilization_bounds", "curiosity", 0.0, 1.0, 0.67,
                "Context integration proportion bounded [0, 1] across 3 episodes", "TASK_DESIGN_BOUND",
            ),
        ),
    ),

    # W6: The Broken Tool (creative_initiative)
    GameMeasurementCalibration(
        game_id="CR1",
        parameter="creative_initiative",
        world="W6 The Broken Tool",
        observed_indicator="solution_uniqueness_index",
        estimand="Statistical rarity index of chosen structural assembly configuration across 2 stages",
        identifiability=IdentifiabilityClass.EMPIRICAL_DATA_REQUIRED,
        observation_count=2,
        formula=None,
        worst_case_se=None,
        nominal_se_range=None,
        theoretical_bounds=(0.0, 1.0),
        missing_empirical_parameters=(
            "population_solution_frequencies",
            "inter_rater_agreement_kappa",
        ),
        empirical_requirement_to_identify=(
            "Solution uniqueness cannot be computed without a normative reference sample of assembly choices."
        ),
        priors=(
            TheoryPrior(
                "CR1_uniqueness_bounds", "creative_initiative", 0.0, 1.0, 0.5,
                "Uniqueness index bounded [0, 1] across 2 open construction stages", "TASK_DESIGN_BOUND",
            ),
        ),
    ),
    GameMeasurementCalibration(
        game_id="CR2",
        parameter="creative_initiative",
        world="W6 The Broken Tool",
        observed_indicator="creative_pivot_latency_ms",
        estimand="Mean cognitive reframing latency following 3 constraint-shift episodes",
        identifiability=IdentifiabilityClass.EMPIRICAL_DATA_REQUIRED,
        observation_count=3,
        formula=None,
        worst_case_se=None,
        nominal_se_range=None,
        theoretical_bounds=(200.0, 15000.0),
        missing_empirical_parameters=(
            "baseline_assembly_speed",
            "post_constraint_hesitation_distribution",
        ),
        empirical_requirement_to_identify=(
            "Requires human latency distributions to distinguish creative reframing from hesitation or confusion."
        ),
        priors=(
            TheoryPrior(
                "CR2_pivot_bounds", "creative_initiative", 200.0, 15000.0, None,
                "Cognitive pivot reaction time bounds across constraint changes", "PHYSIOLOGICAL_MOTOR_LIMIT",
            ),
        ),
    ),
    GameMeasurementCalibration(
        game_id="CR3",
        parameter="creative_initiative",
        world="W6 The Broken Tool",
        observed_indicator="functional_fixedness_overcome_rate",
        estimand="Binomial proportion p = k / 3 of non-standard affordance adaptations",
        identifiability=IdentifiabilityClass.MODEL_NUMERICALLY_ESTIMABLE,
        observation_count=3,
        formula="SE(p) = sqrt(p * (1 - p) / 3)",
        worst_case_se=round(0.5 / sqrt(3), 4),
        nominal_se_range=(0.0, round(0.5 / sqrt(3), 4)),
        theoretical_bounds=(0.0, 1.0),
        missing_empirical_parameters=(
            "affordance_salience_hierarchy",
            "population_adaptation_rate",
        ),
        empirical_requirement_to_identify=(
            "Requires empirical testing to verify that tool adaptation reflects creative flexibility rather than guessing."
        ),
        priors=(
            TheoryPrior(
                "CR3_adaptation_bounds", "creative_initiative", 0.0, 1.0, 0.5,
                "Affordance adaptation proportion bounded [0, 1] across 3 tool opportunities",
                "TASK_DESIGN_BOUND",
            ),
        ),
    ),

    # W7: The Repetition (motivation)
    GameMeasurementCalibration(
        game_id="M1",
        parameter="motivation",
        world="W7 The Repetition",
        observed_indicator="mandatory_cadence_consistency",
        estimand="Coefficient of variation CV = sigma_t / mu_t of unit completion times across 3 mandatory units",
        identifiability=IdentifiabilityClass.EMPIRICAL_DATA_REQUIRED,
        observation_count=3,
        formula=None,
        worst_case_se=None,
        nominal_se_range=None,
        theoretical_bounds=(0.0, 5.0),
        missing_empirical_parameters=(
            "unit_completion_mean_ms",
            "unit_completion_std_ms",
        ),
        empirical_requirement_to_identify=(
            "Requires human completion time distributions across mandatory repetitive units."
        ),
        priors=(
            TheoryPrior(
                "M1_cadence_bounds", "motivation", 0.0, 5.0, 0.2,
                "Rhythmic coefficient of variation across 3 mandatory units", "THEORETICAL_CONJECTURE",
            ),
        ),
    ),
    GameMeasurementCalibration(
        game_id="M2",
        parameter="motivation",
        world="W7 The Repetition",
        observed_indicator="optional_units_completed",
        estimand="Right-censored count k in {0..3} of optional units completed following mandatory work",
        identifiability=IdentifiabilityClass.MODEL_BOUND_ESTIMABLE,
        observation_count=6,
        formula="k in {0..3}; right-censored at k=3",
        worst_case_se=None,
        nominal_se_range=None,
        theoretical_bounds=(0.0, 3.0),
        missing_empirical_parameters=(
            "continuation_hazard_rate",
            "time_investment_cost_function",
        ),
        empirical_requirement_to_identify=(
            "Requires human persistence data to fit survival models and estimate baseline continuation probability."
        ),
        priors=(
            TheoryPrior(
                "M2_continuation_bounds", "motivation", 0.0, 3.0, 1.0,
                "Voluntary continuation unit count bounded [0, 3]", "TASK_DESIGN_BOUND",
            ),
        ),
    ),
    GameMeasurementCalibration(
        game_id="M3",
        parameter="motivation",
        world="W7 The Repetition",
        observed_indicator="reduced_feedback_persistence_count",
        estimand="Right-censored count k in {0..3} of persistence units completed under attenuated feedback",
        identifiability=IdentifiabilityClass.MODEL_BOUND_ESTIMABLE,
        observation_count=6,
        formula="k in {0..3}; right-censored at k=3",
        worst_case_se=None,
        nominal_se_range=None,
        theoretical_bounds=(0.0, 3.0),
        missing_empirical_parameters=(
            "feedback_attenuation_decay",
            "intrinsic_persistence_hazard",
        ),
        empirical_requirement_to_identify=(
            "Requires empirical persistence logs to distinguish intrinsic motivation from accidental clicks."
        ),
        priors=(
            TheoryPrior(
                "M3_persistence_bounds", "motivation", 0.0, 3.0, 1.0,
                "Persistence unit count bounded [0, 3] under reduced feedback", "TASK_DESIGN_BOUND",
            ),
        ),
    ),
)


def get_game_calibration(game_id: str) -> GameMeasurementCalibration:
    for cal in GAME_CALIBRATIONS:
        if cal.game_id == game_id:
            return cal
    raise KeyError(f"Unknown game_id: {game_id}")


# -----------------------------------------------------------------------------
# Sensitivity Analysis: Sampling Precision Scaling by Observation Count
# -----------------------------------------------------------------------------

def compute_sampling_precision_sensitivity(
    nominal_n: int,
    hypothetical_ns: Sequence[int] = (3, 4, 5, 8, 12, 20),
    p_values: Sequence[float] = (0.5, 0.7, 0.8, 0.9),
) -> list[dict[str, float | int]]:
    results = []
    for n in hypothetical_ns:
        for p in p_values:
            se = sqrt(p * (1.0 - p) / n)
            results.append({
                "n": n,
                "p": p,
                "standard_error": round(se, 4),
                "is_nominal": (n == nominal_n),
            })
    return results


# -----------------------------------------------------------------------------
# A-Priori Discriminant Validity Matrix
# -----------------------------------------------------------------------------

DISCRIMINANT_MATRIX: Mapping[str, dict[str, str | tuple[str, ...]]] = {
    "F1": {
        "primary_construct": "empathy",
        "related_constructs": ("collaborative_spirit",),
        "unrelated_constructs": ("conscientiousness", "motivation"),
        "convergence_hypothesis": "Positive covariance expected with F2, F3, and SJT empathy.",
        "discriminant_hypothesis": "Weaker covariance expected with A1, A2, M1, M2.",
    },
    "F2": {
        "primary_construct": "empathy",
        "related_constructs": ("collaborative_spirit", "curiosity"),
        "unrelated_constructs": ("conscientiousness", "motivation"),
        "convergence_hypothesis": "Positive covariance expected with F1, F3, and SJT empathy.",
        "discriminant_hypothesis": "Weaker covariance expected with A1, A3, M1.",
    },
    "F3": {
        "primary_construct": "empathy",
        "related_constructs": ("emotional_agility",),
        "unrelated_constructs": ("conscientiousness", "creative_initiative"),
        "convergence_hypothesis": "Positive covariance expected with F1, F2, and SJT empathy.",
        "discriminant_hypothesis": "Weaker covariance expected with A1, CR1, M1.",
    },
    "A1": {
        "primary_construct": "conscientiousness",
        "related_constructs": ("emotional_agility",),
        "unrelated_constructs": ("empathy", "creative_initiative"),
        "convergence_hypothesis": "Positive covariance expected with A2, A3, and SJT conscientiousness.",
        "discriminant_hypothesis": "Weaker covariance expected with F1, F2, CR1, CR3.",
    },
    "A2": {
        "primary_construct": "conscientiousness",
        "related_constructs": ("curiosity",),
        "unrelated_constructs": ("empathy", "collaborative_spirit"),
        "convergence_hypothesis": "Positive covariance expected with A1, A3, and SJT conscientiousness.",
        "discriminant_hypothesis": "Weaker covariance expected with F1, C1, C2.",
    },
    "A3": {
        "primary_construct": "conscientiousness",
        "related_constructs": ("motivation",),
        "unrelated_constructs": ("creative_initiative", "collaborative_spirit"),
        "convergence_hypothesis": "Positive covariance expected with A1, A2, and SJT conscientiousness.",
        "discriminant_hypothesis": "Weaker covariance expected with CR1, C1, C3.",
    },
    "C1": {
        "primary_construct": "collaborative_spirit",
        "related_constructs": ("empathy",),
        "unrelated_constructs": ("conscientiousness", "curiosity"),
        "convergence_hypothesis": "Positive covariance expected with C2, C3, and SJT collaborative spirit.",
        "discriminant_hypothesis": "Weaker covariance expected with A1, Q1, Q2.",
    },
    "C2": {
        "primary_construct": "collaborative_spirit",
        "related_constructs": ("empathy",),
        "unrelated_constructs": ("curiosity", "creative_initiative"),
        "convergence_hypothesis": "Positive covariance expected with C1, C3, and SJT collaborative spirit.",
        "discriminant_hypothesis": "Weaker covariance expected with Q1, CR1.",
    },
    "C3": {
        "primary_construct": "collaborative_spirit",
        "related_constructs": ("emotional_agility",),
        "unrelated_constructs": ("conscientiousness", "curiosity"),
        "convergence_hypothesis": "Positive covariance expected with C1, C2, and SJT collaborative spirit.",
        "discriminant_hypothesis": "Weaker covariance expected with A1, A3, Q2.",
    },
    "E1": {
        "primary_construct": "emotional_agility",
        "related_constructs": ("conscientiousness",),
        "unrelated_constructs": ("empathy", "collaborative_spirit"),
        "convergence_hypothesis": "Positive covariance (fewer perseverative errors) expected with E2, E3, and SJT emotional agility.",
        "discriminant_hypothesis": "Weaker covariance expected with F1, C1, C2.",
    },
    "E2": {
        "primary_construct": "emotional_agility",
        "related_constructs": ("motivation",),
        "unrelated_constructs": ("curiosity", "creative_initiative"),
        "convergence_hypothesis": "Positive covariance expected with E1, E3, and SJT emotional agility.",
        "discriminant_hypothesis": "Weaker covariance expected with Q1, CR1.",
    },
    "E3": {
        "primary_construct": "emotional_agility",
        "related_constructs": ("creative_initiative",),
        "unrelated_constructs": ("collaborative_spirit", "motivation"),
        "convergence_hypothesis": "Positive covariance expected with E1, E2, and SJT emotional agility.",
        "discriminant_hypothesis": "Weaker covariance expected with C1, M1.",
    },
    "Q1": {
        "primary_construct": "curiosity",
        "related_constructs": ("creative_initiative",),
        "unrelated_constructs": ("conscientiousness", "motivation"),
        "convergence_hypothesis": "Positive covariance expected with Q2, Q3, and SJT curiosity.",
        "discriminant_hypothesis": "Weaker covariance expected with A1, A3, M1.",
    },
    "Q2": {
        "primary_construct": "curiosity",
        "related_constructs": ("creative_initiative", "conscientiousness"),
        "unrelated_constructs": ("collaborative_spirit", "empathy"),
        "convergence_hypothesis": "Positive covariance expected with Q1, Q3, and SJT curiosity.",
        "discriminant_hypothesis": "Weaker covariance expected with C1, F1.",
    },
    "Q3": {
        "primary_construct": "curiosity",
        "related_constructs": ("emotional_agility",),
        "unrelated_constructs": ("collaborative_spirit", "motivation"),
        "convergence_hypothesis": "Positive covariance expected with Q1, Q2, and SJT curiosity.",
        "discriminant_hypothesis": "Weaker covariance expected with C2, M1.",
    },
    "CR1": {
        "primary_construct": "creative_initiative",
        "related_constructs": ("curiosity",),
        "unrelated_constructs": ("conscientiousness", "motivation"),
        "convergence_hypothesis": "Positive covariance expected with CR2, CR3, and SJT creative initiative.",
        "discriminant_hypothesis": "Weaker covariance expected with A1, A3, M1.",
    },
    "CR2": {
        "primary_construct": "creative_initiative",
        "related_constructs": ("emotional_agility",),
        "unrelated_constructs": ("collaborative_spirit", "conscientiousness"),
        "convergence_hypothesis": "Positive covariance expected with CR1, CR3, and SJT creative initiative.",
        "discriminant_hypothesis": "Weaker covariance expected with C1, A1.",
    },
    "CR3": {
        "primary_construct": "creative_initiative",
        "related_constructs": ("curiosity",),
        "unrelated_constructs": ("empathy", "collaborative_spirit"),
        "convergence_hypothesis": "Positive covariance expected with CR1, CR2, and SJT creative initiative.",
        "discriminant_hypothesis": "Weaker covariance expected with F1, C1.",
    },
    "M1": {
        "primary_construct": "motivation",
        "related_constructs": ("conscientiousness",),
        "unrelated_constructs": ("curiosity", "creative_initiative"),
        "convergence_hypothesis": "Positive covariance expected with M2, M3, and SJT motivation.",
        "discriminant_hypothesis": "Weaker covariance expected with Q1, CR1.",
    },
    "M2": {
        "primary_construct": "motivation",
        "related_constructs": ("conscientiousness",),
        "unrelated_constructs": ("curiosity", "creative_initiative"),
        "convergence_hypothesis": "Positive covariance expected with M1, M3, and SJT motivation.",
        "discriminant_hypothesis": "Weaker covariance expected with Q1, CR1.",
    },
    "M3": {
        "primary_construct": "motivation",
        "related_constructs": ("emotional_agility",),
        "unrelated_constructs": ("empathy", "creative_initiative"),
        "convergence_hypothesis": "Positive covariance expected with M1, M2, and SJT motivation.",
        "discriminant_hypothesis": "Weaker covariance expected with F1, CR1.",
    },
}


# -----------------------------------------------------------------------------
# Sibling & SJT Convergence Structural Models
# -----------------------------------------------------------------------------

SIBLING_CONVERGENCE_MODELS: Mapping[str, dict] = {
    param: {
        "parameter": param,
        "shared_latent_construct": f"theta_{param}",
        "sibling_indicators": tuple(spec.game_id for spec in GAME_SPECS if spec.parameter == param),
        "expected_direction": "POSITIVE",
        "method_variance_sources": "Distinct micro-task interaction affordances (latency vs proportion vs count)",
        "alternative_explanations": "Device form factor, motor response speed, reading comprehension",
        "convergence_status": "EXPECTED_RELATIONSHIP",
        "numerical_correlation_status": "NOT_IDENTIFIED_WITHOUT_EMPIRICAL_DATA",
    }
    for param in PARAMETERS
}

SJT_GAME_CONVERGENCE_MODELS: Mapping[str, dict] = {
    param: {
        "parameter": param,
        "sjt_indicator": f"SJT_{param}",
        "game_indicators": tuple(spec.game_id for spec in GAME_SPECS if spec.parameter == param),
        "shared_construct": f"theta_{param}",
        "method_contrast": "Explicit scenario-based narrative dilemma vs implicit behavioral execution",
        "expected_direction": "POSITIVE",
        "empirical_correlation_status": "NOT_IDENTIFIED_WITHOUT_EMPIRICAL_DATA",
    }
    for param in PARAMETERS
}


# -----------------------------------------------------------------------------
# Common Scale Linking & Latent Specifications
# -----------------------------------------------------------------------------

COMMON_SCALE_SPECIFICATIONS: Mapping[str, dict] = {
    param: {
        "parameter": param,
        "target_scale": f"theta_{param} ~ N(0, 1)",
        "required_constraints": "Mean=0, Variance=1 identification, marker variable loading=1.0 or standardized factor",
        "status": "COMMON_SCALE_MODEL_SPECIFIED",
        "parameter_status": "EMPIRICAL_LINKING_PARAMETERS_REQUIRED",
    }
    for param in PARAMETERS
}

LATENT_MODEL_SPECIFICATIONS: Mapping[str, dict] = {
    param: {
        "parameter": param,
        "structural_form": "Y_ij = alpha_j + lambda_j * theta_i + epsilon_ij",
        "indicators": (f"SJT_{param}",) + tuple(spec.game_id for spec in GAME_SPECS if spec.parameter == param),
        "non_equal_loadings_assumed": True,
        "status": "LATENT_MODEL_SPECIFIED",
        "estimate_status": "ESTIMATE_NOT_IDENTIFIED_WITHOUT_EMPIRICAL_PARAMETERS",
        "prohibited_terms": ("true_score",),
    }
    for param in PARAMETERS
}


def evaluate_theoretical_delta_sensitivity(
    difference: float,
    se_diff: float,
    hypothetical_margins: Sequence[tuple[float, float]] = ((0.15, 0.35), (0.20, 0.50), (0.25, 0.60)),
) -> list[dict[str, float | str]]:
    """Evaluates where an observed difference would fall across theoretical margins."""
    results = []
    for small_max, material_max in hypothetical_margins:
        if difference <= se_diff:
            state = "DELTA_WITHIN_MEASUREMENT_ERROR"
        elif difference <= small_max:
            state = "DELTA_SMALL"
        elif difference <= material_max:
            state = "DELTA_MATERIAL"
        else:
            state = "DELTA_LARGE"
        results.append({
            "small_max": small_max,
            "material_max": material_max,
            "difference": difference,
            "se_difference": se_diff,
            "hypothetical_state": state,
            "status": "MODEL_BASED_SENSITIVITY",
        })
    return results
