-- INITIALIZATION BLOCK --

-- Set role to anofron_manager for the ROLE to be set as default for tables --
SET ROLE anofron_manager;

-- Create Schemas --
create schema IF NOT EXISTS ehr;

-- AN INDEX IS NOT NECESSARY FOR PRIMARY KEYS, POSTGRESQL CREATES THAT AUTOMATICALLY --
