#!/bin/sh
echo "instal bcrypt..."
npm i phc-bcrypt
echo "finish instalation bcrypt..."

echo "Running migrations..."
# node ace migration:rollback --batch 0

node ace migration:run

echo "Running seed"
node ace db:seed

echo "Starting Adonis server..."


if [ ${NODE_ENV} = "production" ]; then
  yarn run build
  yarn run start
else
  yarn run dev
fi