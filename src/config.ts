import dotenv from "dotenv";
dotenv.config();

const config = {
   port: parseInt(process.env.PORT as string) || 3000,
   privateKey: process.env.JWT_PRIVATE as string,
   publicKey: process.env.JWT_PUBLIC as string,
};

export default config;
