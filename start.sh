#!/bin/sh
echo 'start chrome' 
open -a "/Applications/Google Chrome.app" "index.html"
echo  'start nodejs server'
node http.js