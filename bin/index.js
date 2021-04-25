"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lists_1 = require("./lists");
var mark_1 = require("./lists/mark");
var utils_1 = require("./utils");
var todolArgs = process.argv.slice(2);
var versionLog = function () { return console.log("\n\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2001 \u2588\u2588\u2588\u2588\u2588\u2588\u2001 \u2588\u2588\u2588\u2588\u2588\u2588\u2001  \u2588\u2588\u2588\u2588\u2588\u2588\u2001 \u2588\u2588\u2001\n\u2001\u2001\u2001\u2588\u2588\u2001\u2001\u2001\u2001\u2588\u2588\u2001\u2001\u2001\u2001\u2588\u2588\u2001\u2588\u2588\u2001\u2001\u2001\u2588\u2588\u2001\u2588\u2588\u2001\u2001\u2001\u2001\u2588\u2588\u2001\u2588\u2588\u2001\n   \u2588\u2588\u2001   \u2588\u2588\u2001   \u2588\u2588\u2001\u2588\u2588\u2001  \u2588\u2588\u2001\u2588\u2588\u2001   \u2588\u2588\u2001\u2588\u2588\u2001\n   \u2588\u2588\u2001   \u2588\u2588\u2001   \u2588\u2588\u2001\u2588\u2588\u2001  \u2588\u2588\u2001\u2588\u2588\u2001   \u2588\u2588\u2001\u2588\u2588\u2001\n   \u2588\u2588\u2001   \u2001\u2588\u2588\u2588\u2588\u2588\u2588\u2001\u2001\u2588\u2588\u2588\u2588\u2588\u2588\u2001\u2001\u2001\u2588\u2588\u2588\u2588\u2588\u2588\u2001\u2001\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2001\n\nAuthor: @AshidaSRS (ashida.shin@gmail.com)\nVersion: " + utils_1.env('VERSION') + "\n"); };
var helpLog = function () {
    versionLog();
    console.log("\nUsage:\n  todol config\n\t Config the app with some options (auto commit-push in case git, etc.)\n\t\t autoCommitPush: Update list after marking some element\n\t\t commitMessage: Message to put in the commit. Keywords '{{todo-list}}' '{{element}}'\n\t\t rememberLastList: True or False to avoid writing the list again in the path\n  todol [list]\n\t List the TODO lists.\n  todol mark todo-list-path element-line-number done\n\t todo-list-path\n\t\t It is the path in the tree of todo lists plus the path to the element.\n\t\t Example: \"todo-lists/personal/todo/Personal stuff/Emacs\"\n\t\t The path must be between \"\"\n\t element-line-number\n\t\t It is the line inside the list provided (first element is 0) of the element\n\t\t that you want to apply the mark.\n\t done\n\t\tIt is a boolean (true/false) to mark or unmark the element from DONE -> TODO or TODO -> DONE\n  todol git git command args...\n\t If the TODO lists is a git repository, execute a git command\n\t specified by git-command-args.\n  todol help\n\t Shows this text.\n  todol version\n\t Shows version\n");
};
switch (todolArgs[0]) {
    case 'init':
        console.log('Configure');
        break;
    case 'list':
        try {
            lists_1.list();
        }
        catch (err) {
            //TODO: Error log
            console.error('Internal error');
        }
        break;
    case 'version':
        versionLog();
        break;
    case 'mark':
        var listArgs = todolArgs.slice(1);
        if (listArgs.length < 3) {
            // TODO: Error log
            console.log('Error missing arguments');
            helpLog();
            break;
        }
        try {
            var listPath = listArgs[0];
            var element = utils_1.CustomNumber(listArgs[1]);
            var done = utils_1.CustomBoolean(listArgs[2]);
            mark_1.mark(listPath, element, done);
        }
        catch (err) {
            // TODO: Error log
            console.error(err.message);
            helpLog();
        }
        break;
    case 'git':
    // TODO: GIT
    case 'help':
        helpLog();
        break;
    default:
        try {
            lists_1.list();
        }
        catch (err) {
            //TODO: Error log
            console.error('Internal error');
        }
        break;
}
