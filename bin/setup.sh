#!/bin/bash

function main {
  add_git_remotes
  installNpmGlobals
}

function add_git_remotes {
  git remote add origin git@github.com:RyanV/errbreak.git
}

function installNpmGlobals {
  sudo npm install handlebars -g
}

main
