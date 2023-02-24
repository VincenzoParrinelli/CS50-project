import Header from './Components/Header'
import FilesDragger from './Components/FilesDragger'
import FilesList from './Components/FilesList'
import FilesContext, { FilesContextProvider } from './context/FilesContext'
import { useContext } from 'react'

function App() {

  return (
    <div className="App">
      <Header />

      <FilesContextProvider>
        <FilesDragger />
        <FilesList />
      </FilesContextProvider>
    </div>
  )
}

export default App
