-- after schema creation and before function creation
alter default privileges revoke execute on functions from public;

-- EHR schema permission --
grant usage on schema ehr to anonymous, physician;

-- Physician TABLE: Access to physicians --
grant select, update, insert, delete on table ehr.physician to physician;

-- Physician Login TABLE: Access to anonymous, physician --
grant select, update, insert, delete on table ehr.physician_login to anonymous, physician;

-- Patient TABLE: Access to physicians --
grant select, update, insert, delete on table ehr.patient to physician;

-- Patient Report TABLE: Access to physicians --
grant select, update, insert, delete on table ehr.patient_report to physician;

-- FUNCTIONS Permissions on TABLE --
grant execute on function ehr.authenticate_physician(text, text) to anonymous, physician, anofron_manager;
grant execute on function ehr.current_physician to physician, anofron_manager;
grant execute on function ehr.patient_full_name(ehr.patient) to physician, anofron_manager;
grant execute on function ehr.register_physician(text, text, text, text, text, text) to anonymous, physician, anofron_manager;


-- Row Level Security --
alter table ehr.physician enable row level security;
alter table ehr.physician_login enable row level security;
alter table ehr.patient enable row level security;
alter table ehr.patient_report enable row level security;

-- Row level security permissions --
set local jwt.claims.a to 1;
set local jwt.claims.b to 2;
-- set local jwt.claims.physician_id to 'ffff2ad6-e2f6-11e7-adac-dfd007957846';

-- Patient Table --
create policy select_physician on ehr.physician for select to physician
  using (physician_id::text = current_setting('jwt.claims.physician_id'));

create policy insert_physician on ehr.physician for insert to physician
  with check (physician_id::text = current_setting('jwt.claims.physician_id'));

create policy update_physician on ehr.physician for update to physician
  using (physician_id::text = current_setting('jwt.claims.physician_id'));

create policy delete_physician on ehr.physician for delete to physician
  using (physician_id::text = current_setting('jwt.claims.person_id'));
