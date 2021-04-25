import dirTree, { DirectoryTree } from "directory-tree";
import { ParserResult, TODO } from "../types";
import { ParseError } from "../types/errors";
import { env } from "../utils";
import { print } from './printer'
import * as _ from 'lodash/fp'
import { parse } from "./parser";

export const tree: DirectoryTree = dirTree(env('USER_PATH'), {
    exclude: /(\.(DS_Store|git))|(README.org)/
});

export const list = () => print(tree)


export const parseTODOList = (path: string): ParserResult => {
    console.log(parse(path))
    console.log('NO_IMPLEMENTED')
    const error: ParseError = new ParseError('NOT_IMPLEMENTED')
    return { list: undefined, errors: [error] }
}

export const updateList = (list: TODO, elementPath: string, element: number, done: boolean): TODO | undefined => {
    const todoListAndSublists: string[] = _.compact(elementPath.split('/'))
    console.log('NOT_IMPLEMENTED')
    return undefined
}

export const backupList = (list: TODO) => {
    console.log('NOT_IMPLEMENTED')
    return false
}
