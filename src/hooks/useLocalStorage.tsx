import { useEffect, useState } from 'react'
// make sure it works with custom generic types and the props
// T is whatever we pass in the useLocalStorage hook in the shopping cart context
// we are saying that this inital value is either going ot be that type or be  fucntion that reutnr that type
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
    //    we odnly want to check the local storage once since its a heavy action
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key)
        if (jsonValue != null) return JSON.parse(jsonValue)
        // if we odn't have anything there 
        if (typeof initialValue === "function") {
            // tell it its a type of invokable function which is a type of T
            return (initialValue as () => T)()
        } else {
            return initialValue
        }
    })

    // store to local stoarge every time our key or value changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    // first element in array is always going to have the following types of statements in the array retiurned
    return [value, setValue] as [typeof value, typeof setValue]
}