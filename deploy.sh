#!/bin/bash

rm -rf application/blood
mkdir application/blood
tar xvf project.tar.xz -C application/blood
cd application/blood
export PATH=/usr/local/node/bin:$PATH
yarn install
pm2 start build/app.js