const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
const PORT = process.env.PORT;

// Middleware to parse JSON requests
app.use(express.json());

// Helper function to ensure file/folder paths are valid for Windows
const formatFilePath = (filePath) => {
  if (!filePath) return "";
  // Prepend 'C:/' if the path doesn't start with it for Windows
  return filePath.startsWith("C:/") ? filePath : path.join("C:/", filePath);
};

// Create a file
app.post("/api/file/create", (req, res) => {
  const { fileName, fileLocation } = req.body;
  const formattedLocation = formatFilePath(fileLocation);
  const filePath = path.join(formattedLocation, fileName);

  fs.writeFile(filePath, "", (err) => {
    if (err) {
      return res.status(500).json({ error: "Error creating file." });
    }
    res.json({ message: "File created successfully." });
  });
});

// Update (rename) a file
app.post("/api/file/update", (req, res) => {
  const { oldFileName, newFileName, fileLocation } = req.body;
  const formattedLocation = formatFilePath(fileLocation);
  const oldFilePath = path.join(formattedLocation, oldFileName);
  const newFilePath = path.join(formattedLocation, newFileName);

  fs.rename(oldFilePath, newFilePath, (err) => {
    if (err) {
      return res.status(500).json({ error: "Error renaming file." });
    }
    res.json({ message: "File renamed successfully." });
  });
});

// Delete a file
app.post("/api/file/delete", (req, res) => {
  const { fileName, fileLocation } = req.body;
  const formattedLocation = formatFilePath(fileLocation);
  const filePath = path.join(formattedLocation, fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ error: "Error deleting file." });
    }
    res.json({ message: "File deleted successfully." });
  });
});

// Create a folder
app.post("/api/folder/create", (req, res) => {
  const { folderName, folderLocation } = req.body;
  const formattedLocation = formatFilePath(folderLocation);
  const folderPath = path.join(formattedLocation, folderName);

  fs.mkdir(folderPath, { recursive: true }, (err) => {
    if (err) {
      return res.status(500).json({ error: "Error creating folder." });
    }
    res.json({ message: "Folder created successfully." });
  });
});

// Update (rename) a folder
app.post("/api/folder/update", (req, res) => {
  const { oldFolderName, newFolderName, folderLocation } = req.body;
  const formattedLocation = formatFilePath(folderLocation);
  const oldFolderPath = path.join(formattedLocation, oldFolderName);
  const newFolderPath = path.join(formattedLocation, newFolderName);

  fs.rename(oldFolderPath, newFolderPath, (err) => {
    if (err) {
      return res.status(500).json({ error: "Error renaming folder." });
    }
    res.json({ message: "Folder renamed successfully." });
  });
});

// Delete a folder
app.post("/api/folder/delete", (req, res) => {
  const { folderName, folderLocation } = req.body;
  const formattedLocation = formatFilePath(folderLocation);
  const folderPath = path.join(formattedLocation, folderName);

  fs.rmdir(folderPath, { recursive: true }, (err) => {
    if (err) {
      return res.status(500).json({ error: "Error deleting folder." });
    }
    res.json({ message: "Folder deleted successfully." });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
