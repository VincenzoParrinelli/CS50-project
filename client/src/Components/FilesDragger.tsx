import React, { useRef, useContext, ChangeEvent } from 'react'
import { ReactComponent as UploadFileIcon } from "../assets/Images/upload-file.svg"
import FilesContext from '../context/FilesContext'
import { FilesInterface } from '../ts/interfaces/filesInterface'

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
  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    console.log(e.dataTransfer.files)

    draggableAreaRef.current!.classList.remove("files-dragger__drag-and-drop--on-drag")
  }

  const handleNewFiles = (e: ChangeEvent<HTMLInputElement>) => {

    console.log(e.target.files)
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
