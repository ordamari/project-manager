import { useEffect } from 'react'

function useOnLoad(callback: () => void) {
    useEffect(() => {
        callback()
    }, [])
}

export default useOnLoad
