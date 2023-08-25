const fs = require("fs");
fs.readFile("file.json", (err, data) => {
  if (err) throw err;
  const obj = JSON.parse(data);
  console.log(obj);
});
