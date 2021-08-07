const mongoose = require('mongoose');
const URI = "mongodb+srv://lexluthar:MNihj5rr@cluster0.jjzmt.mongodb.net/URL-Shortner-DB?retryWrites=true&w=majority&ssl=true";


const connectDB = async() =>{
    await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,   })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

    }
module.exports = connectDB;