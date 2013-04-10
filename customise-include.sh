#!/usr/bin/env bash
sed "s|@include.*|@include     $1|" \
    | sed "s|@downloadURL.*|@downloadURL  $2|"
