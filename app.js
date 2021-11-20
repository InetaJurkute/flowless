const fs = require("fs");

const rawdata = fs.readFileSync("./db.json", { encoding: "utf8" });

const data = JSON.parse(rawdata);
console.log(data.length);