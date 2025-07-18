#!/bin/bash
cat src/jquery.js src/index.js | tr -d '\t\n' | tr -s ' ' > dist/entry.js