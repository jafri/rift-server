CREATE ROLE "anofron_manager" WITH
  LOGIN
  ENCRYPTED PASSWORD 'qpiGdY+1a9B%EVC';

-- TODO: In production, we will need to change these passwords and create a new user with less permssions.
  
CREATE DATABASE anofron
  WITH
    OWNER = anofron_manager
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
  CONNECTION LIMIT = -1;

