import { useState, createContext, PropsWithChildren } from "react"
import { FilesInterface } from '../ts/interfaces/filesInterface'

const FilesContext = createContext<FilesInterface>({ files: new FileList(), setFiles: () => {}}) 

export default FilesContext

// FilesContextProvider initialization
export function FilesContextProvider({ children }: PropsWithChildren) {

    const [files, setFiles] = useState(new FileList())

    return (
        <FilesContext.Provider value={{ files, setFiles }}>
            {children}
        </FilesContext.Provider>
    )
}