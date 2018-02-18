-- object: patient_report_patient_id_fkey | type: CONSTRAINT --
-- ALTER TABLE ehr.patient_reports DROP CONSTRAINT IF EXISTS patient_report_patient_id_fkey CASCADE;
ALTER TABLE ehr.patient_report ADD CONSTRAINT patient_report_patient_id_fkey FOREIGN KEY (patient_id)
  REFERENCES ehr.patient (patient_id) MATCH FULL
  ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: patient_report_physician_id_fkey | type: CONSTRAINT --
-- ALTER TABLE ehr.patient_report DROP CONSTRAINT IF EXISTS patient_report_physician_id_fkey CASCADE;
ALTER TABLE ehr.patient_report ADD CONSTRAINT patient_report_physician_id_fkey FOREIGN KEY (physician_id)
  REFERENCES ehr.physician (physician_id) MATCH FULL
  ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --

-- object: physician_login_physician_id_fkey | type: CONSTRAINT --
-- ALTER TABLE ehr.physician_login DROP CONSTRAINT IF EXISTS physician_login_physician_id_fkey CASCADE;
ALTER TABLE ehr.physician_login ADD CONSTRAINT physician_login_physician_id_fkey FOREIGN KEY (physician_id)
  REFERENCES ehr.physician (physician_id) MATCH FULL
  ON DELETE NO ACTION ON UPDATE NO ACTION;
-- ddl-end --
