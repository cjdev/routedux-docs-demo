#!/usr/bin/env bash

if [ -z "$1" ]; then
    echo "Usage: $0 <routedux_directory>"
    exit
fi

routedux="$PWD/$1"

#npm install

rm -rf node_modules/routedux
ln -s "$routedux" node_modules/routedux


cd "$routedux"
rm -rf node_modules
# needed b/c of issues with duplicate react copies
npm install --only-prod

npm run watch
