import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("HandyHub");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client,
    }),

    emailAndPassword: {
        enabled: true,
    },

    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "customer",
            },
            phone: {
                type: "string",
                required: false,
            },
            address: {
                type: "string",
                required: false,
            },
        },
    },
});