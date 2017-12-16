-- object: ehr.physician | type: TABLE --
CREATE TABLE ehr.physician(
	physician_id uuid PRIMARY KEY DEFAULT uuid_generate_v1mc(),
	first_name text NOT NULL check (char_length(first_name) < 80),
	last_name text NOT NULL check (char_length(last_name) < 80),
	middle_name text check (char_length(last_name) < 80),
	created_at timestamp DEFAULT now()
);

comment on table ehr.physician is 'A physician of the anofron application.';
comment on column ehr.physician.physician_id is 'The primary unique identifier for the physician.';
comment on column ehr.physician.first_name is 'The physician''s first name.';
comment on column ehr.physician.last_name is 'The physician''s last name.';
comment on column ehr.physician.middle_name is 'The physician''s optional middle name.';
comment on column ehr.physician.created_at is 'The time this physician was created.';
-- ehr.physicians end --
