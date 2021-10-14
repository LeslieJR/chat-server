const mongoose = require('mongoose')
const uri = process.env.MONGODB_URI;
console.log(uri)
const options = {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}

mongoose.connect(uri, options)
  .then(() => {
    console.log('Connected to the DB')
  })
  .catch((err) => {
    console.log('There was an error ',err)
  })
