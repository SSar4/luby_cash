FROM node:14.17.3

WORKDIR /usr/app

COPY . .

RUN npm install

EXPOSE 3333

# Run with npm
# CMD ["npm", "run", "dev"]

# Run with node ace
CMD ["node", "ace", "serve", "--watch"]

