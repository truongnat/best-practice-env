import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { logger } from "./middlewares/logger.js";
import db from "./db/index.js";
import { genApiKey } from "./utils/index.js";
import { checkApiKey } from "./middlewares/checkApiKey.js";

const app = express();
// register db
await db.read();
// register middleware
app.use(cors("*"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger);

app.get("/", (req, res) => {
  console.log(db);
  res.status(200).json({ message: "Hello, World!" });
});

//auth

app.post("/user", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Body invalid!" });
  }

  const userExist = db.data.users[username];
  if (userExist) {
    return res.status(500).json({ message: "User exist!" });
  }

  const apiKey = genApiKey({ username, password });

  db.data.users[username] = password;
  db.data.apiKeys.push(apiKey);

  return res.status(201).json({ message: "ok", apiKey });
});

app.get("/config", checkApiKey, (req, res) => {
  return res.status(200).json(db.data.env);
});

app.put("/config", checkApiKey, (req, res) => {
  const nextEnv = { ...db.data.env, ...req.body };
  db.data.env = nextEnv;
  return res.status(200).json(nextEnv);
});

app.listen(9001, () => {
  console.log("running 9001");
});
