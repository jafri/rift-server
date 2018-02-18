-- object: ehr.patient | type: TABLE --
CREATE TABLE ehr.patient(
	patient_id uuid PRIMARY KEY DEFAULT uuid_generate_v1mc(),
	first_name text,
	last_name text NOT NULL,
	middle_name text,
	personal_health_care_number text,
	date_of_birth date,
	research_consent boolean,
	created_at timestamp DEFAULT now()
);

comment on table ehr.patient is 'A patient of the anofron application.';
comment on column ehr.patient.patient_id is 'The primary unique identifier for the patient.';
comment on column ehr.patient.first_name is 'The patient''s first name.';
comment on column ehr.patient.last_name is 'The patient''s last name.';
comment on column ehr.patient.middle_name is 'The patient''s optional middle name.';
comment on column ehr.patient.personal_health_care_number is 'The patient''s health card number';
comment on column ehr.patient.date_of_birth is 'The patient''s date of birth.';
comment on column ehr.patient.research_consent is 'The patient''s consent status.';
comment on column ehr.patient.created_at is 'The time this patient was created.';
-- ehr.patients end --
