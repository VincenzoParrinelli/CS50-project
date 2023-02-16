import { useState, createContext, PropsWithChildren } from "react"

const FilesContext = createContext({})

export default FilesContext

// FilesContextProvider initialization
export function FilesContextProvider({ children }: PropsWithChildren) {

    const [files, setFiles] = useState([])

    return (
        <FilesContext.Provider value={{ files, setFiles }}>
            {children}
        </FilesContext.Provider>
    )
}