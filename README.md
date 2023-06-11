# Node.js Typescript Boilerplate

### Getting Started

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev` to start the development server

### Scripts

-   `npm run dev` - Start the development server
-   `npm run build` - Build the project
-   `npm run start` - Start the production server
-   `npm run lint` - Run the linter

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

### Folder Structure

```
.
├── .vscode
│   └── settings.json
├── build/
├── node_modules
├── src
│   ├── config
│   │   └── index.ts
│   ├── controllers
│   │   └── {controller_name}.controller.ts
│   └── library
│       └── {library_name}.ts
│   ├── middlewares
│   │   └── {middleware_name}.middleware.ts
│   ├── models
│   │   └── {model_name}.model.ts
│   ├── routes
│   │   └── index.tsx
│   │   └── {route_name}.route.ts
│   └── services
│       └── {service_name}.services.ts
│   └── server.ts
├── .env
├── .env.example
├── .gitignore
├── .prettierrc
├── LICENSE.md
├── package-lock.json
├── package.json
├── README.md
└── tsconfig.json
```
