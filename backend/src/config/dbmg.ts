import mongoose from 'mongoose'
import colors from 'colors'

export const connectDB = async () =>{

    try{

        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(colors.cyan.bold('Conectado a MongoDB'))

    } catch(error){

        console.log(colors.bgRed.black.bold('error'))
        process.exit(1)
    }
}

export default connectDB