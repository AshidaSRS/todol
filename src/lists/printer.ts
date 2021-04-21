import { DirectoryTree } from 'directory-tree'
import * as _ from 'lodash/fp'
import emoji from 'node-emoji'
import { tree as prettyTree } from '../tree';

export const print = (tree: DirectoryTree, useColor: boolean = true) => {
    console.log(prettyTree(useColor)(buildTreeFromDirectory(tree)));
}

const buildTreeFromDirectory = (tree: DirectoryTree): any => {
    if (tree.type === 'directory' && tree.children) {
        const labelName = `${emoji.find('blue_book').emoji} ${tree.name}`
        return { label: labelName, nodes: buildChildrenFromDirectory(tree.children, 0), }
    } else {

        return { label: tree.name }
    }
}


const buildChildrenFromDirectory = (listTree: DirectoryTree[], parentDeep: number): any[] => {
    return listTree.reduce((acc: any[], t: DirectoryTree) => {
        if (t.type === 'directory' && t.children) {
            const labelName = `${emoji.find('book').emoji} ${t.name}`
            const result = {
                label: labelName, nodes: buildChildrenFromDirectory(t.children || [], parentDeep + 1)
            }
            return [...acc, result]
        } else {
            const value = `${emoji.find('memo').emoji}`
            return [...acc, { leaf: { [value]: t.name } }]
        }
    }, [])
}
