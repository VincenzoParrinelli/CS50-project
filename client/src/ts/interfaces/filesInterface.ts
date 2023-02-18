// Types for files
export type FilesType = FileList | File[]

// Interface for filesContext
export interface FilesInterface {
    files: FilesType,
    setFiles: React.Dispatch<React.SetStateAction<FilesType>>
}