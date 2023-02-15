import React from 'react'
import { ReactComponent as UploadFileIcon } from "../assets/Images/upload-file.svg"

export default function FilesDragger() {

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

  }

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

  }

  return (
    <div className='files-dragger'>

      <div className='files-dragger__container'>
        <div
          className="files-dragger__drag-and-drop"
          onDragOver={e => handleDragOver(e)}
          onDragLeave={e => handleDragLeave(e)}
          onDrop={e => handleOnDrop(e)}
        >

          <UploadFileIcon className='files-dragger__upload-icon' />

          <p className="files-dragger__paragraph">Drag & drop</p>

        </div>

      </div>

      <p className="files-dragger__paragraph-2">or</p>

      <button className="btn btn--secondary">Browse</button>

    </div>
  )
}
