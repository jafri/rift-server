create function ehr.current_physician() returns ehr.physician as $$
  select *
  from ehr.physician
  where physician_id::text = current_setting('jwt.claims.physician_id');
$$ language sql stable;

comment on function ehr.current_physician is 'Return physician data identified by JWT.';
