#!/usr/bin/env bash
[[ -d "node_modules" ]] || npm i

cd backend
konsole -e "python server.py" &
cd -
konsole -e "npm run dev"
