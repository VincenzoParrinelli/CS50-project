import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from "uuid"

export default function Header() {

    const [clientCode, setClientCode] = useState<string>("")

    // Genereate new code for this client
    const getNewCode = (): void => {

        const newCode = uuidv4() as string

        localStorage.setItem("clientCode", newCode)

        setClientCode(newCode)
    }


    // On component mount fetch client code from local storage else if first time using the extension generate a new code
    // Also fetch files saved in indexedDb in order to render a file history
    useEffect(() => {

        const localStorageClientCode = localStorage.getItem("clientCode") as string | null

        !localStorageClientCode ? getNewCode() : setClientCode(localStorageClientCode)

    }, [])

    return (
        <div className='header'>
            <h2 className="heading heading--2">UPLOAD FILES</h2>

            <div className="header__code-container">
                <h3 className="heading heading--3">YOUR CODE:</h3>
                <span className="header__code">{clientCode}</span>
            </div>

            <button
                className="btn btn--primary"
                onClick={() => getNewCode()}
            >
                NEW CODE
            </button>
        </div>
    )
}