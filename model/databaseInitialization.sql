-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.1-alpha1
-- PostgreSQL version: 10.0
-- Project Site: pgmodeler.com.br
-- Model Author: ---

-- object: "SynopticManager" | type: ROLE --
-- DROP ROLE IF EXISTS "SynopticManager";

-- Prepended SQL commands --
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- ddl-end --


-- object: "SynopticManager" | type: ROLE --
-- DROP ROLE IF EXISTS "SynopticManager";
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'synoptic_manager') THEN
        CREATE ROLE "synoptic_manager" WITH
			LOGIN
			ENCRYPTED PASSWORD 'qpiGdY+1a9B%EVC';
    END IF;
END
$$;
-- ddl-end --

-- Database creation must be done outside an multicommand file.
-- These commands were put in this file only for convenience.
-- -- object: anofron | type: DATABASE --
-- -- DROP DATABASE IF EXISTS anofron;
-- CREATE DATABASE anofron
-- 	OWNER = "SynopticManager"
-- ;
-- -- ddl-end --
--

-- object: public.patients | type: TABLE --
-- DROP TABLE IF EXISTS public.patients CASCADE;
CREATE TABLE public.patients(
	patient_id uuid NOT NULL DEFAULT uuid_generate_v1mc(),
	first_name text,
	last_name text NOT NULL,
	middle_name text,
	primary_physician uuid[],
	reporting_physician uuid[],
	personal_health_care_number text,
	date_of_birth date,
	research_consent boolean,
	date_created timestamp DEFAULT now(),
	CONSTRAINT patients_pk PRIMARY KEY (patient_id)

);
-- ddl-end --
ALTER TABLE public.patients OWNER TO synoptic_manager;
-- ddl-end --

-- object: public.physicians | type: TABLE --
-- DROP TABLE IF EXISTS public.physicians CASCADE;
CREATE TABLE public.physicians(
	physician_id uuid NOT NULL DEFAULT uuid_generate_v1mc(),
	first_name text NOT NULL,
	last_name text NOT NULL,
	middle_name text,
	date_created timestamp NOT NULL DEFAULT now(),
	CONSTRAINT physicians_pk PRIMARY KEY (physician_id)

);
-- ddl-end --
ALTER TABLE public.physicians OWNER TO synoptic_manager;
-- ddl-end --

-- object: public.report_templates | type: TABLE --
-- DROP TABLE IF EXISTS public.report_templates CASCADE;
CREATE TABLE public.report_templates(
	report_template_id integer NOT NULL,
	name text NOT NULL,
	template_json jsonb NOT NULL,
	date_created timestamp DEFAULT now(),
	CONSTRAINT procedures_pk PRIMARY KEY (report_template_id)

);
-- ddl-end --
ALTER TABLE public.report_templates OWNER TO synoptic_manager;
-- ddl-end --

-- object: public.physician_authentication | type: TABLE --
-- DROP TABLE IF EXISTS public.physician_authentication CASCADE;
CREATE TABLE public.physician_authentication(
	physician_id uuid NOT NULL DEFAULT uuid_generate_v1mc(),
	username text NOT NULL,
	password text NOT NULL,
	date_created timestamp NOT NULL DEFAULT now(),
	CONSTRAINT physician_authentication_pk PRIMARY KEY (physician_id)

);
-- ddl-end --
ALTER TABLE public.physician_authentication OWNER TO synoptic_manager;
-- ddl-end --

-- object: public.patient_reports | type: TABLE --
-- DROP TABLE IF EXISTS public.patient_reports CASCADE;
CREATE TABLE public.patient_reports(
	patient_report_id uuid NOT NULL DEFAULT uuid_generate_v1mc(),
	report_type text NOT NULL,
	patient_id uuid NOT NULL,
	physician_id uuid NOT NULL,
	form_json jsonb NOT NULL,
	date_created timestamp DEFAULT now(),
	CONSTRAINT reports_pk PRIMARY KEY (patient_report_id)

);
-- ddl-end --
ALTER TABLE public.patient_reports OWNER TO synoptic_manager;
-- ddl-end --

-- object: username_index | type: INDEX --
-- DROP INDEX IF EXISTS public.username_index CASCADE;
CREATE UNIQUE INDEX username_index ON public.physician_authentication
	USING btree
	(
	  username
	)
	WITH (FILLFACTOR = 90);
-- ddl-end --

-- object: physician_index | type: INDEX --
-- DROP INDEX IF EXISTS public.physician_index CASCADE;
CREATE INDEX physician_index ON public.physicians
	USING btree
	(
	  physician_id
	)
	WITH (FILLFACTOR = 90);
-- ddl-end --

-- object: patients_fk | type: CONSTRAINT --
-- ALTER TABLE public.patient_reports DROP CONSTRAINT IF EXISTS patients_fk CASCADE;
ALTER TABLE public.patient_reports ADD CONSTRAINT patients_fk FOREIGN KEY (patient_id)
REFERENCES public.patients (patient_id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: physician_pk | type: CONSTRAINT --
-- ALTER TABLE public.patient_reports DROP CONSTRAINT IF EXISTS physician_pk CASCADE;
ALTER TABLE public.patient_reports ADD CONSTRAINT physician_pk FOREIGN KEY (physician_id)
REFERENCES public.physicians (physician_id) MATCH FULL
ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --


