// require mongoose
const mongoose = require('mongoose');

// connect to database
const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true
    }).then((con) => {
        console.log(`Database connected to the host: ${con.connection.host}:${con.connection.port}`);
    })
};

// export the function
module.exports = connectDatabase;