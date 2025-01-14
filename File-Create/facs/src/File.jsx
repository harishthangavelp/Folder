import React, { useState } from "react";
import './File.css';

function File() {
  const [mode, setMode] = useState("");  
  const [action, setAction] = useState("");  
  const [fileName, setFileName] = useState("");
  const [fileLocation, setFileLocation] = useState("");
  const [newFileName, setNewFileName] = useState("");
  const [oldFileName, setOldFileName] = useState("");

  const handleExplorerClick = (type) => {
    setMode(type);  
    setAction("");  
    setFileName("");
    setFileLocation("");
    setNewFileName("");
    setOldFileName("");
  };

  const handleActionClick = (actionType) => {
    setAction(actionType);  
  };

  const renderInputs = () => {
    switch (action) {
      case "Create":
        return (
          <div>
            <input
              type="text"
              placeholder="Enter file name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter file location"
              value={fileLocation}
              onChange={(e) => setFileLocation(e.target.value)}
            />
          </div>
        );
      case "Read":
        return (
          <div>
            <input
              type="text"
              placeholder="Enter file location"
              value={fileLocation}
              onChange={(e) => setFileLocation(e.target.value)}
            />
          </div>
        );
      case "Update":
        return (
          <div>
            <input
              type="text"
              placeholder="Enter old file name"
              value={oldFileName}
              onChange={(e) => setOldFileName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter new file name"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter file location"
              value={fileLocation}
              onChange={(e) => setFileLocation(e.target.value)}
            />
          </div>
        );
      case "Delete":
        return (
          <div>
            <input
              type="text"
              placeholder="Enter file name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter file location"
              value={fileLocation}
              onChange={(e) => setFileLocation(e.target.value)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    // Check if all required fields are filled
    if (!fileName || !fileLocation) {
      alert("Please enter both folder name and folder location");
      return;
    }
  
    const folderData = { folderName: fileName, folderLocation };
  
    fetch(`http://localhost:5000/api/folder/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(folderData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message || data.error);
      })
      .catch((error) => alert('Error: ' + error.message));
  };
  

  return (
    <div className="File">
      <div className="explorer-buttons">
        <button onClick={() => handleExplorerClick("file")}>File Explorer</button>
        <button onClick={() => handleExplorerClick("folder")}>Folder Explorer</button>
      </div>

      {mode && (
        <div>
          <h3>{mode === "file" ? "File Explorer" : "Folder Explorer"} selected</h3>
          <p>What do you want to do?</p>
          <div className="action-buttons">
            <button onClick={() => handleActionClick("Create")}>Create</button>
            <button onClick={() => handleActionClick("Read")}>Read</button>
            <button onClick={() => handleActionClick("Update")}>Update</button>
            <button onClick={() => handleActionClick("Delete")}>Delete</button>
          </div>
        </div>
      )}

      {action && (
        <div className="input-section">
          <h4>{action} {mode === "file" ? "File" : "Folder"}</h4>
          {renderInputs()}
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default File;
