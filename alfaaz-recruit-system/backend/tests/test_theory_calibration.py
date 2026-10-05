import sys
import unittest
import json
import uuid
from pathlib import Path

# Add backend to sys.path
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))

from sqlmodel import Session, SQLModel, create_engine
from app.models.recruit import DBSession, DBTelemetryEvent, DBFeature
from app.services.feature_extractor import extract_session_features
from app.research.theory_calibration import (
    GAME_SPECS,
    PARAMETERS,
    AlgorithmicallyVerifiedArtifact,
    CommonScaleIndicator,
    DataClassification,
    DeltaPolicy,
    EmpiricalParameterBundle,
    EmpiricalStudyReference,
    EmpiricallyValidatedArtifact,
    EquivalenceMargin,
    GameMeasurementSpec,
    IndicatorParameter,
    LatentModel,
    LinkingModel,
    MarginProvenance,
    ProportionPrecision,
    ProvenanceState,
    RawIndicator,
    SyntheticModelFixture,
    TheorySpecification,
    advance_provenance,
    binomial_precision,
    estimate_latent,
    evaluate_delta,
    link_indicator,
    COMMON_SCALE_SPECIFICATIONS,
    DISCRIMINANT_MATRIX,
    GAME_CALIBRATIONS,
    IdentifiabilityClass,
    LATENT_MODEL_SPECIFICATIONS,
    SIBLING_CONVERGENCE_MODELS,
    SJT_GAME_CONVERGENCE_MODELS,
    TheoryPrior,
    compute_sampling_precision_sensitivity,
    evaluate_theoretical_delta_sensitivity,
    get_game_calibration,
)


class TheoryCalibrationTests(unittest.TestCase):
    ROOT = Path(__file__).resolve().parents[1]

    def setUp(self):
        self.engine = create_engine("sqlite:///:memory:")
        SQLModel.metadata.create_all(self.engine)
        self.db = Session(self.engine)

    def tearDown(self):
        self.db.close()

    def test_r8_specification_is_complete(self):
        document = (self.ROOT / "docs" / "ALFAAZ_RECRUIT_THEORY_DRIVEN_CALIBRATION.md").read_text(encoding="utf-8")
        for section in range(1, 25):
            self.assertIn(f"## R8.{section} ", document)
        for spec in GAME_SPECS:
            self.assertIn(f"| {spec.game_id} |", document)

    def test_r9_specification_is_complete(self):
        document = (self.ROOT / "docs" / "ALFAAZ_RECRUIT_THEORY_DRIVEN_CALIBRATION_RESULTS.md").read_text(encoding="utf-8")
        for section in range(1, 22):
            self.assertIn(f"## R9.{section} ", document)
        for spec in GAME_SPECS:
            self.assertIn(f"**{spec.game_id}**", document)

    def test_complete_locked_game_catalogue_and_quarantine_boundary(self):
        self.assertEqual(len(GAME_SPECS), 21)
        self.assertEqual(
            set(PARAMETERS),
            {
                "empathy",
                "conscientiousness",
                "collaborative_spirit",
                "emotional_agility",
                "curiosity",
                "creative_initiative",
                "motivation",
            },
        )
        self.assertEqual({spec.game_id for spec in GAME_SPECS if spec.extractor_state == "ACTIVE"}, {"A1", "A2"})
        self.assertEqual(sum(spec.extractor_state == "QUARANTINED" for spec in GAME_SPECS), 19)
        self.assertTrue(all(spec.precision_method and spec.observation_structure for spec in GAME_SPECS))

        # Check locked observation schedules
        specs_by_id = {spec.game_id: spec for spec in GAME_SPECS}
        self.assertEqual(specs_by_id["F1"].observation_structure, "6 trials")
        self.assertEqual(specs_by_id["F2"].observation_structure, "4 ambiguity trials")
        self.assertEqual(specs_by_id["F3"].observation_structure, "3 context transitions")
        self.assertEqual(specs_by_id["A1"].observation_structure, "5 classification items")
        self.assertEqual(
            specs_by_id["A2"].observation_structure,
            "at least 3 genuine exception opportunities; clean controls excluded",
        )
        self.assertEqual(specs_by_id["A3"].observation_structure, "5 quality-control records")
        self.assertEqual(specs_by_id["C1"].observation_structure, "3 rounds")
        self.assertEqual(specs_by_id["C2"].observation_structure, "3 coordinated placement rounds")
        self.assertEqual(specs_by_id["C3"].observation_structure, "3 breakdown/recovery opportunities")
        self.assertEqual(specs_by_id["E1"].observation_structure, "9 trials: baseline T1-T3, shift T4, recovery T5-T9")
        self.assertEqual(specs_by_id["E2"].observation_structure, "4 sequences: 3 disrupted and 1 control")
        self.assertEqual(specs_by_id["E3"].observation_structure, "3 condition transitions with unchanged input modality")
        self.assertEqual(
            specs_by_id["Q1"].observation_structure,
            "4 required decisions plus optional resources and useful/low-value controls",
        )
        self.assertEqual(specs_by_id["Q2"].observation_structure, "4 exploration opportunities")
        self.assertEqual(specs_by_id["Q3"].observation_structure, "3 ambiguity/integration episodes")
        self.assertEqual(
            specs_by_id["CR1"].observation_structure,
            "2 construction stages with multiple valid solutions",
        )
        self.assertEqual(specs_by_id["CR2"].observation_structure, "3 constraint-shift episodes")
        self.assertEqual(specs_by_id["CR3"].observation_structure, "3 tool-use opportunities")
        self.assertEqual(specs_by_id["M1"].observation_structure, "3 mandatory units")
        self.assertEqual(
            specs_by_id["M2"].observation_structure,
            "3 mandatory, explicit finish/continue, up to 3 optional",
        )
        self.assertEqual(
            specs_by_id["M3"].observation_structure,
            "3 mandatory, up to 3 voluntary, explicit stop, reduced feedback, right-censored",
        )

    def test_provenance_lifecycle_and_transition_enforcement(self):
        # Valid single-step transitions
        self.assertEqual(
            advance_provenance(ProvenanceState.THEORY_SPECIFIED, ProvenanceState.MODEL_IMPLEMENTED),
            ProvenanceState.MODEL_IMPLEMENTED,
        )
        self.assertEqual(
            advance_provenance(ProvenanceState.MODEL_IMPLEMENTED, ProvenanceState.ALGORITHMICALLY_VERIFIED),
            ProvenanceState.ALGORITHMICALLY_VERIFIED,
        )
        self.assertEqual(
            advance_provenance(ProvenanceState.ALGORITHMICALLY_VERIFIED, ProvenanceState.EMPIRICALLY_ESTIMATED),
            ProvenanceState.EMPIRICALLY_ESTIMATED,
        )
        self.assertEqual(
            advance_provenance(ProvenanceState.EMPIRICALLY_ESTIMATED, ProvenanceState.EMPIRICALLY_VALIDATED),
            ProvenanceState.EMPIRICALLY_VALIDATED,
        )

        # Illegal skip: THEORY_SPECIFIED -> EMPIRICALLY_ESTIMATED
        with self.assertRaises(ValueError):
            advance_provenance(ProvenanceState.THEORY_SPECIFIED, ProvenanceState.EMPIRICALLY_ESTIMATED)

        # Illegal skip: ALGORITHMICALLY_VERIFIED -> EMPIRICALLY_VALIDATED
        with self.assertRaises(ValueError):
            advance_provenance(ProvenanceState.ALGORITHMICALLY_VERIFIED, ProvenanceState.EMPIRICALLY_VALIDATED)

        # Illegal backward transition
        with self.assertRaises(ValueError):
            advance_provenance(ProvenanceState.EMPIRICALLY_ESTIMATED, ProvenanceState.MODEL_IMPLEMENTED)

        # Non-enum type
        with self.assertRaises(TypeError):
            advance_provenance("THEORY_SPECIFIED", ProvenanceState.MODEL_IMPLEMENTED)  # type: ignore

    def test_provenance_artifacts_hard_separation(self):
        # TheorySpecification
        theory = TheorySpecification("empathy", "Theoretical attunement model")
        self.assertEqual(theory.provenance, ProvenanceState.THEORY_SPECIFIED)
        self.assertEqual(theory.data_classification, DataClassification.SYNTHETIC)
        with self.assertRaises(ValueError):
            TheorySpecification("", "empty construct")

        # Synthetic fixture cannot claim empirical classification
        with self.assertRaises(ValueError):
            SyntheticModelFixture("fix1", "synthetic", data_classification=DataClassification.EMPIRICAL)  # type: ignore

        synth_fix = SyntheticModelFixture("fix1", "Synthetic known-answer fixture")
        self.assertEqual(synth_fix.data_classification, DataClassification.SYNTHETIC)

        # AlgorithmicallyVerifiedArtifact
        algo_art = AlgorithmicallyVerifiedArtifact("art1", synth_fix, "unit-test-known-answer")
        self.assertEqual(algo_art.status, ProvenanceState.ALGORITHMICALLY_VERIFIED)
        self.assertEqual(algo_art.data_classification, DataClassification.SYNTHETIC)

        # EmpiricalStudyReference requires non-empty fields and EMPIRICAL classification
        with self.assertRaises(ValueError):
            EmpiricalStudyReference("", "dataset_v1", "reviewer_a", "2026-10-01")
        with self.assertRaises(ValueError):
            EmpiricalStudyReference(
                "study1", "dataset_v1", "reviewer_a", "2026-10-01",
                data_classification=DataClassification.SYNTHETIC,  # type: ignore
            )

        emp_study = EmpiricalStudyReference("ST-2026-01", "zenodo-alfaaz-v1", "Curator Review Board", "2026-10-01T12:00:00Z")
        self.assertEqual(emp_study.data_classification, DataClassification.EMPIRICAL)

        # EmpiricalParameterBundle rejects synthetic fixture or unreviewed bundle
        p_sjt = IndicatorParameter(intercept=0.0, loading=1.0, error_variance=0.5)
        p_game = IndicatorParameter(intercept=1.0, loading=1.5, error_variance=0.8)

        # Rejects identical loadings without empirical rationale
        with self.assertRaises(ValueError):
            EmpiricalParameterBundle(
                parameter_id="empathy",
                parameters={"sjt": p_sjt, "game": IndicatorParameter(0.0, 1.0, 0.5)},
                study_reference=emp_study,
                reviewer="Reviewer",
                parameter_version="v1.0",
            )

        # Rejects synthetic study reference
        with self.assertRaises(TypeError):
            EmpiricalParameterBundle(
                parameter_id="empathy",
                parameters={"sjt": p_sjt, "game": p_game},
                study_reference=synth_fix,  # type: ignore
                reviewer="Reviewer",
                parameter_version="v1.0",
            )

        valid_bundle = EmpiricalParameterBundle(
            parameter_id="empathy",
            parameters={"sjt": p_sjt, "game": p_game},
            study_reference=emp_study,
            reviewer="Dr. Psychometrician",
            parameter_version="v1.0",
        )
        self.assertEqual(valid_bundle.data_classification, DataClassification.EMPIRICAL)
        self.assertEqual(valid_bundle.provenance, ProvenanceState.EMPIRICALLY_ESTIMATED)

        # EmpiricallyValidatedArtifact
        val_art = EmpiricallyValidatedArtifact(
            artifact_id="val_art_01",
            parameter_bundle=valid_bundle,
            validation_evidence_reference="DOC-VAL-2026",
            review_record="Approved by Ethics and Psychometrics Council",
        )
        self.assertEqual(val_art.status, ProvenanceState.EMPIRICALLY_VALIDATED)
        self.assertEqual(val_art.data_classification, DataClassification.EMPIRICAL)

    def test_common_scale_linking_governance(self):
        # Raw indicator requires positive standard error
        raw_sjt = RawIndicator("sjt_ind", 0.65, 0.05, measure_id="SJT_EMPATHY")
        with self.assertRaises(ValueError):
            RawIndicator("sjt_ind", 0.65, 0.0, measure_id="SJT_EMPATHY")

        synth_fix = SyntheticModelFixture("fix_link", "Synthetic linking fixture")

        # Synthetic linking model
        link_model_sjt = LinkingModel(
            source_measure_id="SJT_EMPATHY",
            target_scale_id="theta_empathy",
            transformation_type="LINEAR",
            transformation_parameters={"intercept": -0.5, "slope": 2.0},
            parameter_provenance=ProvenanceState.ALGORITHMICALLY_VERIFIED,
            model_version="synth_link_v1",
            status="SYNTHETIC_FIXTURE",
            synthetic_fixture=synth_fix,
        )

        # Transform raw to common scale
        linked_sjt = link_indicator(raw_sjt, link_model_sjt)
        self.assertEqual(linked_sjt.scale_id, "theta_empathy")
        self.assertAlmostEqual(linked_sjt.value, 0.65 * 2.0 - 0.5)
        self.assertAlmostEqual(linked_sjt.standard_error, 0.05 * 2.0)
        self.assertEqual(linked_sjt.provenance, ProvenanceState.ALGORITHMICALLY_VERIFIED)

        # Measure ID mismatch raises ValueError
        raw_game = RawIndicator("f1_ind", 0.8, 0.04, measure_id="GAME_F1")
        with self.assertRaises(ValueError):
            link_indicator(raw_game, link_model_sjt)

        # Reject arbitrary scale comparison
        linked_game_other_scale = CommonScaleIndicator(0.8, 0.08, "theta_conscientiousness", "game_f1")
        policy = EquivalenceMargin(
            margin_id="margin_emp",
            construct_scope="empathy",
            numeric_margins={"small_max": 0.25, "material_max": 0.50},
            derivation_method="empirical_roc_cut",
            supporting_evidence_reference="DOC-EMP-2026",
            provenance=MarginProvenance.EMPIRICALLY_JUSTIFIED_MARGIN,
            review_record="Approved",
            status="EMPIRICALLY_ESTIMATED",
        )
        with self.assertRaises(ValueError):
            evaluate_delta(linked_sjt, linked_game_other_scale, policy)

    def test_equivalence_margin_and_delta_governance(self):
        # Margin requires ordered positive numbers
        with self.assertRaises(ValueError):
            EquivalenceMargin(
                "m1", "empathy", {"small_max": 0.4, "material_max": 0.2},
                "theory", "none", MarginProvenance.THEORY_SPECIFIED_MARGIN, "none", "DRAFT"
            )

        # Theory-specified margin cannot classify substantive categories beyond measurement error
        theory_margin = EquivalenceMargin(
            margin_id="m_theory",
            construct_scope="empathy",
            numeric_margins={"small_max": 0.2, "material_max": 0.5},
            derivation_method="theoretical_conjecture",
            supporting_evidence_reference="theory_note_1",
            provenance=MarginProvenance.THEORY_SPECIFIED_MARGIN,
            review_record="pre-empirical",
            status="THEORY_SPECIFIED",
        )

        left = CommonScaleIndicator(0.50, 0.05, "theta", "sjt")
        # Case A: difference within standard error of difference (diff=0.04, SE_diff = sqrt(0.0025 + 0.0025) ~ 0.0707)
        right_close = CommonScaleIndicator(0.54, 0.05, "theta", "game")
        res_close = evaluate_delta(left, right_close, theory_margin)
        self.assertEqual(res_close["state"], "DELTA_WITHIN_MEASUREMENT_ERROR")

        # Case B: difference exceeds SE_diff but margin is theoretical -> NOT_DETERMINED
        right_far = CommonScaleIndicator(0.75, 0.05, "theta", "game")
        res_far = evaluate_delta(left, right_far, theory_margin)
        self.assertEqual(res_far["state"], "NOT_DETERMINED")
        self.assertIn("Substantive delta classification requires EMPIRICALLY_JUSTIFIED_MARGIN", str(res_far["note"]))

        # Case C: empirically justified margin evaluates substantive categories
        emp_margin = EquivalenceMargin(
            margin_id="m_empirical",
            construct_scope="empathy",
            numeric_margins={"small_max": 0.2, "material_max": 0.5},
            derivation_method="empirical_distribution_percentile",
            supporting_evidence_reference="DOC-EMP-DELTA-01",
            provenance=MarginProvenance.EMPIRICALLY_JUSTIFIED_MARGIN,
            review_record="Approved by Measurement Board",
            status="EMPIRICALLY_ESTIMATED",
        )

        # diff = 0.15 > SE_diff (0.0707) and <= small_max (0.2) -> DELTA_SMALL
        right_small = CommonScaleIndicator(0.65, 0.05, "theta", "game")
        res_small = evaluate_delta(left, right_small, emp_margin)
        self.assertEqual(res_small["state"], "DELTA_SMALL")

        # diff = 0.35 > small_max (0.2) and <= material_max (0.5) -> DELTA_MATERIAL
        right_mat = CommonScaleIndicator(0.85, 0.05, "theta", "game")
        res_mat = evaluate_delta(left, right_mat, emp_margin)
        self.assertEqual(res_mat["state"], "DELTA_MATERIAL")

        # diff = 0.60 > material_max (0.5) -> DELTA_LARGE
        right_large = CommonScaleIndicator(1.10, 0.05, "theta", "game")
        res_large = evaluate_delta(left, right_large, emp_margin)
        self.assertEqual(res_large["state"], "DELTA_LARGE")

        # Covariance handling
        res_cov = evaluate_delta(left, right_close, emp_margin, covariance=0.002)
        expected_se_diff = (0.0025 + 0.0025 - 2 * 0.002) ** 0.5
        self.assertAlmostEqual(res_cov["standard_error_difference"], expected_se_diff)

        # Negative variance check
        with self.assertRaises(ValueError):
            evaluate_delta(left, right_close, emp_margin, covariance=0.01)

    def test_latent_model_safeguards_and_estimation(self):
        synth_fix = SyntheticModelFixture("synth_lat", "Synthetic Latent Fixture")
        indicators = {
            "sjt": IndicatorParameter(0.0, 1.0, 1.0),
            "game": IndicatorParameter(1.0, 2.0, 4.0),
        }

        # Model without empirical bundle cannot claim empirical provenance
        with self.assertRaises(TypeError):
            LatentModel("empathy", indicators, provenance=ProvenanceState.EMPIRICALLY_ESTIMATED)

        # Model with SyntheticModelFixture computes latent estimate
        synth_model = LatentModel(
            "empathy",
            indicators,
            synthetic_fixture=synth_fix,
            provenance=ProvenanceState.ALGORITHMICALLY_VERIFIED,
        )
        recovered = estimate_latent(synth_model, {"sjt": 2.0, "game": 5.0})
        # sjt: (2 - 0)/1 = 2, var = 1/1 = 1
        # game: (5 - 1)/2 = 2, var = 4/4 = 1
        # weighted avg = 2.0
        self.assertAlmostEqual(recovered["latent_construct_estimate"], 2.0)
        self.assertAlmostEqual(recovered["estimate"], 2.0)
        self.assertEqual(recovered["provenance"], "ALGORITHMICALLY_VERIFIED")

        # Missing indicator raises ValueError
        with self.assertRaises(ValueError):
            estimate_latent(synth_model, {"sjt": 2.0})

        # Rejects identical loadings by assumption
        with self.assertRaises(ValueError):
            LatentModel(
                "empathy",
                {"sjt": IndicatorParameter(0.0, 1.0, 1.0), "game": IndicatorParameter(0.0, 1.0, 1.0)},
                synthetic_fixture=synth_fix,
            )

    def test_binomial_precision_known_answers_and_invariants(self):
        result = binomial_precision(3, 5)
        self.assertEqual(result.estimate, 0.6)
        self.assertAlmostEqual(result.standard_error, (0.24 / 5) ** 0.5)

        # Boundary 0 and 1
        res_zero = binomial_precision(0, 4)
        self.assertEqual(res_zero.estimate, 0.0)
        self.assertEqual(res_zero.standard_error, 0.0)

        res_full = binomial_precision(4, 4)
        self.assertEqual(res_full.estimate, 1.0)
        self.assertEqual(res_full.standard_error, 0.0)

        # Invalid bounds
        with self.assertRaises(ValueError):
            binomial_precision(5, 4)
        with self.assertRaises(ValueError):
            binomial_precision(-1, 4)
        with self.assertRaises(ValueError):
            binomial_precision(2, 0)

    def test_a2_extractor_reconciled_genuine_exception_logic(self):
        # 1. N=1 genuine exception -> INSUFFICIENT
        s1 = str(uuid.uuid4())
        self.db.add(DBSession(session_id=s1, status="GAMES"))
        self.db.add(DBTelemetryEvent(
            session_id=s1, seq=1, segment_id=1, t_ms=100.0, screen="game", mini_game="A2",
            action="decision_logged", task_def_version="1.0",
            data_json=json.dumps({"stimulus_id": "EXC_01", "action_id": "flag_exception"})
        ))
        self.db.commit()
        feats1 = {f.feature_name: f for f in extract_session_features(self.db, s1) if f.mini_game == "A2"}
        self.assertFalse(feats1["exception_flagging_precision"].valid)
        self.assertIn("INSUFFICIENT_OBSERVATIONS", json.loads(feats1["exception_flagging_precision"].flags_json))

        # 2. N=2 genuine exceptions -> INSUFFICIENT
        s2 = str(uuid.uuid4())
        self.db.add(DBSession(session_id=s2, status="GAMES"))
        self.db.add_all([
            DBTelemetryEvent(
                session_id=s2, seq=1, segment_id=1, t_ms=100.0, screen="game", mini_game="A2",
                action="decision_logged", task_def_version="1.0",
                data_json=json.dumps({"stimulus_id": "EXC_01", "action_id": "flag_exception"})
            ),
            DBTelemetryEvent(
                session_id=s2, seq=2, segment_id=1, t_ms=200.0, screen="game", mini_game="A2",
                action="decision_logged", task_def_version="1.0",
                data_json=json.dumps({"stimulus_id": "EXC_03", "action_id": "flag_exception"})
            )
        ])
        self.db.commit()
        feats2 = {f.feature_name: f for f in extract_session_features(self.db, s2) if f.mini_game == "A2"}
        self.assertFalse(feats2["exception_flagging_precision"].valid)
        self.assertIn("INSUFFICIENT_OBSERVATIONS", json.loads(feats2["exception_flagging_precision"].flags_json))

        # 3. N=3 genuine exceptions + 1 clean control:
        # EXC_01 (true exception, correct flag)
        # EXC_02 (clean control, candidate incorrectly files standard or flags - MUST NOT affect genuine precision)
        # EXC_03 (true exception, correct flag)
        # EXC_04 (true exception, INCORRECT action: file_standard instead of flag_exception)
        # Genuine evaluated = 3 (EXC_01, EXC_03, EXC_04)
        # Genuine correct = 2 (EXC_01, EXC_03)
        # Genuine precision = 2 / 3 = 0.6667
        s3 = str(uuid.uuid4())
        self.db.add(DBSession(session_id=s3, status="GAMES"))
        self.db.add_all([
            DBTelemetryEvent(
                session_id=s3, seq=1, segment_id=1, t_ms=100.0, screen="game", mini_game="A2",
                action="decision_logged", task_def_version="1.0",
                data_json=json.dumps({"stimulus_id": "EXC_01", "action_id": "flag_exception"})
            ),
            DBTelemetryEvent(
                session_id=s3, seq=2, segment_id=1, t_ms=200.0, screen="game", mini_game="A2",
                action="decision_logged", task_def_version="1.0",
                data_json=json.dumps({"stimulus_id": "EXC_02", "action_id": "flag_exception"})  # clean control wrong
            ),
            DBTelemetryEvent(
                session_id=s3, seq=3, segment_id=1, t_ms=300.0, screen="game", mini_game="A2",
                action="decision_logged", task_def_version="1.0",
                data_json=json.dumps({"stimulus_id": "EXC_03", "action_id": "flag_exception"})
            ),
            DBTelemetryEvent(
                session_id=s3, seq=4, segment_id=1, t_ms=400.0, screen="game", mini_game="A2",
                action="decision_logged", task_def_version="1.0",
                data_json=json.dumps({"stimulus_id": "EXC_04", "action_id": "file_standard"})  # genuine wrong
            ),
            # Duplicate event for EXC_01: should NOT inflate count
            DBTelemetryEvent(
                session_id=s3, seq=5, segment_id=1, t_ms=500.0, screen="game", mini_game="A2",
                action="decision_logged", task_def_version="1.0",
                data_json=json.dumps({"stimulus_id": "EXC_01", "action_id": "flag_exception"})
            )
        ])
        self.db.commit()
        feats3 = {f.feature_name: f for f in extract_session_features(self.db, s3) if f.mini_game == "A2"}
        self.assertTrue(feats3["exception_flagging_precision"].valid)
        self.assertEqual(feats3["exception_flagging_precision"].value_raw, 0.6667)
        self.assertEqual(json.loads(feats3["exception_flagging_precision"].flags_json), [])

        # 4. exception_resolved cannot bypass the observation gate
        s4 = str(uuid.uuid4())
        self.db.add(DBSession(session_id=s4, status="GAMES"))
        self.db.add(DBTelemetryEvent(
            session_id=s4, seq=1, segment_id=1, t_ms=100.0, screen="game", mini_game="A2",
            action="exception_resolved", task_def_version="1.0",
            data_json=json.dumps({"stimulus_id": "EXC_01", "action_id": "flag_exception"})
        ))
        self.db.commit()
        feats4 = {f.feature_name: f for f in extract_session_features(self.db, s4) if f.mini_game == "A2"}
        self.assertFalse(feats4["exception_flagging_precision"].valid)
        self.assertIn("INSUFFICIENT_OBSERVATIONS", json.loads(feats4["exception_flagging_precision"].flags_json))

    def test_production_calibration_configuration_remains_unpopulated(self):
        config = json.loads((self.ROOT / "config" / "feature_bands.json").read_text(encoding="utf-8"))
        self.assertEqual(config["calibration_status"], "UNCALIBRATED")
        self.assertTrue(all(value is None for value in config["bands"].values()))

    def test_stage2_game_calibrations_catalogue_completeness_and_identifiability(self):
        self.assertEqual(len(GAME_CALIBRATIONS), 21)
        by_id = {c.game_id: c for c in GAME_CALIBRATIONS}

        # Check coverage across all 21 games and 7 parameters
        for spec in GAME_SPECS:
            self.assertIn(spec.game_id, by_id)
            cal = by_id[spec.game_id]
            self.assertEqual(cal.parameter, spec.parameter)
            self.assertEqual(cal.world, spec.world)
            self.assertEqual(cal.observed_indicator, spec.observed_feature)
            self.assertTrue(len(cal.missing_empirical_parameters) > 0)
            self.assertTrue(len(cal.empirical_requirement_to_identify) > 0)

        # Check exact identifiability partitions
        numerically_estimable = {c.game_id for c in GAME_CALIBRATIONS if c.identifiability == IdentifiabilityClass.MODEL_NUMERICALLY_ESTIMABLE}
        bound_estimable = {c.game_id for c in GAME_CALIBRATIONS if c.identifiability == IdentifiabilityClass.MODEL_BOUND_ESTIMABLE}
        empirical_required = {c.game_id for c in GAME_CALIBRATIONS if c.identifiability == IdentifiabilityClass.EMPIRICAL_DATA_REQUIRED}

        self.assertEqual(numerically_estimable, {"F2", "A1", "A2", "C2", "Q1", "Q3", "CR3"})
        self.assertEqual(bound_estimable, {"A3", "C1", "C3", "E1", "E3", "Q2", "M2", "M3"})
        self.assertEqual(empirical_required, {"F1", "F3", "E2", "CR1", "CR2", "M1"})

        # Verify numerical properties for numerically estimable models
        for gid in numerically_estimable:
            cal = by_id[gid]
            self.assertIsNotNone(cal.formula)
            self.assertIsNotNone(cal.worst_case_se)
            self.assertGreater(cal.worst_case_se, 0.0)
            self.assertIsNotNone(cal.nominal_se_range)
            self.assertEqual(cal.theoretical_bounds, (0.0, 1.0))

        # Check helper function
        self.assertEqual(get_game_calibration("A1").game_id, "A1")
        with self.assertRaises(KeyError):
            get_game_calibration("UNKNOWN_GAME")

    def test_theory_prior_validation_and_status_constraints(self):
        valid_prior = TheoryPrior(
            component_id="F2_prop",
            parameter="empathy",
            lower_bound=0.0,
            upper_bound=1.0,
            central_assumption=0.5,
            rationale="Binomial bounded interval",
            source_type="TASK_DESIGN_BOUND",
            status="THEORY_DERIVED",
        )
        self.assertEqual(valid_prior.status, "THEORY_DERIVED")

        # Inverted bounds
        with self.assertRaises(ValueError):
            TheoryPrior(
                component_id="invalid",
                parameter="empathy",
                lower_bound=10.0,
                upper_bound=5.0,
                central_assumption=7.0,
                rationale="invalid",
                source_type="BOUND",
            )

        # Empty fields
        with self.assertRaises(ValueError):
            TheoryPrior(
                component_id="",
                parameter="empathy",
                lower_bound=0.0,
                upper_bound=1.0,
                central_assumption=None,
                rationale="invalid",
                source_type="BOUND",
            )

        # Non-theory status
        with self.assertRaises(ValueError):
            TheoryPrior(
                component_id="f1_prior",
                parameter="empathy",
                lower_bound=0.0,
                upper_bound=1.0,
                central_assumption=None,
                rationale="invalid",
                source_type="BOUND",
                status="EMPIRICALLY_ESTIMATED",
            )

    def test_sampling_precision_sensitivity_computation(self):
        results = compute_sampling_precision_sensitivity(
            nominal_n=5,
            hypothetical_ns=(3, 5, 10),
            p_values=(0.5, 0.8),
        )
        self.assertEqual(len(results), 6)

        # For n=5, p=0.8: SE = sqrt(0.8 * 0.2 / 5) = sqrt(0.032) ~ 0.1789
        n5_p8 = [r for r in results if r["n"] == 5 and r["p"] == 0.8][0]
        self.assertTrue(n5_p8["is_nominal"])
        self.assertAlmostEqual(n5_p8["standard_error"], 0.1789, places=4)

        # For n=10, p=0.5: SE = sqrt(0.5 * 0.5 / 10) = sqrt(0.025) ~ 0.1581
        n10_p5 = [r for r in results if r["n"] == 10 and r["p"] == 0.5][0]
        self.assertFalse(n10_p5["is_nominal"])
        self.assertAlmostEqual(n10_p5["standard_error"], 0.1581, places=4)

    def test_discriminant_validity_matrix_structure(self):
        self.assertEqual(len(DISCRIMINANT_MATRIX), 21)
        for spec in GAME_SPECS:
            self.assertIn(spec.game_id, DISCRIMINANT_MATRIX)
            entry = DISCRIMINANT_MATRIX[spec.game_id]
            self.assertEqual(entry["primary_construct"], spec.parameter)
            self.assertTrue(len(entry["related_constructs"]) >= 1)
            self.assertTrue(len(entry["unrelated_constructs"]) >= 1)
            self.assertIn("convergence_hypothesis", entry)
            self.assertIn("discriminant_hypothesis", entry)
            # Ensure no arbitrary numerical correlation is stored
            self.assertNotIn("r=", str(entry))
            self.assertNotIn("rho=", str(entry))

    def test_sibling_and_sjt_convergence_specifications(self):
        self.assertEqual(set(SIBLING_CONVERGENCE_MODELS), set(PARAMETERS))
        self.assertEqual(set(SJT_GAME_CONVERGENCE_MODELS), set(PARAMETERS))

        for param in PARAMETERS:
            sib = SIBLING_CONVERGENCE_MODELS[param]
            self.assertEqual(len(sib["sibling_indicators"]), 3)
            self.assertEqual(sib["convergence_status"], "EXPECTED_RELATIONSHIP")
            self.assertEqual(sib["numerical_correlation_status"], "NOT_IDENTIFIED_WITHOUT_EMPIRICAL_DATA")

            sjt_conv = SJT_GAME_CONVERGENCE_MODELS[param]
            self.assertEqual(sjt_conv["sjt_indicator"], f"SJT_{param}")
            self.assertEqual(len(sjt_conv["game_indicators"]), 3)
            self.assertEqual(sjt_conv["empirical_correlation_status"], "NOT_IDENTIFIED_WITHOUT_EMPIRICAL_DATA")

    def test_common_scale_and_latent_model_specifications(self):
        self.assertEqual(set(COMMON_SCALE_SPECIFICATIONS), set(PARAMETERS))
        self.assertEqual(set(LATENT_MODEL_SPECIFICATIONS), set(PARAMETERS))

        for param in PARAMETERS:
            scale_spec = COMMON_SCALE_SPECIFICATIONS[param]
            self.assertEqual(scale_spec["status"], "COMMON_SCALE_MODEL_SPECIFIED")
            self.assertEqual(scale_spec["parameter_status"], "EMPIRICAL_LINKING_PARAMETERS_REQUIRED")

            latent_spec = LATENT_MODEL_SPECIFICATIONS[param]
            self.assertEqual(latent_spec["status"], "LATENT_MODEL_SPECIFIED")
            self.assertEqual(latent_spec["estimate_status"], "ESTIMATE_NOT_IDENTIFIED_WITHOUT_EMPIRICAL_PARAMETERS")
            self.assertTrue(latent_spec["non_equal_loadings_assumed"])
            self.assertIn("true_score", latent_spec["prohibited_terms"])

    def test_theoretical_delta_sensitivity_analysis(self):
        # Case A: difference within standard error of difference
        res_within = evaluate_theoretical_delta_sensitivity(difference=0.04, se_diff=0.07)
        self.assertEqual(len(res_within), 3)
        for r in res_within:
            self.assertEqual(r["hypothetical_state"], "DELTA_WITHIN_MEASUREMENT_ERROR")
            self.assertEqual(r["status"], "MODEL_BASED_SENSITIVITY")

        # Case B: difference exceeding SE_diff across hypothetical margins (0.15, 0.35)
        res_exceeding = evaluate_theoretical_delta_sensitivity(difference=0.25, se_diff=0.05)
        # Margin 1: (0.15, 0.35) -> 0.25 > 0.15 and <= 0.35 -> DELTA_MATERIAL
        self.assertEqual(res_exceeding[0]["hypothetical_state"], "DELTA_MATERIAL")
        # Margin 2: (0.20, 0.50) -> 0.25 > 0.20 and <= 0.50 -> DELTA_MATERIAL
        self.assertEqual(res_exceeding[1]["hypothetical_state"], "DELTA_MATERIAL")
        # Margin 3: (0.25, 0.60) -> 0.25 <= 0.25 -> DELTA_SMALL
        self.assertEqual(res_exceeding[2]["hypothetical_state"], "DELTA_SMALL")


if __name__ == "__main__":
    unittest.main()
