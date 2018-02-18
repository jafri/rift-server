create function ehr.register_physician(
    first_name text,
    last_name text,
    username text,
    password text,
    email text,
    middle_name text default ''
) returns ehr.physician as $$
declare
  physician ehr.physician;
begin
  insert into ehr.physician (first_name, last_name, middle_name, email) values
    (first_name, last_name, middle_name, email)
    returning * into physician;

  insert into ehr.physician_login (physician_id, username, password) values
    (physician.physician_id, username, password);

  return physician;
end;
$$ language plpgsql strict security definer;


comment on function ehr.register_physician (text, text, text, text, text, text) is 'Provide physician information to register them.';
