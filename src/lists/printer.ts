import { DirectoryTree } from 'directory-tree'
import * as _ from 'lodash/fp'
import treeify, { TreeObject } from 'treeify'
import { isTree, Tree, Tree2, TreeNode, TreeNodeInfo } from '../types'

const tab = (n: number = 1, v?: string) => {
    return `${_.repeat(n)('\t')} ${v ? v : ''}`
}

export const print = (tree: DirectoryTree) => {
    const t: TreeObject = printTree(tree)
    p(printTree2(tree))
    //console.log(treeify.asTree(t, false, true))
    //console.log(JSON.stringify(printTree2(tree), undefined, 2))
}


const printTree = (tree: DirectoryTree) => {
    if (tree.type === 'directory' && tree.children) {
        const result: TreeObject = { [tree.name]: printNodeChildren(tree.children) }
        //return treeify.asTree(result, false, true)
        return result
    } else {
        const result: TreeObject = { [tree.name]: "" }
        //return treeify.asTree(result, false, true)
        return result
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


const printTree2 = (tree: DirectoryTree): Tree2 => {
    if (tree.type === 'directory' && tree.children) {
        const node: TreeNodeInfo = {
            name: tree.name,
            isLast: false,
            children: printNodeChildren2(tree.children, 0),
            deep: 0,
        }
        //return treeify.asTree(result, false, true)
        return { root: node }
    } else {
        const node: TreeNodeInfo = {
            name: tree.name,
            isLast: true,
            deep: 0,
            children: []
        }
        return { root: node }
    }
}


const printNodeChildren2 = (listTree: DirectoryTree[], parentDeep: number): TreeNodeInfo[] => {
    const lastChildren = _.last(listTree)
    return listTree.reduce((acc: TreeNodeInfo[], t: DirectoryTree) => {
        const node: TreeNodeInfo = {
            name: t.name,
            isLast: lastChildren?.name === t.name ? true : false,
            deep: parentDeep + 1,
            children: []
        }
        if (t.type === 'directory' && t.children) {
            const result: TreeNodeInfo = { ...node, children: printNodeChildren2(t.children || [], parentDeep + 1) }
            return [...acc, result]
        } else {
            return [...acc, { ...node, isLast: true, deep: parentDeep + 1, }]
        }
    }, [])
}

const p = (tree: Tree2) => {
    const { name, deep, isLast, children } = tree.root
    if (isLast) {
        p2(name, deep, isLast)
    } else {
        p2(name, deep, isLast)
        pc(children)
    }
}

const pc = (children: TreeNodeInfo[]) => {
    children.map(c => {
        if (c.isLast) {
            p2(c.name, c.deep, c.isLast)
            if (c.children) {
                pc(c.children)
            }

        } else {
            p2(c.name, c.deep, c.isLast)
            pc(c.children)
        }
    })
}

const p2 = (name: string, deep: number, isLast: boolean) => {
    if (isLast) {
        console.log(tab(deep - 2), tab(1, "|"), tab(1), "└", name)
    } else {
        console.log(_.repeat(deep - 1)(tab(1, "|")), name)
    }
}
