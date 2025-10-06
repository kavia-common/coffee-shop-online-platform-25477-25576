#!/bin/bash
cd /home/kavia/workspace/code-generation/coffee-shop-online-platform-25477-25576/coffee_shop_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

