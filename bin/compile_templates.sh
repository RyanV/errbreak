#!/bin/bash
handlebars app/assets/templates/* \
  --namespace ErrBreak.templates \
  --root app/assets/templates \
  -f public/assets/javascripts/templates.js
