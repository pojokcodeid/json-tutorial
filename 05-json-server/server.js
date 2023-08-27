const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

server.use(
  cors({
    origin: true,
    credentials: true,
    preflightContinue: false,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
server.options("*", cors());

server.use(middlewares);

server.use(jsonServer.bodyParser);
function generateAccessToken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

function verifyAccessToken(token) {
  try {
    return jwt.verify(token, process.env.TOKEN_SECRET);
  } catch (err) {
    return null;
  }
}

server.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  const data = router.db
    .get("users")
    .filter((user) => {
      return user.username === username;
    })
    .value();

  if (data.length > 0) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const newUser = {
    id: router.db.get("users").value().length + 1,
    username,
    password,
  };

  router.db.get("users").push(newUser).write();

  const token = generateAccessToken({
    id: newUser.id,
    username: newUser.username,
  });
  res.json({ token });
});

server.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const data = router.db
    .get("users")
    .filter((user) => {
      return user.username === username;
    })
    .value();
  if (data.length === 0) {
    return res.status(400).json({ message: "Username not found" });
  }

  if (data[0].password !== password) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  const token = generateAccessToken({
    id: data[0].id,
    username: data[0].username,
  });
  res.json({ token });
});

function autenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  const user = verifyAccessToken(token);
  if (!user) {
    return res.status(401).json({ message: "Invalid token" });
  }

  req.user = user;
  next();
}

server.use("/*", autenticate, (req, res, next) => {
  next();
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running http://localhost:3000/");
});
