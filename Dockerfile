FROM node:16-alpine as build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
COPY .env.production .env
RUN yarn build && yarn cache clean
ENV NODE_ENV production

FROM nginx:stable-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
