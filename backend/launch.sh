#!/usr/bin/env bash

[[ ! -f "./app" ]] && echo "No app found" && exit 1
[[ ! -f "./server.py" ]] && echo "No server found" && exit 1

python server.py &
procid=$!
trap "kill $procid" EXIT
./app
kill $procid
