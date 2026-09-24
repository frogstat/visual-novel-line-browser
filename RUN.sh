#!/usr/bin/env bash
[[ -d "node_modules" ]] || npm i
konsole -e "npm run dev"
