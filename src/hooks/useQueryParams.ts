import { useSearchParams } from "next/navigation";

function useQueryParams() {
    const params: { [key: string]: string } = {}
    for (const [key, param] of useSearchParams().entries() as any) {
        params[key] = param
    }
    return {
        get(key: string) {
            return params[key]
        },
        getAll() {
            return params
        }
    };
}

export default useQueryParams;