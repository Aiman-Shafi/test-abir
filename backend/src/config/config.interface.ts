interface ConfigInterface { 
    PORT: number;
    MONGODB_URI: string;
    JWT_SECRET: string;
    AUTH0_DOMAIN: string;
}

export { ConfigInterface }