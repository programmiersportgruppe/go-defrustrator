#!/usr/bin/env bash
cat go-defrustrator.user.js | ./customise-include.sh $1 > $2
