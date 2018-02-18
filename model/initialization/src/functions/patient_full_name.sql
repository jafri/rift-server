create function ehr.patient_full_name(patient ehr.patient) returns text as $$
  select patient.first_name || ' ' || patient.middle_name || ' ' || patient.last_name
$$ language sql stable;

comment on function ehr.patient_full_name(patient ehr.patient) is 'Concatenates patients first name, middle name and last name.';
