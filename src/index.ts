import { list } from './lists'
import { mark } from './lists/mark';
import { env, CustomNumber as Number, CustomBoolean as Boolean } from './utils'

const todolArgs = process.argv.slice(2);

const versionLog = () => console.log(`
████████  ██████  ██████   ██████  ██ 
   ██    ██    ██ ██   ██ ██    ██ ██ 
   ██    ██    ██ ██   ██ ██    ██ ██ 
   ██    ██    ██ ██   ██ ██    ██ ██ 
   ██     ██████  ██████   ██████  ███████ 

Author: @AshidaSRS (ashida.shin@gmail.com)
Version: ${env('VERSION')}
`);

const helpLog = () => {
    versionLog()
    console.log(`
Usage:
  todol config
\t Config the app with some options (auto commit-push in case git, etc.)
\t\t autoCommitPush: Update list after marking some element
\t\t commitMessage: Message to put in the commit. Keywords '{{todo-list}}' '{{element}}'
\t\t rememberLastList: True or False to avoid writing the list again in the path
  todol [list]
\t List the TODO lists.
  todol mark todo-list-path element-line-number done
\t todo-list-path
\t\t It is the path in the tree of todo lists plus the path to the element.
\t\t Example: "todo-lists/personal/todo/Personal stuff/Emacs"
\t\t The path must be between ""
\t element-line-number
\t\t It is the line inside the list provided (first element is 0) of the element
\t\t that you want to apply the mark.
\t done
\t\tIt is a boolean (true/false) to mark or unmark the element from DONE -> TODO or TODO -> DONE
  todol git git command args...
\t If the TODO lists is a git repository, execute a git command
\t specified by git-command-args.
  todol help
\t Shows this text.
  todol version
\t Shows version
`)
}


switch (todolArgs[0]) {
    case 'init':
        console.log('Configure')
        break;
    case 'list':
        try {
            list()
        } catch (err) {
            //TODO: Error log
            console.error('Internal error')
        }
        break;
    case 'version':
        versionLog()
        break
    case 'mark':
        const listArgs = todolArgs.slice(1)
        if (listArgs.length < 3) {
            // TODO: Error log
            console.log('Error missing arguments')
            helpLog()
            break;
        }
        try {
            const listPath: string = listArgs[0]
            const element: number = Number(listArgs[1])
            const done: boolean = Boolean(listArgs[2])
            mark(listPath, element, done)
        } catch (err) {
            // TODO: Error log
            console.error(err.message)
            helpLog()
        }
        break;
    case 'git':
    // TODO: GIT
    case 'help':
        helpLog()
        break;
    default:
        try {
            list()
        } catch (err) {
            //TODO: Error log
            console.error('Internal error')
        }
        break;
}
