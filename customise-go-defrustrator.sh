#!/usr/bin/env bash
URL_PATTERN=$1
TARGET_SCRIPT_NAME=$2
UPDATE_URL=$3
cat go-defrustrator.user.js | ./customise-include.sh $URL_PATTERN $UPDATE_URL> $TARGET_SCRIPT_NAME
