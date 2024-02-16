const mongoose = require("mongoose")

async function getConnect() {
    await mongoose.connect("mongodb://127.0.0.1:27017/kifayti-server")
    console.log("Database is Connected")
}
getConnect()