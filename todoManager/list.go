package todoManager

import (
	"github.com/kyokomi/emoji/v2"
)

func List() {
	var fileTree = parseDeepDirectoryT(PATH)
	emoji.Println(fileTree.String())
}
