import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { z } from "zod";

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/healora";
const client = new MongoClient(mongoUri);
const dbName = process.env.DB_NAME || "healora";
const db = client.db(dbName);

const roleSchema = z.enum(["patient", "doctor", "admin"]);

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || "fallback_secret_for_development_only",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        input: true,
        defaultValue: "patient",
        validator: {
          input: roleSchema,
          output: roleSchema,
        },
      },
    },
  },
});