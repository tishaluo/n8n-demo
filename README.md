# React + Ant Design + Axios + React Router + TypeScript Starter

本项目是一个开箱即用的中后台前端模板，集成了 [React](https://react.dev/)、[Ant Design](https://ant.design/)、[Axios](https://axios-http.com/)、[React Router v6](https://reactrouter.com/) 以及 TypeScript，支持 API 反向代理和基础接口封装。

## 目录结构

```
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   ├── request.ts
│   │   └── user.ts
│   ├── pages/
│   │   └── History.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── setupProxy.js
├── package.json
├── tsconfig.json
└── README.md
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm start
```

### 3. 打包构建

```bash
npm run build
```

## 反向代理说明

- `src/setupProxy.js` 已配置 `/api` 路径的代理，开发环境下所有以 `/api` 开头的请求会被转发到你配置的后端服务器（默认 `http://localhost:5000`）。
- 你可以根据实际后端地址修改 `target` 字段。

## 主要功能

- **Ant Design**：UI 组件库，已全局引入。
- **Axios 封装**：`src/api/request.ts` 进行统一请求/响应拦截封装。
- **接口示例**：`src/api/user.ts` 提供基础用户信息获取接口。
- **路由示例**：`src/pages/History.tsx` 提供 `/history` 页面示例，`src/App.tsx` 配置前端路由。
- **TypeScript 支持**：类型安全开发体验。

## 其他

- 推荐配合 [json-server](https://github.com/typicode/json-server) 或 [mock service worker](https://mswjs.io/) 开发 mock API。
- 如需更多页面、权限路由、布局等功能，请自由扩展。

---

## License

MIT