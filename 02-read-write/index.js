const fs = require("fs"); // fs singkatan dari file system

const obj = {
  name: "pojok code",
  major: "Computer Science",
  age: 20,
};

const jsonString = JSON.stringify(obj);
fs.writeFile("file.json", jsonString, (err) => {
  if (err) throw err;
  console.log("Data berhasil disimpan");
});
