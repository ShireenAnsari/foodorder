import mongoose from "mongoose";

export const Db=async ()=>{
    try {
        const connectioninstance = mongoose.connect(process.env.MONGODB_URI);
        console.log(`\n MongoDB connected !! DB HOST: ${(await connectioninstance).connection.host} `);
        // mongoose.model('User');
    }
    catch(error)
    {
        console.log('MongoDB Error')
    }
}