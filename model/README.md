# Anofron Model

## Enviroment Setup
To view the PostgreSQL model, you need to install [pgModeler](https://www.pgmodeler.com.br/support/installation).

To create a SQL file from the model, run ```./create_sql_script.sh```

To connect the application database to the PostgreSQL server, you need to modify the ```config.js``` file. Here is the template for the file:

```
{
  "host": "localhost",
  "port": "5432",
  "database": "anofron",
  "user": "username",
  "password": "password"
}
```
