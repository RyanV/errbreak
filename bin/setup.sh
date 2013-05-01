#!/bin/bash

function main {
  add_git_remotes
  initializeDatabase
  installNpmGlobals
}

function add_git_remotes {
  git remote add origin git@github.com:RyanV/errbreak.git
}

function initializeDatabase {
  bin/init_db.sh
}

function installNpmGlobals {
  sudo npm install handlebars -g
}

main
