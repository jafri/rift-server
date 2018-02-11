-- PostgreSQL version: 10.0
-- Model Author: Anofron ---
-- From the command line, connect using a superuser --
-- Usage: psql -d postgres -U superuser --
-- Initializes Roles and Initializes Database --

-------------------------------------
--------- Drop anofron DB -----------
-------------------------------------
-- DROP THE ANOFRON DATABASE --
DROP DATABASE IF EXISTS anofron;
-- ddl-end --



-----------------------------
--- Create server_manager ---
-----------------------------
-- object: "server_manager" | type: ROLE --
-- Creates the server_manager role if it does not exist --
DROP ROLE IF EXISTS server_manager;

CREATE ROLE "server_manager" WITH
  LOGIN SUPERUSER CREATEDB CREATEROLE REPLICATION BYPASSRLS
  ENCRYPTED PASSWORD '^xJntNp]eZ$2*4K<';
-- ddl-end --


------------------------------
-- Server Manager from now --
------------------------------
SET ROLE server_manager;


-----------------------------------
-- Drop and recreate other roles --
-----------------------------------
-- object: "anofron_manager" | type: ROLE --
-- Creates the anofron_manager role if it does not exist --
DROP ROLE IF EXISTS anofron_manager;

CREATE ROLE "anofron_manager" WITH
  LOGIN
  ENCRYPTED PASSWORD 'qpiGdY+1a9B%EVC';
-- ddl-end --

-- object: "physician" | type: ROLE --
-- Creates the physician role if it does not exist --
DROP ROLE IF EXISTS physician;

CREATE ROLE "physician" WITH
  LOGIN
  ENCRYPTED PASSWORD 'f>KFaw[z^(%dD8/)';
-- ddl-end --

-- object: "anonymous" | type: ROLE --
-- Creates the anonymous role if it does not exist --
DROP ROLE IF EXISTS anonymous;

CREATE ROLE "anonymous";
-- ddl-end --




-----------------------------------------
--------- Recreate anofron DB -----------
-----------------------------------------
-- Create Anofron Database --
CREATE DATABASE anofron
  WITH
    OWNER = anofron_manager
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
  CONNECTION LIMIT = -1;


---------------------------------------------------
-- Create pgmodeler role **REMOVE IN PRODUCTION**--
---------------------------------------------------
-- object: "pgmodeler" | type: ROLE --
-- Creates the pgmodeler role if it does not exist --
DROP ROLE IF EXISTS pgmodeler;

CREATE ROLE "pgmodeler" WITH
  LOGIN SUPERUSER CREATEDB CREATEROLE REPLICATION BYPASSRLS
  ENCRYPTED PASSWORD 'pgmodelisbest';
