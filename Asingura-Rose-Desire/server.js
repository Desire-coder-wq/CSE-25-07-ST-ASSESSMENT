const express = require("express"); 
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcryptjs");
const session = require("express-session"); 
const app = express();


const indexRouter = require('./routes/indexRouter');
const authRouter = require('./routes/authRouter');

// Database connection
mongoose
  .connect("mongodb://127.0.0.1:27017/assessment")
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Middleware
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

// Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
