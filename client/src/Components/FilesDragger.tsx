import React, { useRef, useContext, ChangeEvent } from 'react'
import { ReactComponent as UploadFileIcon } from "../assets/Images/upload-file.svg"
import FilesContext from '../context/FilesContext'
import { FilesInterface } from '../ts/interfaces/filesInterface'
import localforage from 'localforage'

export default function FilesDragger() {

  const draggableAreaRef = useRef(null) as React.MutableRefObject<HTMLDivElement | null>

  const { files, setFiles }: FilesInterface = useContext(FilesContext)

  // When user hoveres on drag and drop area change style
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    draggableAreaRef.current!.classList.add("files-dragger__drag-and-drop--on-drag")
  }

  // When user leaves cursor from drag and drop remove style
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    draggableAreaRef.current!.classList.remove("files-dragger__drag-and-drop--on-drag")
  }

  // Handle drag and dropped files 
  const handleOnDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    const newFilesArr = e.dataTransfer.files

    setFiles(prevFiles => [...prevFiles, ...newFilesArr])

    console.log(files)

    const newMetadataList = []

    // Iterate through files, get their metadata one by one and push into newMetadataList
    for (const file of newFilesArr) {

      const metadata = {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified
      }

      newMetadataList.push(metadata)
    }

    // Set localForage with metadataList
    const storageFilesMetadata = await localforage.getItem("files") as FileList

    await localforage.setItem("files", storageFilesMetadata ? [...storageFilesMetadata, ...newMetadataList] : newMetadataList)

    draggableAreaRef.current!.classList.remove("files-dragger__drag-and-drop--on-drag")
  }

  const handleNewFiles = async (e: ChangeEvent<HTMLInputElement>) => {

    const newFiles = e.target.files as FileList

    setFiles(prevFiles => [...prevFiles, ...newFiles])
    
    //********CHANGE ...FILES WITH A METADATA STATE ARRAY */
    await localforage.setItem("files", files.length ? [...files, ...newFiles] : [...newFiles])

  }

  return (
    <div className='files-dragger'>

      <div className='files-dragger__drag-and-drop'
        ref={draggableAreaRef}
        onDragOver={e => handleDragOver(e)}
        onDragLeave={e => handleDragLeave(e)}
        onDrop={e => handleOnDrop(e)}
      >

        <UploadFileIcon className='files-dragger__upload-icon' />

        <p className="files-dragger__paragraph">Drag & drop</p>

      </div>

      <p className="files-dragger__paragraph-2">or</p>

      <input
        className='files-dragger__input'
        id='file-selector'
        type="file"
        multiple
        onChange={e => handleNewFiles(e)}
      />

      <label htmlFor='file-selector' className="files-dragger__label-for-input">Browse</label>

    </div>
  )
}
