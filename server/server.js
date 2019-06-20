const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const base64 = require("base-64");
const app = express();
const fs = require("fs");
const fsx = require("fs-extra");
const path = require("path");
const rimraf = require("rimraf");
const glob = require("glob");
const sanitize = require("sanitize-filename");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Tree
app.get("/", (req, res) => {
  const dirPath = base64.decode(req.query.path) || "";

  fs.readdir(dirPath, (err, files) => {
    if (!files) {
      console.log("No Files");
      return res.json({});
    }

    let finalList = {};
    files.forEach(file => {
      const fullPath = `${dirPath}/${file}`;
      const isDirectory = fs.lstatSync(fullPath).isDirectory();
      let fileProperties = {
        [fullPath]: {
          name: file,
          path: fullPath,
          size: fs.statSync(fullPath).size,
          extension: path.extname(file),
          type: isDirectory ? "directory" : "file",
          isOpen: false,
          bookmarked: false
        }
      };

      if (isDirectory) {
        delete fileProperties[fullPath].extension;
        fileProperties[fullPath].children = {};
        // Directories should appear on top
        finalList = { ...fileProperties, ...finalList };
      } else {
        // Files should appear at the end
        finalList = { ...finalList, ...fileProperties };
      }
    });

    return res.json(finalList);
  });
});

// Search
app.get("/search", (req, res) => {
  const dirPath = base64.decode(req.query.path) || "";
  let query = base64.decode(req.query.query) || "";
  query = sanitize(query);
  const maxResults = 10;

  glob(`${dirPath}/**/*.*`, {}, function(er, files) {
    const final = [];
    let counter = 0;

    for (const file of files) {
      // Dont show more than maxResults
      if (counter >= maxResults) {
        break;
      }

      let pattern;
      try {
        pattern = new RegExp(query, "gi");
      } catch (error) {
        query = query.replace(/[|&;$%@"<>()+,*]/g, "");
        pattern = new RegExp(query, "gi");
      }

      if (pattern.test(path.basename(file))) {
        final.push({
          name: path.basename(file),
          path: file,
          type: "file",
          extension: path.extname(file)
        });
        counter++;
      }
    }

    return res.json(final);
  });
});

// For Drag and Drop
app.post("/dragdrop", (req, res) => {
  const { source, destination, overwrite } = req.body;
  const filename = path.basename(source);
  const destinationPath = `${destination}${path.sep}${filename}`;

  fsx.move(source, destinationPath, { overwrite }, error => {
    if (error) {
      return res.status(400).send("NOT_OK");
    }

    return res.status(201).send("OK");
  });
});

// Rename a file/folder
app.put("/rename", (req, res) => {
  const { oldPath, newFileName } = req.body;
  const newFilePath = `${path.dirname(oldPath)}${path.sep}${sanitize(
    newFileName
  )}`;

  fsx.move(oldPath, newFilePath, { overwrite: false }, error => {
    if (error) {
      console.log("Error", error);
      return res.status(400).send("NOT_OK");
    }

    return res.json({
      newFilePath
    });
  });
});

// Delete file/folder
app.delete("/", (req, res) => {
  rimraf(req.query.fullPath, () => {
    res.send("OK");
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
