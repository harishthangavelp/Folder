import React, { useState } from "react";
import { saveAs } from "file-saver";

const FileManagementApp = () => {
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("newFile.txt");

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target.result);
        setFileName(file.name);
      };
      reader.readAsText(file);
    }
  };

  // Handle file content change
  const handleContentChange = (event) => {
    setFileContent(event.target.value);
  };

  // Save file
  const handleSaveFile = () => {
    const blob = new Blob([fileContent], { type: "text/plain" });
    saveAs(blob, fileName);
  };

  // Delete file (reset state)
  const handleDeleteFile = () => {
    setFileContent("");
    setFileName("newFile.txt");
  };

  return (
    <div>
      <h1>File Management</h1>

      <div>
        <input type="file" onChange={handleFileUpload} />
      </div>

      <div>
        <textarea
          value={fileContent}
          onChange={handleContentChange}
          rows={10}
          cols={50}
        />
      </div>

      <div>
        <button onClick={handleSaveFile}>Save File</button>
        <button onClick={handleDeleteFile}>Delete File</button>
      </div>
    </div>
  );
};

export default FileManagementApp;
