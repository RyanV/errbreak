#!/bin/bash
psql postgres -c 'CREATE DATABASE errbreak_dev;'
cat db/structure.sql | psql errbreak_dev

psql postgres -c 'CREATE DATABASE errbreak_test;'
cat db/structure.sql | psql errbreak_test
