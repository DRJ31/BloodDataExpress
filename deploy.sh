#!/bin/bash

tar xvf project.tar.xz -C application/blood
cd application/blood
yarn install
pm2 start build/app.js