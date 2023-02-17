import { useState, createContext, PropsWithChildren } from "react"
import { FilesInterface } from '../ts/interfaces/filesInterface'

// Create a mock object that implements the FileList interface and use that as the default value 
// In order to avoid the illegal constructor error, because FileList is an interface and cannot be directly instantiated.
const initialFiles: FileList = {
    length: 0,
    item: () => null,
    [Symbol.iterator]: function* () { }
}

const FilesContext = createContext<FilesInterface>({ files: initialFiles, setFiles: () => { } })

export default FilesContext

// FilesContextProvider initialization
export function FilesContextProvider({ children }: PropsWithChildren) {

    const [files, setFiles] = useState(initialFiles)

    return (
        <FilesContext.Provider value={{ files, setFiles }}>
            {children}
        </FilesContext.Provider>
    )
}