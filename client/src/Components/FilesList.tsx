import { useContext, useEffect } from 'react'
import FilesContext from '../context/FilesContext'
import { FilesInterface } from '../ts/interfaces/filesInterfaces'

export default function FilesList() {

  const { files, setFiles, storageFilesMetadata }: FilesInterface = useContext(FilesContext)

  return (
    <div className='files-list'>
      <div className="files-list__container">
        {/* {storageFilesMetadata?.map(file => {
           return (
            <span>{file.name}</span>
           )
        })} */}
        
      </div>
    </div>
  )
}
