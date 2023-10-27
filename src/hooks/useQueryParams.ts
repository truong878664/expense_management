import { useSearchParams } from "next/navigation";

function useQueryParams() {
    const params: { [key: string]: string } = {};
    for (const [key, param] of useSearchParams().entries() as any) {
        params[key] = param;
    }
    return {
        get(key: string) {
            return params[key];
        },
        getAll() {
            return params;
        },
        paramsString() {
            const keyParams = Object.keys(params);
            const paramStringArray = keyParams.map((param) => {
                return param + "=" + params[param];
            });
            return keyParams.length ? "?" + paramStringArray.join("&") : "";
        },
    };
}

export default useQueryParams;
