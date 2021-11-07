FROM node:latest As alliance_nest_development

WORKDIR /nestApp

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

# RUN yarn build

EXPOSE 3000
