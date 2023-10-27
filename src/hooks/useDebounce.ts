import { useEffect, useRef, useState } from "react";

function useDebounce<T>(initValue?: T, delay: number = 700) {
    const valueRef = useRef<T>()
    const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>()
    const [value, setValue] = useState<T | undefined>(initValue)
    const setDebounce = (value: T) => {
        valueRef.current = value
        timeoutIdRef.current && clearTimeout(timeoutIdRef.current)
        timeoutIdRef.current = setTimeout(() => {
            setValue(valueRef.current)
        }, delay);
    }
    useEffect(() => {
        timeoutIdRef.current && clearTimeout(timeoutIdRef.current)
    }, [])
    return [value, setDebounce] as const
}

export default useDebounce;