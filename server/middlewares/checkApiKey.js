import db from "../db/index.js";

// API key middleware
export const checkApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  // Check if API key is provided
  if (!apiKey) {
    return res.status(401).json({ error: "API key is missing" });
  }

  // Check if API key is valid (add your validation logic here)
  if (!db.data.apiKeys.includes(apiKey)) {
    return res.status(403).json({ error: "Invalid API key" });
  }

  // API key is valid, proceed to the next middleware or route handler
  next();
};
