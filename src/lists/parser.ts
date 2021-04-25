import fs from 'fs';
import * as _ from 'lodash/fp';
import readline from 'readline'
import { TODO } from '../types';
import { isCheck, isSubTodo, isTodo, SubTODOListRegExp, TODOListRegExp } from '../types/regexp';
import { env } from '../utils'

export const parse = (path: string) => {
    const fullPath = `${env('USER_PATH')}/${path}/todo.org`
    const readInterface = readline.createInterface({
        input: fs.createReadStream(fullPath),
        //output: process.stdout,
    });

    let todoListLines: string[] = []
    readInterface.on('line', line => {
        todoListLines = [...todoListLines, line]
    })
    const cleanLines = _.compact(todoListLines)

    return undefined
}


const generateTODOList = (line: string, tail: string[], parent: TODO) => {
    const todo: TODO = {
        name: '',
        children: [],
        childrenDone: 0,
        childrenTotal: 0,
        checkItems: [],
        done: false
    }
    const newParent: TODO = { ...parent, children: [...parent.children, todo] }
    const [nextLine, ...newTail] = tail
    switch (true) {
        case isTodo(nextLine):
            return newParent;
        case isSubTodo(nextLine):
            generateSubTODOList(nextLine, newTail, todo)
            break;
        case isCheck(nextLine):
            parseTODOList(nextLine, newTail, todo)
            break;
        default:
            return todo
    }
}

const generateSubTODOList = (line: string, tail: string[], parent: TODO): TODO => {
    return parent
}

const parseTODOList = (line: string, tail: string[], parent: TODO): TODO => {
    return parent
}
