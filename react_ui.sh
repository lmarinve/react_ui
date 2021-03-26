#!/bin/sh

rm ~/managerdev/services/react_ui/dist/*
npm run build
rm -r ~/managerdev/services/proxy/www/*.jpg
rm -r ~/managerdev/services/local_proxy/www/*.jpg
rm -r ~/managerdev/services/proxy/www/*.js
rm -r ~/managerdev/services/local_proxy/www/*.js
rm -r ~/managerdev/services/proxy/www/*.html
rm -r ~/managerdev/services/local_proxy/www/*.html
cp ./dist/* ~/managerdev/services/proxy/www/
cp ./dist/* ~/managerdev/services/local_proxy/www/

