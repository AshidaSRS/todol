import { ParserResult, TODO } from "../types";
import { parseTODOList, updateList, backupList } from './index'


export const mark = (listPath: string, element: number, done: boolean): boolean => {
    const cleanPath: string = listPath.replace('todo-lists/', '');
    const [filePath, elementPath]: string[] = cleanPath.split('todo')

    const { list, errors }: ParserResult = parseTODOList(filePath)

    if (errors || !list) {
        console.log('Error')
        return false
    }

    const newList: TODO | undefined = updateList(list, elementPath, element, done)

    if (!newList) {
        console.log('Error')
        return false
    }

    return backupList(newList)
}
