// require ./app.js
const app = require('./app');
// require /database.js
const connectDatabase = require('./config/database');

// call connectDatabase function
connectDatabase();


// start server
const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT} in ${process.env.NODE_ENV}`);
})