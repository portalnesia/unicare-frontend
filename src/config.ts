import configJson from '../config.json'

export const config = configJson;
export const domainCookie = process.env.NODE_ENV === "production" ? ".sekalatour.com" : "localhost";