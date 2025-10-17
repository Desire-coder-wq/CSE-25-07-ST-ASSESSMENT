const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const passport = require('passport');
const app = express();



// Routers
const indexRouter = require('./routes/indexRouter');
const authRouter = require('./routes/authRouter');

// -----------------------
// MongoDB Connection
// -----------------------
mongoose.connect("mongodb://127.0.0.1:27017/assessment", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Successfully connected to MongoDB"))
.catch(err => console.error(" MongoDB connection error:", err));

// -----------------------
// Middleware
// -----------------------
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
  secret: 'refactory-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set to true if using HTTPS
}));


app.use('/', indexRouter);
app.use('/auth', authRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { title: "Page Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { title: "Server Error" });
});

// -----------------------
// Start Server
// -----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
