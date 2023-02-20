import { useState, useEffect, createContext, PropsWithChildren } from "react"
import { FilesType, FilesInterface, FilesMetadataArray } from '../ts/interfaces/filesInterfaces'
import localforage from 'localforage'

const FilesContext = createContext<FilesInterface>({ files: [], setFiles: () => { }, storageFilesMetadata: [] })

export default FilesContext

// FilesContextProvider initialization
export function FilesContextProvider({ children }: PropsWithChildren) {

    const [files, setFiles] = useState<FilesType>([]) 
    const [storageFilesMetadata, setStorageFilesMetadata] = useState<FilesMetadataArray>([])

    useEffect(() => {

        const getFilesMetadata = async () => await localforage.getItem("files") as FilesMetadataArray
        
        getFilesMetadata().then(filesData => setStorageFilesMetadata(filesData))
        
    }, [])
    
    return (
        <FilesContext.Provider value={{ files, setFiles, storageFilesMetadata }}>
            {children}
        </FilesContext.Provider>
    )
}