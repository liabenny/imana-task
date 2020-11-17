FROM node:15-alpine as build-stage
WORKDIR /app
COPY . ./
RUN npm install --verbose && npm run build --prod && rm -rf node_modules/

FROM nginx
RUN mkdir /app
COPY --from=build-stage /app/dist/frontend /app
COPY nginx.conf /etc/nginx/nginx.conf

