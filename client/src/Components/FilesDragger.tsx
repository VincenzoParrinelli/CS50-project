import React, { useState, useRef, useContext, ChangeEvent, useEffect } from 'react'
import { ReactComponent as UploadFileIcon } from "../assets/Images/upload-file.svg"
import FilesContext from '../context/FilesContext'
import { FilesInterface, FilesMetadataArray } from '../ts/interfaces/filesInterfaces'
import localforage from 'localforage'

export default function FilesDragger() {

  const [test, setTest] = useState()

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

  // Set files metadata in localforage
  const setFilesMetadata = async (newFiles: FileList) => {

    const newMetadataList = [] as FilesMetadataArray

    // Iterate through files, get their metadata one by one and push into newMetadataList
    for (const file of newFiles) {

      const metadata = {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified
      }

      newMetadataList.push(metadata)
    }

    setFiles(prevFiles => [...prevFiles, ...newFiles])

    // Add new files in localforage without overwriting the previous one
    //await localforage.setItem("files", storageFilesMetadata ? [...storageFilesMetadata, ...newMetadataList] : newMetadataList)

  }


  // Handle drag and dropped files 
  const handleOnDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    const newFilesArr = e.dataTransfer.files

    //setFilesMetadata(newFilesArr)

    draggableAreaRef.current!.classList.remove("files-dragger__drag-and-drop--on-drag")
  }

  const handleNewFiles = async (e: ChangeEvent<HTMLInputElement>) => {

    const newFiles = e.target.files as unknown as File[]

    // Convert data to blob 1 by 1
    for (let i = 0; i < newFiles!.length; i++) {
      const reader = new FileReader()

      reader.onload = async (event) => {

        const data = event.target!.result

        await chrome.storage.local.set({ file: data })

      }

      reader.readAsText(newFiles![i])
    }


    chrome.storage.local.get("file", ({ file }) => {
     
      setTest(file)
    })

    setFiles(prevFiles => [...prevFiles, ...newFiles])
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

      {test && <p style={{width: "1rem", height: "1rem"}}>{test}</p>}

    </div>
  )
}
