import { useState, useEffect, createContext, PropsWithChildren } from "react"
import { FilesType, FilesInterface } from '../ts/interfaces/filesInterfaces'
import localforage from 'localforage'

const FilesContext = createContext<FilesInterface>({ files: [], setFiles: () => { } })

export default FilesContext

// FilesContextProvider initialization
export function FilesContextProvider({ children }: PropsWithChildren) {

    const [files, setFiles] = useState<File[]>([])

    useEffect(() => {

        const getFiles = async (): Promise<String | null> => await localforage.getItem("files")

        getFiles().then((filesData: String | null) => {
            
            const reader = new FileReader()

            

            //setFiles(filesData)
        })

    }, [])

    return (
        <FilesContext.Provider value={{ files, setFiles }}>
            {children}
        </FilesContext.Provider>
    )
}