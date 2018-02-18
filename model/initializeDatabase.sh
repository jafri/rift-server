#!/bin/bash

scriptdir=`dirname "$BASH_SOURCE"`

# Javascript using node
node "$scriptdir"/initializeDatabase.js

# Pre initialize
psql -d postgres -U $USER -f "$scriptdir"/initialization/dist/preInit.sql

# Admin initialize
psql -d anofron -U server_manager -f "$scriptdir"/initialization/dist/adminInit.sql

# Initialize
psql -d anofron -U anofron_manager -f "$scriptdir"/initialization/dist/init.sql
