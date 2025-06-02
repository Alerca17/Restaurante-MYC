import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';

dotenv.config()

export const db = new Sequelize(process.env.DATABA_URL,{
models: [__dirname + '/../models/**/'],
    dialectOptions: {
        ssl:{
            require: false
        }
    }
});