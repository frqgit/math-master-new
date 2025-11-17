import type { RequestHandler } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import createMemoryStoreFactory from "memorystore";
import { Pool } from "pg";

const SESSION_NAME = "tabletrek.sid";
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

let pool: Pool | null = null;
let store: session.Store | null = null;
let middleware: RequestHandler | null = null;

function resolvePool(): Pool {
  if (pool) {
    return pool;
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set. Session store requires a database connection.");
  }

  const isLocalConnection = /localhost|127\.0\.0\.1/.test(connectionString);

  pool = new Pool({
    connectionString,
    max: 5,
    ssl: isLocalConnection ? false : { rejectUnauthorized: false },
  });

  return pool;
}

function resolveStore(): session.Store {
  if (store) {
    return store;
  }

  if (process.env.DATABASE_URL) {
    const PgStore = connectPgSimple(session);
    store = new PgStore({
      pool: resolvePool(),
      createTableIfMissing: true,
      tableName: "session",
    });
    return store;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("DATABASE_URL environment variable must be set in production to persist sessions.");
  }

  const createMemoryStore = createMemoryStoreFactory(session);
  store = new createMemoryStore({
    checkPeriod: TWENTY_FOUR_HOURS,
  });

  console.warn("⚠️  DATABASE_URL is not set. Falling back to in-memory sessions. Sessions will not persist across restarts.");
  return store;
}

function resolveSecret(): string {
  if (!process.env.SESSION_SECRET) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("SESSION_SECRET environment variable must be set in production.");
    }

    console.warn("⚠️  SESSION_SECRET is not set. Using a development fallback secret.");
    return "development-session-secret";
  }

  return process.env.SESSION_SECRET;
}

export function createSessionMiddleware(): RequestHandler {
  if (middleware) {
    return middleware;
  }

  const isProduction = process.env.NODE_ENV === "production";

  middleware = session({
    name: SESSION_NAME,
    secret: resolveSecret(),
    resave: false,
    saveUninitialized: false,
    store: resolveStore(),
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: isProduction,
      maxAge: TWENTY_FOUR_HOURS,
    },
  });

  return middleware;
}
