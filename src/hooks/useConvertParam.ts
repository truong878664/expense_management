// import { Object } from "@/app/global";
// import { useState } from "react";

// interface OptionParam {
//     pathname: string;
//     query: Object<string | number>;
//     newQuery?: Object<string | number>;
// }
// function useCovertParams({ pathname, query, newQuery = {} }: OptionParam) {
//     const [converted, setQuery] = useState(null)

//     return [converted, setQuery]
//     // const converted: string[] = []
//     // const currentQuery = { ...query }

//     // for (const key in newQuery) {
//     //     currentQuery[key] = newQuery[key]
//     // }

//     // for (const key in currentQuery) {
//     //     converted.push(`${key}=${currentQuery[key]}`)
//     // }
//     // return pathname + "?" + converted.join("&");
// }

// export default useCovertParams;

import { Object } from "@/app/global";
import { useEffect, useMemo, useRef, useState } from "react";

interface OptionParam {
    pathname: string;
    query: Object<string | number>;
    newQuery?: Object<string | number>;
}
function useCovertParams({ pathname, query }: OptionParam) {
    // const [newQuery, setNewQuery] = useState<Record<string, string | number>>({})
    // const newQuery = useRef({})
    // const [converted, setConverted] = useState<string>(pathname)
    // const dataConverted: string[] = [];
    // const currentQuery = { ...query };
    // const setNewQuery = (value) => {
    //     newQuery.current = value
    // }
    // const convert = () => {
    //     dataConverted.length = 0
    //     for (const key in currentQuery) {
    //         dataConverted.push(`${key}=${currentQuery[key]}`)
    //     }
    //     setConverted(() => pathname + "?" + dataConverted.join("&"))
    // }

    // useEffect(() => {
    //     for (const key in newQuery) {
    //         currentQuery[key] = newQuery.current[key]
    //     }
    //     convert()
    // }, [newQuery])

    // return [converted, setNewQuery] as const

}

export default useCovertParams;
// const converted: string[] = []
// const currentQuery = { ...query }

// for (const key in newQuery) {
//     currentQuery[key] = newQuery[key]
// }

// for (const key in currentQuery) {
//     converted.push(`${key}=${currentQuery[key]}`)
// }
// return pathname + "?" + converted.join("&");
