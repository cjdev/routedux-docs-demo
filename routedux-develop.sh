#!/usr/bin/env bash

if [ -z "$1" ]; then
    echo "Usage: $0 <routedux_directory>"
    exit
fi

routedux="$PWD/$1"

npm install

rm -rf node_modules/routedux
ln -s "$routedux" node_modules/routedux
cd "$routedux" && yarn watch
