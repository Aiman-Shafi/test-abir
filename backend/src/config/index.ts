import { ConfigInterface } from "./config.interface";
import "dotenv/config";

export const Config: ConfigInterface = { 
    PORT: parseInt(process.env['PORT'] || "24100"),
    MONGODB_URI: process.env['MONGODB_URI'] || "mongodb://localhost:27017/loupt-db",
    JWT_SECRET: process.env['JWT_SECRET'] || "loupt-jwt-secret",
    AUTH0_DOMAIN: process.env['AUTH0_DOMAIN'] || "dev-4qjh8kiabd6uqtn6.us.auth0.com"
}