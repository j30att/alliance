# Step 1
FROM node:latest As alliance_angular_development

WORKDIR /angularApp

COPY package*.json yarn.lock ./

RUN yarn add global @angular/cli

COPY . .

# RUN yarn install

# RUN yarn build

EXPOSE 4200 49153
