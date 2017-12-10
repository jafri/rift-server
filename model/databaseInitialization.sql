-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.9.1-alpha1
-- PostgreSQL version: 10.0
-- Project Site: pgmodeler.com.br
-- Model Author: ---

-- object: "SynopticManager" | type: ROLE --
-- DROP ROLE IF EXISTS "SynopticManager";
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'SynopticManager') THEN
        CREATE ROLE "SynopticManager" WITH
			LOGIN
			ENCRYPTED PASSWORD 'qpiGdY+1a9B%EVC';
    END IF;
END
$$;
-- ddl-end --


-- Database creation must be done outside an multicommand file.
-- These commands were put in this file only for convenience.
-- -- object: new_database | type: DATABASE --
-- -- DROP DATABASE IF EXISTS new_database;
-- CREATE DATABASE new_database
-- 	OWNER = "SynopticManager"
-- ;
-- -- ddl-end --
--

-- object: node | type: SCHEMA --
-- DROP SCHEMA IF EXISTS node CASCADE;
CREATE SCHEMA node;
-- ddl-end --
ALTER SCHEMA node OWNER TO "SynopticManager";
-- ddl-end --

SET search_path TO pg_catalog,public,node;
-- ddl-end --

-- object: node."Patients" | type: TABLE --
-- DROP TABLE IF EXISTS node."Patients" CASCADE;
CREATE TABLE node."Patients"(
	"patientID" uuid NOT NULL,
	"firstName" text,
	"lastName" text NOT NULL,
	"middleName" text,
	"primaryPhysician" uuid[],
	"reportingPhysician" uuid[],
	"personalHealthCareNumber" text,
	"dateOfBirth" date,
	"researchConsent" boolean,
	"dateCreated" timestamp DEFAULT NOW(),
	CONSTRAINT "Patients_pk" PRIMARY KEY ("patientID")

);
-- ddl-end --
ALTER TABLE node."Patients" OWNER TO "SynopticManager";
-- ddl-end --

-- object: node."Physicians" | type: TABLE --
-- DROP TABLE IF EXISTS node."Physicians" CASCADE;
CREATE TABLE node."Physicians"(
	"physicianID" uuid NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"middleName" text,
	"dateCreated" timestamp NOT NULL DEFAULT NOW(),
	CONSTRAINT "Physicians_pk" PRIMARY KEY ("physicianID")

);
-- ddl-end --
ALTER TABLE node."Physicians" OWNER TO "SynopticManager";
-- ddl-end --

-- object: node."ReportTemplates" | type: TABLE --
-- DROP TABLE IF EXISTS node."ReportTemplates" CASCADE;
CREATE TABLE node."ReportTemplates"(
	"reportTemplateID" integer NOT NULL,
	name text NOT NULL,
	"templateJSON" jsonb NOT NULL,
	"dateCreated" timestamp DEFAULT NOW(),
	CONSTRAINT "Procedures_pk" PRIMARY KEY ("reportTemplateID")

);
-- ddl-end --
ALTER TABLE node."ReportTemplates" OWNER TO "SynopticManager";
-- ddl-end --

-- object: node."PhysicianAuthentication" | type: TABLE --
-- DROP TABLE IF EXISTS node."PhysicianAuthentication" CASCADE;
CREATE TABLE node."PhysicianAuthentication"(
	"physicianID" uuid NOT NULL,
	username text NOT NULL,
	password text NOT NULL,
	"dateCreated" timestamp NOT NULL DEFAULT NOW(),
	CONSTRAINT "PhysicianAuthentication_pk" PRIMARY KEY ("physicianID")

);
-- ddl-end --
ALTER TABLE node."PhysicianAuthentication" OWNER TO "SynopticManager";
-- ddl-end --

-- object: node."PatientReports" | type: TABLE --
-- DROP TABLE IF EXISTS node."PatientReports" CASCADE;
CREATE TABLE node."PatientReports"(
	"patientReportID" uuid NOT NULL,
	"reportType" text NOT NULL,
	"patientID" uuid NOT NULL,
	"physicianID" uuid NOT NULL,
	"formJSON" jsonb NOT NULL,
	"dateCreated" timestamp DEFAULT NOW(),
	CONSTRAINT "Reports_pk" PRIMARY KEY ("patientReportID")

);
-- ddl-end --
ALTER TABLE node."PatientReports" OWNER TO "SynopticManager";
-- ddl-end --

-- object: "usernameIndex" | type: INDEX --
-- DROP INDEX IF EXISTS node."usernameIndex" CASCADE;
CREATE UNIQUE INDEX "usernameIndex" ON node."PhysicianAuthentication"
	USING btree
	(
	  username
	);
-- ddl-end --

-- object: "physicianIndex" | type: INDEX --
-- DROP INDEX IF EXISTS node."physicianIndex" CASCADE;
CREATE INDEX "physicianIndex" ON node."Physicians"
	USING btree
	(
	  "physicianID"
	);
-- ddl-end --
