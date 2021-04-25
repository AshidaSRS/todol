import { ParseError } from '../types/errors'

export type TodoType = 'todo' | 'subtodo' | 'check'

export interface TODO {
    name: string
    children: {}[]
    checkItems: {}[]
    childrenDone: number
    childrenTotal: number
    done: boolean
}

export type ParserResult = {
    list: TODO | undefined,
    errors: ParseError[] | undefined
}

export interface TodolOptions {
    autoCommitPush: boolean
    commitMessage: string
    rememberLastList: boolean
}
