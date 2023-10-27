export default function findElementByPositionAndDataName(
    x: number,
    y: number,
    name: string,
) {
    const elements = document.elementsFromPoint(x, y);
    for (const element of elements) {
        if (element instanceof HTMLElement) {
            if (element?.dataset.name === name) {
                return element;
            }
        }
    }
    return null;
}