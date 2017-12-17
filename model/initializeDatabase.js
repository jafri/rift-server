const { readdirSync, readFileSync, writeFileSync } = require('fs')
const { _ } = require('underscore')

const initializationDir = __dirname + "/initialization/"
const srcDir = initializationDir + "src/"
const tableDir = srcDir + "tables/"
const indexDir = srcDir + "indexes/"
const functionDir = srcDir + "functions/"
const distDir = initializationDir + "dist/"
const distFile = distDir + "init.sql"

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
  // Pre-initialization
  let preTransactionSql = readFileSync(initializationDir + "preInitialization.sql", {encoding : "utf-8"});
  writeFileSync(distDir + "preInit.sql", preTransactionSql)

  // Admin level initialization
  let initializationAdminSql = readFileSync(initializationDir + "initializationAdmin.sql", {encoding : "utf-8"});
  writeFileSync(distDir + "adminInit.sql", initializationAdminSql)

  // Initialization
  let buildScript = [];

  // Timestamp
  buildScript.push(`-- built on ${new Date()} --`);

  // Grab the init file
  let initSql = readFileSync(initializationDir + "initialization.sql", {encoding : "utf-8"});
  buildScript.push(initSql);

  // Start transaction
  buildScript.push("BEGIN;");

  // Tables
  buildScript.push(tableSql());

  // Functions
  buildScript.push(functionSql());

  // Permissions
  let permissionSql = readFileSync(initializationDir + "permissions.sql", {encoding: "utf-8"});
  buildScript.push(permissionSql);

  // End transaction
  buildScript.push("COMMIT;");

  // Write to disk
  let sql = buildScript.join("\r\n\r\n");
  writeFileSync(distFile,sql);

  return sql;
};


this.build();
