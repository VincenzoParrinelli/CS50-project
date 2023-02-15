import React, { useRef } from 'react'
import { ReactComponent as UploadFileIcon } from "../assets/Images/upload-file.svg"

export default function FilesDragger() {

  const draggableAreaRef = useRef(null) as React.MutableRefObject<HTMLDivElement | null>

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    draggableAreaRef.current!.classList.add("files-dragger__drag-and-drop--on-drag")
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    draggableAreaRef.current!.classList.remove("files-dragger__drag-and-drop--on-drag")
  }

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

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

      <button className="btn btn--secondary">Browse</button>

    </div>
  )
}
