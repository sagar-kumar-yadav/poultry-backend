import mongoose from "mongoose";

// here we connect database with server
const connectDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mongodb database ${conn.connection.host}`)
    }catch(error) {
        console.log(`error connecting to mongodb database ${error}`)
    }
};

export default connectDatabase;