#!/usr/bin/env bash
[[ -d "node_modules" ]] || npm i

cd backend
python server.py &
procid=$!
cd -
trap "kill $procid" EXIT
konsole -e "npm run dev"
kill $procid
