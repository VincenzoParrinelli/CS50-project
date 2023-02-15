import { useState } from 'react'
import Header from './Components/Header'
import FilesDragger from './Components/FilesDragger'
import FilesList from './Components/FilesList'

function App() {

  return (
    <div className="App">
      <Header />
      <FilesDragger />
      <FilesList />
    </div>
  )
}

export default App
