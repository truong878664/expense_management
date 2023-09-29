import { Object } from "@/app/global";

function convertParams({ pathname, query, newQuery }: {
    pathname: string, query: Object<string | number>, newQuery?: Object<string | number>
}) {

    const currentQuery = { ...query, ...newQuery };
    const dataConverted: string[] = [];
    for (const key in currentQuery) {
        dataConverted.push(`${key}=${currentQuery[key]}`);
    }
    return pathname + "?" + dataConverted.join("&");
}

export default convertParams;