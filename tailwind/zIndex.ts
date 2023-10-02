interface ZIndex {
    [key: string | number]: string | number;
}
export default function zIndex() {
    const arrayConfigZIndex: ZIndex = {};
    for (let z = 1; z <= 100; z++) {
        arrayConfigZIndex[z] = z;
    }
    return arrayConfigZIndex;
}
