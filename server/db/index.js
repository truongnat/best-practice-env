// Remember to set type: module in package.json or use .mjs extension
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

// db.json file path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "db.json");

// Configure lowdb to write data to JSON file
const adapter = new JSONFile(file);
const defaultData = {
  env: {
    secret: "",
  },
  apiKeys: [],
  users: {},
};
const db = new Low(adapter, defaultData);

db.data.env["appName"] = "Super Env";
// Read data from JSON file, this will set db.data content
// If JSON file doesn't exist, defaultData is used instead
export default db;
