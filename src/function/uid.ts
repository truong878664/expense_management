const uid = (name: string) => name + "_" + Math.random().toString(16).slice(2)
export default uid