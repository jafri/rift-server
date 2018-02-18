-- object: ehr.patient_report | type: TABLE --
CREATE TABLE ehr.patient_report(
	patient_report_id uuid PRIMARY KEY DEFAULT uuid_generate_v1mc(),
	report_type text NOT NULL,
	patient_id uuid NOT NULL,
	physician_id uuid NOT NULL,
	form_json jsonb NOT NULL,
	created_at timestamp DEFAULT now()
);
-- ehr.patient_reports end --
