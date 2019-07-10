const express = require("express");
const morgan = require("morgan"); //Muestra peticiones en consola
const cors = require("cors");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const sesion = require("express-session");
const bd = require("express-mysql-session");
const { database } = require("./keys");

const app = express();
app.set("port", process.env.PORT || 5000);

//middleware
app.use(
  sesion({
    secret: "pipo",
    resave: false,
    saveUninitialized: false,
    store: new bd(database)
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
app.use(flash());

//globales
app.use((req, res, next) => {
  app.locals.success = req.flash("success");
  app.locals.message = req.flash("message");
  app.locals.user = req.user;
  next();
});

//routes
app.use(
  require("./routes/Recipes"),
  require("./routes/Auth"),
  require("./routes/User")
);

//servidor
app.listen(app.get("port"), () => {
  console.log("server on port", app.get("port"));
});

if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("client/build"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
