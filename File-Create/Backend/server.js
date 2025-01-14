// const express = require("express");
// const fs = require("fs");
// const path = require("path");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // File search
// app.post("/search-file", (req, res) => {
//   const { fileName, fileLocation } = req.body;

//   if (!fileName || !fileLocation) {
//     return res.status(400).json({ error: "File name and location are required" });
//   }

//   const filePath = path.join(fileLocation, fileName);

//   try {
//     const exists = fs.existsSync(filePath);
//     return res.json({ exists });
//   } catch (error) {
//     console.error("Error searching for file:", error.message);
//     res.status(500).json({ error: `Failed to search file: ${error.message}` });
//   }
// });

// // File creation
// app.post("/create-file", (req, res) => {
//   const { fileName, fileLocation } = req.body;

//   if (!fileName || !fileLocation) {
//     return res.status(400).json({ error: "File name and location are required" });
//   }

//   const filePath = path.join(fileLocation, fileName);

//   try {
//     if (!fs.existsSync(filePath)) {
//       fs.writeFileSync(filePath, '', { flag: 'wx' }); // Create empty file
//       return res.json({ message: `File "${fileName}" created at "${fileLocation}" successfully!` });
//     } else {
//       return res.status(400).json({ error: "File already exists at the specified location" });
//     }
//   } catch (error) {
//     console.error("Error creating file:", error.message);
//     res.status(500).json({ error: `Failed to create file: ${error.message}` });
//   }
// });

// // File deletion
// app.post("/delete-file", (req, res) => {
//   const { deleteFileLocation } = req.body;

//   if (!deleteFileLocation) {
//     return res.status(400).json({ error: "File location is required" });
//   }

//   try {
//     const filePath = path.join(deleteFileLocation);
//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath); // Delete the file
//       return res.json({ message: `File at "${deleteFileLocation}" has been deleted successfully!` });
//     } else {
//       return res.status(404).json({ error: "File not found" });
//     }
//   } catch (error) {
//     console.error("Error deleting file:", error.message);
//     res.status(500).json({ error: `Failed to delete file: ${error.message}` });
//   }
// });

// // File renaming
// app.post("/rename-file", (req, res) => {
//   const { renameFileName, newFileName, fileLocation } = req.body;

//   if (!renameFileName || !newFileName || !fileLocation) {
//     return res.status(400).json({ error: "Missing required parameters." });
//   }

//   const oldPath = path.join(fileLocation, renameFileName);
//   const newPath = path.join(fileLocation, newFileName);

//   // Check if the file exists before renaming
//   fs.rename(oldPath, newPath, (err) => {
//     if (err) {
//       return res.status(500).json({ error: "Error renaming file." });
//     }
//     res.json({ message: "File renamed successfully!" });
//   });
// });


// // Endpoint to search for a folder
// app.post("/search-folder", (req, res) => {
//   const { folderName, folderLocation } = req.body;

//   if (!folderName || !folderLocation) {
//     return res.status(400).json({ error: "Folder name and location are required" });
//   }

//   const folderPath = path.join(folderLocation, folderName);

//   try {
//     const exists = fs.existsSync(folderPath);
//     return res.json({ exists });
//   } catch (error) {
//     console.error("Error searching for folder:", error.message);
//     res.status(500).json({ error: `Failed to search folder: ${error.message}` });
//   }
// });

// // Endpoint to create a folder
// app.post("/create-folder", (req, res) => {
//   const { folderName, folderLocation } = req.body;

//   if (!folderName || !folderLocation) {
//     return res.status(400).json({ error: "Folder name and location are required" });
//   }

//   const folderPath = path.join(folderLocation, folderName);

//   try {
//     if (!fs.existsSync(folderPath)) {
//       fs.mkdirSync(folderPath, { recursive: true });
//       return res.json({ message: `Folder "${folderName}" created at "${folderLocation}" successfully!` });
//     } else {
//       return res.status(400).json({ error: "Folder already exists at the specified location" });
//     }
//   } catch (error) {
//     console.error("Error creating folder:", error.message);
//     res.status(500).json({ error: `Failed to create folder: ${error.message}` });
//   }
// });

// // Endpoint to delete a folder
// app.post("/delete-folder", (req, res) => {
//   const { deleteLocation } = req.body;

//   if (!deleteLocation) {
//     return res.status(400).json({ error: "Folder location is required" });
//   }

//   try {
//     // Remove folder and all its contents recursively
//     const deleteFolder = (folderPath) => {
//       const files = fs.readdirSync(folderPath);
//       files.forEach(file => {
//         const filePath = path.join(folderPath, file);
//         const stat = fs.statSync(filePath);
//         if (stat.isDirectory()) {
//           deleteFolder(filePath);  // Recursively delete directories
//         } else {
//           fs.unlinkSync(filePath);  // Delete files
//         }
//       });
//       fs.rmdirSync(folderPath);  // Finally remove the directory
//     };

//     const folderPath = path.join(deleteLocation);
//     if (fs.existsSync(folderPath)) {
//       deleteFolder(folderPath);
//       return res.json({ message: `Folder at "${deleteLocation}" has been deleted successfully!` });
//     } else {
//       return res.status(404).json({ error: "Folder not found" });
//     }
//   } catch (error) {
//     console.error("Error deleting folder:", error.message);
//     res.status(500).json({ error: `Failed to delete folder: ${error.message}` });
//   }
// });

// // Endpoint to rename a folder
// app.post("/rename-folder", (req, res) => {
//   const { renameFolderName, newFolderName, folderLocation } = req.body;

//   if (!renameFolderName || !newFolderName || !folderLocation) {
//     return res.status(400).json({ error: "Current folder name, new folder name, and location are required" });
//   }

//   const oldFolderPath = path.join(folderLocation, renameFolderName);
//   const newFolderPath = path.join(folderLocation, newFolderName);

//   try {
//     if (!fs.existsSync(oldFolderPath)) {
//       return res.status(404).json({ error: "Folder not found" });
//     }

//     if (fs.existsSync(newFolderPath)) {
//       return res.status(400).json({ error: "New folder name already exists" });
//     }

//     fs.renameSync(oldFolderPath, newFolderPath); // Rename the folder
//     return res.json({ message: `Folder renamed to "${newFolderName}"` });
//   } catch (error) {
//     console.error("Error renaming folder:", error.message);
//     res.status(500).json({ error: `Failed to rename folder: ${error.message}` });
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

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

// Create a file
app.post("/api/file/create", (req, res) => {
  const { fileName, fileLocation } = req.body;
  const filePath = path.join(fileLocation, fileName);

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
  const oldFilePath = path.join(fileLocation, oldFileName);
  const newFilePath = path.join(fileLocation, newFileName);

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
  const filePath = path.join(fileLocation, fileName);

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
  const folderPath = path.join(folderLocation, folderName);

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
  const oldFolderPath = path.join(folderLocation, oldFolderName);
  const newFolderPath = path.join(folderLocation, newFolderName);

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
  const folderPath = path.join(folderLocation, folderName);

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
//https://folder-02mx.onrender.com