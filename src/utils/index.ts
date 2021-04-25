import dotenv from 'dotenv'

export const env = (path: string): any => {
    try {
        dotenv.config()
        const value: string | boolean | undefined = process.env[path]
        if (!value) {
            throw new Error(`${path} not found in environment. Check the .env file or add it to the path`)
        }
        return value
    } catch (err) {
        console.log(err.message)
        throw err
    }
}


export const CustomNumber = (n: any): number => {
    if (isNaN(Number(n))) throw new Error(`'${n}' is not a number`)
    return Number(n)
}

export const CustomBoolean = (n: any): boolean => {
    if (n !== 'true' && n !== 'false') throw new Error(`'${n}' is not a boolean`)
    return Boolean(n)
}
