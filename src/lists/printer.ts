import { DirectoryTree } from 'directory-tree'
import * as _ from 'lodash/fp'
import treeify, { TreeObject } from 'treeify'

const tab = (n: number = 1, v?: string) => {
    return `${_.repeat(n)('\t')} ${v ? v : ''}`
}

export const print = (tree: DirectoryTree) => {
    console.log(printTree(tree))
}

// const printList = (tree: DirectoryTree[] | undefined, times: number) => {
//     tree && tree.map((t: DirectoryTree) => {
//         const [head, ...tail] = tree || []
//         if (t.type === 'directory' && head) {
//             if (_.last(tail)?.name !== t.name) {
//                 console.log(tab(times - 1, "│"), tab(1, "├"), t.name)
//                 console.log(tab(times - 1, "│"), tab(1, "│"), tab(1, "│"))
//                 printList(t.children, times + 1)
//             } else {
//                 console.log(tab(times), "└", t.name)
//                 console.log(tab(times), tab(1, "│"))
//                 printList(t.children, times + 1)
//             }
//         } else {
//             if (t.path.includes(_.last(tail)?.name || '')) {
//                 console.log(tab(times - 1, "│"), tab(1, "└"), t.name)
//             } else {
//                 console.log(tab(times - 1), tab(1, "└"), t.name)
//             }
//         }
//     })
// }

const printTree = (tree: DirectoryTree) => {
    if (tree.type === 'directory' && tree.children) {
        const result: TreeObject = { [tree.name]: printNodeChildren(tree.children) }
        return treeify.asTree(result, false, true)
    } else {
        const result: TreeObject = { [tree.name]: "" }
        return treeify.asTree(result, false, true)
    }
}

const printNodeChildren = (listTree: DirectoryTree[]): TreeObject => {
    return listTree && listTree.reduce((acc: {}, t: DirectoryTree) => {
        if (t.type === 'directory' && t.children) {
            return { ...acc, [t.name]: printNodeChildren(t.children || []) }
        } else {
            return { ...acc, [t.name]: "" }
        }
    }, {})
}
