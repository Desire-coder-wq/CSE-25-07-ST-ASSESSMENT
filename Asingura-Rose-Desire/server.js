const express = reqiure("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

const indexRouter = require('./Asingura-Rose-Desire/routes/index');
const authRouter = require('./routes/authRouter');

//database connection

mongoose
  .connect("mongodb://127.0.0.1:27017/assessment")
  .then(() => console.log(" Successfully connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

  
//middleware
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.use(session({
  secret: 'refactory-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Routes


app.use('/', indexRouter);
app.use('/auth', authRouter);


// server
const PORT = 6000;
app.listen(PORT, ()=> console.log(`server running on http://localhost:${PORT}`));