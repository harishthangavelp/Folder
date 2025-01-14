const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000; // Fallback to port 5000 if PORT is not defined

// Middleware to parse JSON requests
app.use(express.json());

// Create a file
app.post("/api/file/create", (req, res) => {
  const { fileName, fileLocation } = req.body;
  
  // Ensure fileLocation is absolute by joining with C:\
  const filePath = path.join("C:", fileLocation, fileName);

  fs.writeFile(filePath, "", (err) => {
    if (err) {
      console.error("Error creating file:", err.message);  // Log error to console for debugging
      return res.status(500).json({ error: "Error creating file." });
    }
    res.json({ message: "File created successfully." });
  });
});

// Update (rename) a file
app.post("/api/file/update", (req, res) => {
  const { oldFileName, newFileName, fileLocation } = req.body;
  
  // Join file paths with C:\
  const oldFilePath = path.join("C:", fileLocation, oldFileName);
  const newFilePath = path.join("C:", fileLocation, newFileName);

  fs.rename(oldFilePath, newFilePath, (err) => {
    if (err) {
      console.error("Error renaming file:", err.message);  // Log error to console for debugging
      return res.status(500).json({ error: "Error renaming file." });
    }
    res.json({ message: "File renamed successfully." });
  });
});

// Delete a file
app.post("/api/file/delete", (req, res) => {
  const { fileName, fileLocation } = req.body;
  
  // Join file paths with C:\
  const filePath = path.join("C:", fileLocation, fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err.message);  // Log error to console for debugging
      return res.status(500).json({ error: "Error deleting file." });
    }
    res.json({ message: "File deleted successfully." });
  });
});

// Create a folder
app.post("/api/folder/create", (req, res) => {
  const { folderName, folderLocation } = req.body;
  
  // Join folder paths with C:\
  const folderPath = path.join("C:", folderLocation, folderName);

  fs.mkdir(folderPath, { recursive: true }, (err) => {
    if (err) {
      console.error("Error creating folder:", err.message);  // Log error to console for debugging
      return res.status(500).json({ error: "Error creating folder." });
    }
    res.json({ message: "Folder created successfully." });
  });
});

// Update (rename) a folder
app.post("/api/folder/update", (req, res) => {
  const { oldFolderName, newFolderName, folderLocation } = req.body;
  
  // Join folder paths with C:\
  const oldFolderPath = path.join("C:", folderLocation, oldFolderName);
  const newFolderPath = path.join("C:", folderLocation, newFolderName);

  fs.rename(oldFolderPath, newFolderPath, (err) => {
    if (err) {
      console.error("Error renaming folder:", err.message);  // Log error to console for debugging
      return res.status(500).json({ error: "Error renaming folder." });
    }
    res.json({ message: "Folder renamed successfully." });
  });
});

// Delete a folder
app.post("/api/folder/delete", (req, res) => {
  const { folderName, folderLocation } = req.body;
  
  // Join folder paths with C:\
  const folderPath = path.join("C:", folderLocation, folderName);

  fs.rmdir(folderPath, { recursive: true }, (err) => {
    if (err) {
      console.error("Error deleting folder:", err.message);  // Log error to console for debugging
      return res.status(500).json({ error: "Error deleting folder." });
    }
    res.json({ message: "Folder deleted successfully." });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
