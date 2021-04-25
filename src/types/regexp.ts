export const TODOListRegExp: RegExp = `\c`
export const SubTODOListRegExp: RegExp = `\b`
export const CheckItem: RegExp = `\a`


export const isTodo = (l: string): l is 'todo' => {
    return TODOListRegExp.test(l)
}

export const isSubTodo = (l: string): l is 'todo' => {
    return SubTODOListRegExp.test(l)
}

export const isCheck = (l: string): l is 'todo' => {
    return CheckItem.test(l)
}
