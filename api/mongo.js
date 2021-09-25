const mongoose = require('mongoose')
const dbname = 'chat-app'
const options = {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}

mongoose.connect('mongodb://localhost/'+dbname, options)
  .then(() => {
    console.log('Connected to the DB')
  })
  .catch((err) => {
    console.log('There was an error ',err)
  })
