const fs = require('fs');

const bookmarklet = fs.readFileSync("./public/text-tracker-bookmarklet.js", "utf-8");

const indexFile = fs.readFileSync("./public/index.html", "utf-8");

const newFile = indexFile.replace(/\"javascript.*\"/g, `"${bookmarklet}"`);

fs.writeFileSync("./public/index.html", newFile);