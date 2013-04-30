#!/bin/bash
grunt concat
grunt watch &
sudo nodemon server.js -w server.js -w app -w grunt -w lib
