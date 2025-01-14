// import React, { useState } from "react";
// import './FileExplorer.css';  // Import the CSS file

// const FileExplorer = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [fileName, setFileName] = useState("");
//   const [fileLocation, setFileLocation] = useState("");
//   const [showFileInputs, setShowFileInputs] = useState(false);
//   const [fileExists, setFileExists] = useState(false);
//   const [deleteFileLocation, setDeleteFileLocation] = useState("");  
//   const [showDeleteFileInput, setShowDeleteFileInput] = useState(false);  
//   const [renameFileName, setRenameFileName] = useState("");  
//   const [newFileName, setNewFileName] = useState("");  

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//     console.log("Selected File:", file);
//   };

//   // File search
//   const handleSearchFile = async () => {
//     if (!fileName || !fileLocation) {
//       alert("Please enter both file name and location!");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/search-file", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ fileName, fileLocation }),
//       });
//       const result = await response.json();
//       if (result.exists) {
//         setFileExists(true);
//         alert(`File "${fileName}" exists at "${fileLocation}"`);
//       } else {
//         setFileExists(false);
//         alert(`File "${fileName}" does not exist. You can create it.`);
//       }
//     } catch (error) {
//       console.error("Error searching file:", error);
//     }
//   };

//   // File creation
//   const handleCreateFile = async () => {
//     if (!fileName || !fileLocation) {
//       alert("Please enter both file name and location!");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/create-file", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ fileName, fileLocation }),
//       });
//       const result = await response.json();
//       console.log("File created successfully:", result);
//       alert(`File "${fileName}" created at "${fileLocation}" successfully!`);
//       setFileName("");
//       setFileLocation("");
//       setShowFileInputs(false);
//     } catch (error) {
//       console.error("Error creating file:", error);
//     }
//   };

//   // File deletion
//   const handleDeleteFile = async () => {
//     if (!deleteFileLocation) {
//       alert("Please enter the file location to delete.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/delete-file", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ deleteFileLocation }),
//       });
//       const result = await response.json();
//       alert(result.message || result.error);
//       setDeleteFileLocation("");
//       setShowDeleteFileInput(false);
//     } catch (error) {
//       console.error("Error deleting file:", error);
//     }
//   };

//   // File renaming
//   const handleRenameFile = async () => {
//     if (!renameFileName || !newFileName || !fileLocation) {
//       alert("Please enter the current file name, new file name, and location!");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/rename-file", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ renameFileName, newFileName, fileLocation }),
//       });
//       const result = await response.json();
//       alert(result.message || result.error);
//       setRenameFileName("");
//       setNewFileName("");
//     } catch (error) {
//       console.error("Error renaming file:", error);
//     }
//   };

//   return (
//     <div className="file-explorer">
//       <button className="action-btn" onClick={() => setShowFileInputs(true)}>Create File</button>

//       {showFileInputs && (
//         <div className="inputs-container">
//           <input
//             type="text"
//             placeholder="Enter file name"
//             value={fileName}
//             onChange={(e) => setFileName(e.target.value)}
//             className="input-field"
//           />
//           <input
//             type="text"
//             placeholder="Enter file location"
//             value={fileLocation}
//             onChange={(e) => setFileLocation(e.target.value)}
//             className="input-field"
//           />
//           <button className="action-btn" onClick={handleSearchFile}>Search File</button>
//           {fileExists ? (
//             <button className="disabled-btn" disabled>File Exists</button>
//           ) : (
//             <button className="action-btn" onClick={handleCreateFile}>Create File</button>
//           )}
//         </div>
//       )}

//       <button className="action-btn" onClick={() => setShowDeleteFileInput(true)}>Delete File</button>

//       {showDeleteFileInput && (
//         <div className="inputs-container">
//           <input
//             type="text"
//             placeholder="Enter file location to delete"
//             value={deleteFileLocation}
//             onChange={(e) => setDeleteFileLocation(e.target.value)}
//             className="input-field"
//           />
//           <button className="action-btn" onClick={handleDeleteFile}>Delete File</button>
//         </div>
//       )}

//       <div className="inputs-container">
//         <input
//           type="text"
//           placeholder="Enter current file name"
//           value={renameFileName}
//           onChange={(e) => setRenameFileName(e.target.value)}
//           className="input-field"
//         />
//         <input
//           type="text"
//           placeholder="Enter new file name"
//           value={newFileName}
//           onChange={(e) => setNewFileName(e.target.value)}
//           className="input-field"
//         />
//         <input
//           type="text"
//           placeholder="Enter file location"
//           value={fileLocation}
//           onChange={(e) => setFileLocation(e.target.value)}
//           className="input-field"
//         />
//         <div className="buttons-row">
//           <button className="action-btn" onClick={handleRenameFile}>Rename File</button>
//           <button className="action-btn" onClick={handleSearchFile}>Search File</button>
//           <button className="action-btn" onClick={handleCreateFile}>Create File</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FileExplorer;
import React, { useState } from "react";
import "./FileExplorer.css"; // Ensure proper styles for centering

const FileExplorer = () => {
  const [fileName, setFileName] = useState("");
  const [fileLocation, setFileLocation] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [oldFileName, setOldFileName] = useState("");
  const [operation, setOperation] = useState("create");

  const formatFilePath = (filePath) => {
    if (!filePath) return "";
    // For Windows OS, prepend with 'C:/'
    if (filePath.startsWith("C:/") || filePath.startsWith("tmp")) {
      return filePath;
    }
    // If the path is relative, we assume it's to be treated as 'C:/tmp' or 'C:/<user specified path>'
    if (filePath.startsWith("tmp")) {
      return `C:/tmp/${filePath}`;
    }
    return `C:/${filePath}`;
  };

  const handleFileOperation = async () => {
    try {
      let payload = {};
      let endpoint = "";

      // Format the file location path before making the request
      const formattedFileLocation = formatFilePath(fileLocation);

      if (operation === "create") {
        if (!fileName || !formattedFileLocation) {
          alert("Please provide both file name and location for creation.");
          return;
        }
        payload = { fileName, fileLocation: formattedFileLocation };
        endpoint = "https://folder-02mx.onrender.com/api/file/create";
      } else if (operation === "update") {
        if (!oldFileName || !newFileName || !formattedFileLocation) {
          alert("Please provide old file name, new file name, and location for update.");
          return;
        }
        payload = { oldFileName, newFileName, fileLocation: formattedFileLocation };
        endpoint = "https://folder-02mx.onrender.com/api/file/update";
      } else if (operation === "delete") {
        if (!fileName || !formattedFileLocation) {
          alert("Please provide both file name and location for deletion.");
          return;
        }
        payload = { fileName, fileLocation: formattedFileLocation };
        endpoint = "https://folder-02mx.onrender.com/api/file/delete";
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      alert(result.message || result.error || "Operation completed successfully!");
    } catch (error) {
      console.error("Error during file operation:", error);
    }
  };

  return (
    <div className="file-explorer-container">
      <h1>File Operations</h1>
      <select value={operation} onChange={(e) => setOperation(e.target.value)} className="dropdown">
        <option value="create">Create</option>
        <option value="update">Update</option>
        <option value="delete">Delete</option>
      </select>

      {operation === "create" && (
        <div className="operation-container">
          <input
            type="text"
            placeholder="File Name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="File Location"
            value={fileLocation}
            onChange={(e) => setFileLocation(e.target.value)}
            className="input-field"
          />
        </div>
      )}

      {operation === "update" && (
        <div className="operation-container">
          <input
            type="text"
            placeholder="Old File Name"
            value={oldFileName}
            onChange={(e) => setOldFileName(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="New File Name"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="File Location"
            value={fileLocation}
            onChange={(e) => setFileLocation(e.target.value)}
            className="input-field"
          />
        </div>
      )}

      {operation === "delete" && (
        <div className="operation-container">
          <input
            type="text"
            placeholder="File Name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="File Location"
            value={fileLocation}
            onChange={(e) => setFileLocation(e.target.value)}
            className="input-field"
          />
        </div>
      )}

      <button onClick={handleFileOperation} className="action-btn">
        Perform {operation.charAt(0).toUpperCase() + operation.slice(1)} Operation
      </button>
    </div>
  );
};

export default FileExplorer;
