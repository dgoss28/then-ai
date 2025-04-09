import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const PORT = process.env.PORT || "9000"
const HOST = process.env.HOST || '0.0.0.0'

const prodModules = [
  {
    resolve: "@medusajs/medusa/cache-redis",
    options: {
      redisUrl: process.env.REDIS_URL ?? "redis://localhost:6379",
    },
  },
  {
    resolve: "@medusajs/medusa/event-bus-redis",
    options: {
      redisUrl: process.env.REDIS_URL ?? "redis://localhost:6379",
    },
  },
  {
    resolve: `@nicogorga/medusa-product-attributes`,
  },
  {
    resolve: "@medusajs/medusa/workflow-engine-redis",
    options: {
      redis: {
        url: process.env.REDIS_URL ?? "redis://localhost:6379",
      },
    },
  },
]

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:3000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:7000",
      authCors: process.env.AUTH_CORS || "http://localhost:3000",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
    workerMode: process.env.MEDUSA_WORKER_MODE as "shared" | "worker" | "server",
    redisUrl: process.env.REDIS_URL,
  },
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
    backendUrl: process.env.MEDUSA_BACKEND_URL || `http://${HOST}:${PORT}`,
  },
  modules: process.env.NODE_ENV === 'development' ? undefined : prodModules,
});

