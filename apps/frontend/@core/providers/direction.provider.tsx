'use client'
import { useEffect } from "react";
import useDirection from "../hooks/useDirection";
import { DirectionProvider as _DirectionProvider } from '@radix-ui/react-direction'


type DirectionProviderProps = {
    children: React.ReactNode
}

function DirectionProvider({ children}: DirectionProviderProps) {

    const dir = useDirection()
    useEffect(() => {
        document.body.dir = dir
    }, [dir])   

    return <_DirectionProvider dir={dir}>{children}</_DirectionProvider>
}

export default DirectionProvider
