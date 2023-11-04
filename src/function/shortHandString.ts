function shortHandString(string: string | undefined, numberShorthand: number = 20) {
    if (!string) return ""
    if (string?.length > numberShorthand) return string?.slice(0, numberShorthand) + "..."
    return string

}
export default shortHandString;