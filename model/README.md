# Anofron Model
For now pgmodeler does not accept SCRAM authentication, make your pg_hba.conf look like this:
```
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     md5
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
# IPv6 local connections:
host    all             pgmodeler       ::1/128                 trust
host    all             all             ::1/128                 md5
```

Make sure you restart your server using the following in your postgres directory `pg_ctl restart -D .`

## Enviroment Setup
All you have to do is run `bash ./initializeDatabase.sh`

It will first ask you for your user pass, then the pass for the server_manager and then the anofron manager role. Both of the latter passwords are found in `model/initialization/preInitialization.sql'`

# Viewing model
To view the PostgreSQL model, you need to install [pgModeler](https://www.pgmodeler.com.br/support/installation).

Make sure your database is running

Go to pgmodeler settings and set the database name to anofron and the username:password to pgmodeler:pgmodelisbest

Go to pgModeler and click import on the left and connect to the database to import the model.
