import dirTree, { DirectoryTree } from "directory-tree";
import { print } from './printer'

export const tree: DirectoryTree = dirTree("/Users/x311680/git/todo-lists", {
    exclude: /(\.(DS_Store|git))|(README.org)/
});

export const log = () => print(tree)
