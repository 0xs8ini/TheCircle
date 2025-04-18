const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const session = require("express-session");

const User = require("./DB/User.Schema.js");
const { IsAuthenticated } = require("./middleware/IsAuth.middleWare.js");

dotenv.config();

const PORT = process.env.PORT || 6000;
const app = express();

app.use(express.static(path.join(__dirname, "../FrontEnd")));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB,
        collectionName: "sessions"
      }),
      cookie: {   maxAge: 1000 * 100 * 100, 
        secure: process.env.NODE_ENV === "production", 
        httpOnly: true,}
  })
);

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("[+] Connected To THE DB");
  })
  .catch((error) => {
    console.log("[-] Error connecting to DB:", error);
  });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd", "index.html"));
});

app.get("/future", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd", "FuturePage.html"));
});

app.get("/api/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd", "userRegister.html"));
});

app.get("/dashboard", IsAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd", "FuturePage.html")); 
  });
  

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd", "userLogin.html"));
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  req.session.user = user;
  res.redirect("/dashboard");
});

app.post("/api/register", async (req, res) => {
  const { name, username, password, email } = req.body;

  if (!name || !username || !password || !email) {
    return res.status(400).send("Missing Fields");
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).send("Username or email already taken");
    }

    const newUser = new User({
      name,
      username,
      password,
      email,
    });

    await newUser.save();
    res.send("Registration Completed");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../FrontEnd", "404Page.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
