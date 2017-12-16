# Anofron Model

## Enviroment Setup
All development on the model will be done in 'initialization/src'. The preinitialization script initializes the role and schema. 

There are seperate folder for functions, indexes and tables. If you make any changes using pgModeler, find the change and place it in the correct folder/file. This is necessary as it is a nightmare to debug a huge file.

To compile into single SQL file run `node initializeDB`, the output SQL is at 'initialization/dist'


The following config lays out the current settings
```
{
  "host": "localhost",
  "port": "5432",
  "database": "anofron",
  "user": "synoptic_manager",
  "password": "qpiGdY+1a9B%EVC"
}
```

# Viewing model
To view the PostgreSQL model, you need to install [pgModeler](https://www.pgmodeler.com.br/support/installation).

Also install pgAdmin 4

Create a new database with the name 'anofron'

Run the script from 'initialization/dist/full.sql' using the query tool

Go to pgModeler and click import on the left and connect to the database to import the model.
