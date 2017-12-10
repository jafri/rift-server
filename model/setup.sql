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

CREATE ROLE "SynopticManager" WITH 
	LOGIN
	ENCRYPTED PASSWORD 'qpiGdY+1a9B%EVC';
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

-- object: public."Patients" | type: TABLE --
-- DROP TABLE IF EXISTS public."Patients" CASCADE;
CREATE TABLE public."Patients"(
	"patientID" uuid NOT NULL DEFAULT uuid_generate_v1mc(),
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
ALTER TABLE public."Patients" OWNER TO "SynopticManager";
-- ddl-end --

-- object: public."Physicians" | type: TABLE --
-- DROP TABLE IF EXISTS public."Physicians" CASCADE;
CREATE TABLE public."Physicians"(
	"physicianID" uuid NOT NULL DEFAULT uuid_generate_v1mc(),
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"middleName" text,
	"dateCreated" timestamp NOT NULL DEFAULT NOW(),
	CONSTRAINT "Physicians_pk" PRIMARY KEY ("physicianID")

);
-- ddl-end --
ALTER TABLE public."Physicians" OWNER TO "SynopticManager";
-- ddl-end --

-- object: public."ReportTemplates" | type: TABLE --
-- DROP TABLE IF EXISTS public."ReportTemplates" CASCADE;
CREATE TABLE public."ReportTemplates"(
	"reportTemplateID" integer NOT NULL,
	name text NOT NULL,
	"templateJSON" jsonb NOT NULL,
	"dateCreated" timestamp DEFAULT NOW(),
	CONSTRAINT "Procedures_pk" PRIMARY KEY ("reportTemplateID")

);
-- ddl-end --
ALTER TABLE public."ReportTemplates" OWNER TO "SynopticManager";
-- ddl-end --

-- object: public."PhysicianAuthentication" | type: TABLE --
-- DROP TABLE IF EXISTS public."PhysicianAuthentication" CASCADE;
CREATE TABLE public."PhysicianAuthentication"(
	"physicianID" uuid NOT NULL DEFAULT uuid_generate_v1mc(),
	username text NOT NULL,
	password text NOT NULL,
	"dateCreated" timestamp NOT NULL DEFAULT NOW(),
	CONSTRAINT "PhysicianAuthentication_pk" PRIMARY KEY ("physicianID")

);
-- ddl-end --
ALTER TABLE public."PhysicianAuthentication" OWNER TO "SynopticManager";
-- ddl-end --

-- object: public."PatientReports" | type: TABLE --
-- DROP TABLE IF EXISTS public."PatientReports" CASCADE;
CREATE TABLE public."PatientReports"(
	"patientReportID" uuid NOT NULL DEFAULT uuid_generate_v1mc(),
	"reportType" text NOT NULL,
	"patientID" uuid NOT NULL,
	"physicianID" uuid NOT NULL,
	"formJSON" jsonb NOT NULL,
	"dateCreated" timestamp DEFAULT NOW(),
	CONSTRAINT "Reports_pk" PRIMARY KEY ("patientReportID")

);
-- ddl-end --
ALTER TABLE public."PatientReports" OWNER TO "SynopticManager";
-- ddl-end --

-- object: "usernameIndex" | type: INDEX --
-- DROP INDEX IF EXISTS public."usernameIndex" CASCADE;
CREATE UNIQUE INDEX "usernameIndex" ON public."PhysicianAuthentication"
	USING btree
	(
	  username
	);
-- ddl-end --

-- object: "physicianIndex" | type: INDEX --
-- DROP INDEX IF EXISTS public."physicianIndex" CASCADE;
CREATE INDEX "physicianIndex" ON public."Physicians"
	USING btree
	(
	  "physicianID"
	);
-- ddl-end --


