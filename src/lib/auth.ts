import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { z } from "zod";

const client = new MongoClient(process.env.MONGO_URI as string);
const db = client.db(process.env.DB_NAME as string);

const roleSchema = z.enum(["patient", "doctor", "admin"]);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
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