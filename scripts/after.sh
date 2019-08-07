#!/bin/bash
cd /home/ubuntu/beepbot
sudo -u ubuntu -H npm install --production
# Hot fix for different Node version compiling
#npm rebuild