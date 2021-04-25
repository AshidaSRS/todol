export const Number = (n: number): number => {
    if (isNaN(Number(n))) throw new Error(`${n} is not a number`)
    return Number(n)
}
