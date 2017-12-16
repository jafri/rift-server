-- object: ehr.physician_authentication | type: TABLE --
CREATE TABLE ehr.physician_authentication(
	physician_id uuid PRIMARY KEY DEFAULT uuid_generate_v1mc(),
	username text NOT NULL check (char_length(username) < 80),
	password text NOT NULL,
	created_at timestamp DEFAULT now()
);
-- ehr.physician_authentication end --


-- object: username_index | type: INDEX --
CREATE UNIQUE INDEX username_index ON ehr.physician_authentication
	USING btree
	(
	  username
	)
	WITH (FILLFACTOR = 90);
-- ddl-end --
