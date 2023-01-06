#!/bin/bash
REPOSITORY=/home/ubuntu/build

cd $REPOSITORY

sudo npx prisma generate

sudo /usr/bin/yarn

sudo /usr/bin/pm2 start dist