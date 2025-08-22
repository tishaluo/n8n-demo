# 基于 node 构建前端产物，再用 nginx 运行
FROM node:18 AS build
WORKDIR /app
COPY . ./
RUN npm install -g pnpm && pnpm install && pnpm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
