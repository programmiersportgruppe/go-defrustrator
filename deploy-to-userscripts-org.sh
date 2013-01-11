#!/bin/bash
set -e
set -u

if [ $# != 2 ]; then
    echo "usage: $0 script-id filename" >&2
    exit 2
fi

SCRIPTID="$1"
SCRIPTFILE="$2"

COOKIE="/tmp/session.cookies"

read -p "Username (email address): "
USERNAME="$REPLY"
read -s -p "Password: "; echo
PASSWORD="$REPLY"

echo -n "Do login to userscripts.org... "
curl \
    --silent \
    --cookie $COOKIE \
    --cookie-jar $COOKIE \
    --data "login=$USERNAME" \
    --data "password=$PASSWORD" \
    --data "commit=Login" \
    --data "redirect" \
    --data "remember_me=0" \
    http://userscripts.org/sessions \
    >/dev/null
echo "DONE"

echo -n "Uploading scriptfile... "
curl \
    --silent \
    --cookie $COOKIE \
    -F "src=@$SCRIPTFILE" \
    -F "commit=Upload" \
    "http://userscripts.org/scripts/upload/$SCRIPTID" \
    >/dev/null
echo "DONE"
