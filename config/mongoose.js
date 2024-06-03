
const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://sarankumar:5HQi4yaGPcqCiDDg@cluster.970rxyv.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// mongoose
//   .connect(process.env.MONGODB_URL,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//     console.log('Connecting to MongoDB cloud');
//   })
//   .catch((err) => {
//     console.log(err);
//   });







//For LocalHost mongoDB
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/movieproject');

// const db = mongoose.connection;

// db.on('error',console.error.bind(console,"Error while connecting to database"));

// db.once('open',function(){
//     console.log("Connected to Database");
// });

// module.exports = db;