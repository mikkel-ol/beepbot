#!/bin/zsh
forever stopall
forever start -o /home/ec2-user/beepbot/out.log -e /home/ec2-user/beepbot/err.log /home/ec2-user/beepbot/index.js