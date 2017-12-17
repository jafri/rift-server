-- object: ehr.physician_login | type: TABLE --
CREATE TABLE ehr.physician_login(
	physician_login_id uuid PRIMARY KEY DEFAULT uuid_generate_v1mc(),
	physician_id uuid,
	username text NOT NULL check (char_length(username) < 80),
	password text NOT NULL,
	created_at timestamp DEFAULT now()
);
-- ehr.physician_authentication end --

-- object: ehr.physician_jwt_token | type: Composite Type --
create type ehr.physician_jwt_token as (
  role text,
  physician_id integer
);
-- ddl-end --

-- object: physician_login | type: INDEX --
CREATE UNIQUE INDEX username_index ON ehr.physician_login
	USING btree
	(
	  username
	)
	WITH (FILLFACTOR = 90);
-- ddl-end --
