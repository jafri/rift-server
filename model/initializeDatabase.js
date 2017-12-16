const { readdirSync, readFileSync, writeFileSync } = require('fs')
const { _ } = require('underscore')

const initializationDir = __dirname + "/initialization/"
const srcDir = initializationDir + "src/"
const tableDir = srcDir + "tables/"
const indexDir = srcDir + "indexes/"
const functionDir = srcDir + "functions/"
const distFile = initializationDir + "dist/full.sql"

const functionSql = () => {
  let sqlFiles = []
  let files = readdirSync(functionDir)

  _.each(files, (file) => {
    if (file.indexOf(".sql") > 0) {
      let sql = readFileSync(functionDir + file, {encoding : "utf-8"});
      sqlFiles.push(sql);
    }
  })

  sqlFiles.push("select 'functions installed' as result;");
  return sqlFiles.join("\r\n\r\n");
};

const tableSql = () => {
  let sqlFiles = []
  let files = readdirSync(tableDir)

  _.each(files, function(file){
    if(file.indexOf(".sql") > 0){
      sqlFiles.push(readFileSync(tableDir + file, {encoding : "utf-8"}));
    }
  })

  sqlFiles.push("select 'tables installed' as result;");

  // Add the foreign keys
  let fks = readFileSync(indexDir + "foreign_keys.sql", {encoding : "utf-8"});
  sqlFiles.push(fks);

  return sqlFiles.join("\r\n\r\n");
};


exports.build = function(){
  let buildScript = [];

  buildScript.push(`-- built on ${new Date()} --`);

  // Start transaction
  buildScript.push("BEGIN;");

  //grab the init file
  var initSql = readFileSync(initializationDir + "preInitialization.sql", {encoding : "utf-8"});
  buildScript.push(initSql);

  // Tables
  buildScript.push(tableSql());

  // Functions
  buildScript.push(functionSql());

  // End transaction
  buildScript.push("COMMIT;");

  // Write to disk
  let sql = buildScript.join("\r\n\r\n");
  writeFileSync(distFile,sql);

  return sql;
};


this.build();
