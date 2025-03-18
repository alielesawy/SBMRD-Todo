FROM node:20 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ENV REACT_APP_API_URL=http://backend:8080
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/src/images /usr/share/nginx/html/images
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]