import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async ()=>{
    try{
        const conn=mongoose.connect(process.env.MONGO_URI);
        console.log(process.env.MONGO_URI)
        console.log(`MongoDB is connected`.cyan.underline)

    }catch(error){
        console.log(`Error:${error.message}`.red.underline)
        process.exit(1)

    }
}
export default connectDB