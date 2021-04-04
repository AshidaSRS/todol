package todoManager

import (
	"fmt"
	"log"
	"io/ioutil"
	"io/fs"
	"strings"
	"com.shin/ashida/todol/lists"
	"github.com/xlab/treeprint"
	"gopkg.in/gookit/color.v1"
)

var PATH = "/Users/ashida/Git/todo-lists"

func generatePath(path string) string {
	return fmt.Sprintf("%s/%s", PATH, path)
}

func cleanPath(dirtyPath string) string {
	 return strings.ReplaceAll(dirtyPath, PATH, "")
}

func filesToPrint(name string) bool {
	var bannedNames []string = []string{"README.org", "README.md"}
	if strings.HasPrefix(name, ".") || lists.Contains(bannedNames, name) {
		return false
	}
	return true
}

func parseDirectory(directory string) []fs.FileInfo {
	files, err := ioutil.ReadDir(directory)
	if err != nil {
		log.Fatal(err)
	}
	return files
}

func generateNameWithEmoji(emoji, name string) string {
	return fmt.Sprintf("%s %s", emoji, name)
}

func parseDeepDirectoryT(directory string) treeprint.Tree {
	var files []fs.FileInfo = parseDirectory(directory)
	var masterTree = treeprint.NewWithRoot("Todo Lists")
	for _, file := range files {
		if filesToPrint(file.Name()) && file.IsDir() {
			newPath := fmt.Sprintf("%s/%s", directory, file.Name())
			blue := color.LightBlue.Render
			parseDeepDirectoryAux(newPath, masterTree.AddBranch(blue(file.Name())))
		} else if filesToPrint(file.Name()) && !file.IsDir() {
			masterTree.AddNode(file.Name())
		}
	}
	return masterTree
}


func parseDeepDirectoryAux(directory string, tree treeprint.Tree) treeprint.Tree {
	var files []fs.FileInfo = parseDirectory(directory)
	for _, file := range files {
		if filesToPrint(file.Name()) {
			newPath := fmt.Sprintf("%s/%s", directory, file.Name())
			if file.IsDir() {
				cyan := color.FgCyan.Render
				branch := tree.AddBranch(cyan(file.Name()))
				parseDeepDirectoryAux(
					newPath,
					branch)
			} else {
				tree.AddNode(cleanPath(file.Name()))
			}
		}
	}
	return tree
}
