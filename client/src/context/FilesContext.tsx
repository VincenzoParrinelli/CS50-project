import { useState, useEffect, createContext, PropsWithChildren } from "react"
import { FilesType, FilesInterface, FilesMetadataArray } from '../ts/interfaces/filesInterfaces'
import localforage from 'localforage'

// Create a mock object that implements the FileList interface and use that as the default value 
// In order to avoid the illegal constructor error, because FileList is an interface and cannot be directly instantiated.
const initialFiles: FilesType = {
    length: 0,
    item: () => null,
    [Symbol.iterator]: function* () { }
}

const FilesContext = createContext<FilesInterface>({ files: initialFiles, setFiles: () => { }, storageFilesMetadata: [] })

export default FilesContext

// FilesContextProvider initialization
export function FilesContextProvider({ children }: PropsWithChildren) {

    const [files, setFiles] = useState(initialFiles)
    const [storageFilesMetadata, setStorageFilesMetadata] = useState(initialFiles)

    useEffect(() => {

        const getFilesMetadata = async () => setStorageFilesMetadata(await localforage.getItem("files") as FileList)
        
        getFilesMetadata()
    }, [])

    return (
        <FilesContext.Provider value={{ files, setFiles, storageFilesMetadata }}>
            {children}
        </FilesContext.Provider>
    )
}