const mongoose = require('mongoose')

module.exports= async()=>{
    try {
        await mongoose.connect("mongodb+srv://seiga:seiga@devconnector.dhxe6.mongodb.net/transaction-midtrans?retryWrites=true&w=majority")
        console.log("connected to mongoDB")
    } catch (error) {
        console.log(error)
    }
}