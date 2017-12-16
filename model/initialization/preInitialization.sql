-- PostgreSQL version: 10.0
-- Model Author: Anofron ---

-- object: "SynopticManager" | type: ROLE --
-- DROP ROLE IF EXISTS "SynopticManager";

-- Prepended SQL commands --
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- ddl-end --

-- object: "synoptic_manager" | type: ROLE --
-- Creates the synoptic_manager role if it does not exist --
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


-- Set role to synoptic_manager for the ROLE to be set as default for tables --
SET ROLE synoptic_manager;

-- Create Schemas --
create schema ehr;

-- AN INDEX IS NOT NECESSARY FOR PRIMARY KEYS, POSTGRESQL CREATES THAT AUTOMATICALLY --

