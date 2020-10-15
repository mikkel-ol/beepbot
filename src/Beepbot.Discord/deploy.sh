#!/bin/bash

apt update

# FFMPEG
apt install ffmpeg
ffmpeg -version

# Install package
npm install
npm run build
NODE_PATH=build node build/src/main.js