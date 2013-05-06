#!/bin/bash
function main() {
  exportEnvironmentVars
  compileTemplates
  buildClientJs
  watchAssetsForChange
  nodemonServerStart
}

function exportEnvironmentVars {
  export NODE_ENV="development"
}

function compileTemplates {
  bin/compile_templates.sh
}

function buildClientJs {
  grunt concat
}

function watchAssetsForChange {
  grunt watch &
}

function nodemonServerStart {
  sudo nodemon server.js \
    -w server.js \
    -w app/collections \
    -w app/models \
    -w grunt \
    -w lib \
    -w routes
}

main
