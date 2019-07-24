#!/bin/zsh
forever stopall
forever start -o /home/ubuntu/beepbot/out.log -e /home/ubuntu/beepbot/err.log /home/ubuntu/beepbot/index.js