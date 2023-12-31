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
        paramsString(moreParams: { [key: string]: string } = {}) {
            const newParamsList = { ...params, ...moreParams }

            const keyParams = Object.keys(newParamsList);
            const paramStringArray = keyParams.map((param) => {
                return param + "=" + newParamsList[param];
            });
            return keyParams.length ? "?" + paramStringArray.join("&") : "";
        },
    };
}

export default useQueryParams;
