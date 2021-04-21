import archy from 'archy';
import chalk from 'chalk'

// Copied from https://github.com/mafintosh/pretty-tree/
// due to changing colours

const echo = <T>(val: T): T => {
    return val
}

interface Node {
    label: string
    nodes: Node[],
    leaf?: { [key: string]: undefined | null | string }
}

export const tree = (color: boolean) => {
    var cyan = color ? chalk.cyan : echo
    var grey = color ? chalk.grey : echo
    var blue = color ? chalk.blueBright : echo

    var isAtomic = (v: any) => {
        return v === null || v === undefined || typeof v !== 'object';
    };

    var leaf = (obj?: any) => {
        if (isAtomic(obj)) return ['' + obj];

        var keys = Object.keys(obj);
        var isArray = Array.isArray(obj);
        var nodes: any[] = [];

        var atomic = keys.filter(function(key) {
            return isAtomic(obj[key]);
        });

        var nonAtomic = keys.filter(function(key) {
            return !isAtomic(obj[key]);
        });

        var pad = atomic.reduce(function(max, val) {
            return max.length >= val.length ? max : val.replace(/./g, ' ');
        }, ' ');

        if (!atomic.length && !nonAtomic.length) return [grey('(empty)')];

        atomic.forEach(function(key) {
            var val = (obj[key] + '').replace(/\n/g, '\n  ' + pad);
            key = key + ':' + pad.slice(key.length - pad.length - 1);
            nodes.push(isArray ? val : (cyan(key) + val));
        });

        nonAtomic.forEach(function(key) {
            nodes.push({ label: isArray ? undefined : cyan(key), nodes: leaf(obj[key]) });
        });

        return nodes;
    };

    var visit = (node: any) => {
        if (node.label) node.label = blue(node.label);
        if (node.nodes) node.nodes = [...node.nodes].map(visit);
        if (node.leaf) node.nodes = [...node.nodes || [], ...leaf(node.leaf)];
        if (node.label && (!node.nodes || !node.nodes.length)) node.nodes = [grey('(empty)')];
        return node;
    };

    return (node: any) => {
        return archy(visit(node))
            .replace(/([├└])─┬ \n[│ ]+├/gm, '$1─┬')
            .replace(/([├└])─┬ \n[│ ]+└/gm, '$1──')
            .replace(/[┬├─└│┐]/g, (v: any) => {
                return grey(v);
            });
    };
}
