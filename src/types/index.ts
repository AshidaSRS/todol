export interface Tree {
    [k: string]: TreeNode
}

export type TreeNode = undefined | Tree | null

export const isTree = (o: TreeNode): o is Tree => !!o


export interface Tree2 {
    root: TreeNodeInfo,
}

export interface TreeNodeInfo {
    isLast: boolean,
    name: string,
    deep: number,
    children: TreeNodeInfo[]
}
