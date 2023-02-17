// Interface for filesContext
export interface FilesInterface {
    files: FileList,
    setFiles: React.Dispatch<React.SetStateAction<FileList>>
}