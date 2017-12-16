-- object: ehr.report_template | type: TABLE --
CREATE TABLE ehr.report_template(
	report_template_id uuid PRIMARY KEY DEFAULT uuid_generate_v1mc(),
	name text NOT NULL check (char_length(name) < 80),
	template_json jsonb NOT NULL,
	created_at timestamp DEFAULT now()
);

comment on table ehr.report_template is 'A report template for a specific procedure.';
comment on column ehr.report_template.report_template_id is 'The primary unique identifier for the report template.';
comment on column ehr.report_template.name is 'The name of the template report.';
comment on column ehr.report_template.template_json is 'The questions and possible answers of the report in json.';
comment on column ehr.report_template.created_at is 'The time this report template was created.';
-- ehr.report_templates end --
