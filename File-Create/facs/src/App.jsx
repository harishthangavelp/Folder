import React from 'react'
import { useState } from 'react'
import{
  BrowserRouter as Router,Routes,Route,
  Link,
  BrowserRouter
  } from 'react-router-dom'
  import Navigation from './Navigation'
import Home from './Home'
import FileExplorer from './FileExplorer'
import FolderExplorer from './FolderExplorer'
function App() {
  return (
    <>
    <Router>   
        <Navigation/>
        <Routes>
         <Route path="/" element={<Home/>}></Route>
         <Route path="/files" element={<FileExplorer/>}></Route>
         <Route path="/folders" element={<FolderExplorer/>}></Route>
         </Routes>
         </Router>
         </>
  )
}

export default App


      