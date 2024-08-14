const mongoose = require('mongoose');

//mongoose database URi
const mongoURI = "mongodb://localhost:27017/inotebook"

//checking connection to db
const connectToMongo = () => {
  mongoose.connect(mongoURI).then(() =>
    console.log("Connected to mongoose successfully")).catch((e) => console.log(e.message))

}

module.exports = connectToMongo;