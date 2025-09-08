# build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# inject API endpoints at build time (can be overridden by build args)
ARG GRAPHQL_HTTP=http://api:8080/graphql
ARG GRAPHQL_WS=ws://api:8080/graphql
ENV VITE_GRAPHQL_HTTP=$GRAPHQL_HTTP
ENV VITE_GRAPHQL_WS=$GRAPHQL_WS
RUN npm run build

# serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
