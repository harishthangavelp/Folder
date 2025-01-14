// import React, { useState } from "react";
// import './FolderExplorer.css';  // Import the CSS file

// const FolderExplorer = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [folderName, setFolderName] = useState("");
//   const [folderLocation, setFolderLocation] = useState("");
//   const [showInputs, setShowInputs] = useState(false);
//   const [folderExists, setFolderExists] = useState(false);
//   const [deleteLocation, setDeleteLocation] = useState("");  
//   const [showDeleteInput, setShowDeleteInput] = useState(false);  
//   const [renameFolderName, setRenameFolderName] = useState("");  
//   const [newFolderName, setNewFolderName] = useState("");  

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//     console.log("Selected File:", file);
//   };

//   const handleSearchFolder = async () => {
//     if (!folderName || !folderLocation) {
//       alert("Please enter both folder name and location!");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/search-folder", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ folderName, folderLocation }),
//       });
//       const result = await response.json();
//       if (result.exists) {
//         setFolderExists(true);
//         alert(`Folder "${folderName}" exists at "${folderLocation}"`);
//       } else {
//         setFolderExists(false);
//         alert(`Folder "${folderName}" does not exist. You can create it.`);
//       }
//     } catch (error) {
//       console.error("Error searching folder:", error);
//     }
//   };

//   const handleCreateFolder = async () => {
//     if (!folderName || !folderLocation) {
//       alert("Please enter both folder name and location!");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/create-folder", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ folderName, folderLocation }),
//       });
//       const result = await response.json();
//       console.log("Folder created successfully:", result);
//       alert(`Folder "${folderName}" created at "${folderLocation}" successfully!`);
//       setFolderName("");
//       setFolderLocation("");
//       setShowInputs(false);
//     } catch (error) {
//       console.error("Error creating folder:", error);
//     }
//   };

//   const handleDeleteFolder = async () => {
//     if (!deleteLocation) {
//       alert("Please enter the folder location to delete.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/delete-folder", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ deleteLocation }),
//       });
//       const result = await response.json();
//       alert(result.message || result.error);
//       setDeleteLocation("");
//       setShowDeleteInput(false);  
//     } catch (error) {
//       console.error("Error deleting folder:", error);
//     }
//   };

//   const handleRenameFolder = async () => {
//     if (!renameFolderName || !newFolderName || !folderLocation) {
//       alert("Please enter the current folder name, new folder name, and location!");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/rename-folder", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ renameFolderName, newFolderName, folderLocation }),
//       });
//       const result = await response.json();
//       alert(result.message || result.error);
//       setRenameFolderName("");
//       setNewFolderName("");
//     } catch (error) {
//       console.error("Error renaming folder:", error);
//     }
//   };

//   return (
//     <div className="file-explorer">
//       <button className="action-btn" onClick={() => setShowInputs(true)}>Create</button>

//       {showInputs && (
//         <div className="inputs-container">
//           <input
//             type="text"
//             placeholder="Enter folder name"
//             value={folderName}
//             onChange={(e) => setFolderName(e.target.value)}
//             className="input-field"
//           />
//           <input
//             type="text"
//             placeholder="Enter folder location"
//             value={folderLocation}
//             onChange={(e) => setFolderLocation(e.target.value)}
//             className="input-field"
//           />
//           <button className="action-btn" onClick={handleSearchFolder}>Search Folder</button>
//           {folderExists ? (
//             <button className="disabled-btn" disabled>Folder Exists</button>
//           ) : (
//             <button className="action-btn" onClick={handleCreateFolder}>Create Folder</button>
//           )}
//         </div>
//       )}

//       <button className="action-btn" onClick={() => setShowDeleteInput(true)}>Delete</button>

//       {showDeleteInput && (
//         <div className="inputs-container">
//           <input
//             type="text"
//             placeholder="Enter folder location to delete"
//             value={deleteLocation}
//             onChange={(e) => setDeleteLocation(e.target.value)}
//             className="input-field"
//           />
//           <button className="action-btn" onClick={handleDeleteFolder}>Delete Folder</button>
//         </div>
//       )}

//       <div className="inputs-container">
//         <input
//           type="text"
//           placeholder="Enter current folder name"
//           value={renameFolderName}
//           onChange={(e) => setRenameFolderName(e.target.value)}
//           className="input-field"
//         />
//         <input
//           type="text"
//           placeholder="Enter new folder name"
//           value={newFolderName}
//           onChange={(e) => setNewFolderName(e.target.value)}
//           className="input-field"
//         />
//         <input
//           type="text"
//           placeholder="Enter folder location"
//           value={folderLocation}
//           onChange={(e) => setFolderLocation(e.target.value)}
//           className="input-field"
//         />
//         <div className="buttons-row">
//           <button className="action-btn" onClick={handleRenameFolder}>Rename Folder</button>
//           <button className="action-btn" onClick={handleSearchFolder}>Search Folder</button>
//           <button className="action-btn" onClick={handleCreateFolder}>Create Folder</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FolderExplorer;
import React, { useState } from "react";
import "./FolderExplorer.css"; // Ensure proper styles for centering

const FolderExplorer = () => {
  const [folderName, setFolderName] = useState("");
  const [folderLocation, setFolderLocation] = useState("");
  const [newFolderName, setNewFolderName] = useState("");
  const [oldFolderName, setOldFolderName] = useState("");
  const [operation, setOperation] = useState("create");

  const handleFolderOperation = async () => {
    try {
      let payload = {};
      let endpoint = "";

      if (operation === "create") {
        if (!folderName || !folderLocation) {
          alert("Please provide both folder name and location for creation.");
          return;
        }
        payload = { folderName, folderLocation };
        endpoint = "http://localhost:5000/api/folder/create";
      } else if (operation === "update") {
        if (!oldFolderName || !newFolderName || !folderLocation) {
          alert("Please provide old folder name, new folder name, and location for update.");
          return;
        }
        payload = { oldFolderName, newFolderName, folderLocation };
        endpoint = "http://localhost:5000/api/folder/update";
      } else if (operation === "delete") {
        if (!folderName || !folderLocation) {
          alert("Please provide both folder name and location for deletion.");
          return;
        }
        payload = { folderName, folderLocation };
        endpoint = "http://localhost:5000/api/folder/delete";
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      alert(result.message || result.error || "Operation completed successfully!");
    } catch (error) {
      console.error("Error during folder operation:", error);
    }
  };

  return (
    <div className="folder-explorer-container">
      <h1>Folder Operations</h1>
      <select value={operation} onChange={(e) => setOperation(e.target.value)} className="dropdown">
        <option value="create">Create</option>
        <option value="update">Update</option>
        <option value="delete">Delete</option>
      </select>

      {operation === "create" && (
        <div className="operation-container">
          <input
            type="text"
            placeholder="Folder Name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Folder Location"
            value={folderLocation}
            onChange={(e) => setFolderLocation(e.target.value)}
            className="input-field"
          />
        </div>
      )}

      {operation === "update" && (
        <div className="operation-container">
          <input
            type="text"
            placeholder="Old Folder Name"
            value={oldFolderName}
            onChange={(e) => setOldFolderName(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="New Folder Name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Folder Location"
            value={folderLocation}
            onChange={(e) => setFolderLocation(e.target.value)}
            className="input-field"
          />
        </div>
      )}

      {operation === "delete" && (
        <div className="operation-container">
          <input
            type="text"
            placeholder="Folder Name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Folder Location"
            value={folderLocation}
            onChange={(e) => setFolderLocation(e.target.value)}
            className="input-field"
          />
        </div>
      )}

      <button onClick={handleFolderOperation} className="action-btn">
        Perform {operation.charAt(0).toUpperCase() + operation.slice(1)} Operation
      </button>
    </div>
  );
};

export default FolderExplorer;

