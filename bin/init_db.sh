#!/bin/bash
psql postgres -c 'CREATE DATABASE errbreak_dev;'
cat config/structure.sql | psql errbreak_dev

psql postgres -c 'CREATE DATABASE errbreak_test;'
cat config/structure.sql | psql errbreak_test
