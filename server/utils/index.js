export const genApiKey = (data) =>
  Buffer.from(JSON.stringify(data)).toString("base64");
