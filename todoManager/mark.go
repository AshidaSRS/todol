package todoManager

import (
	"fmt"

	//	"com.shin/ashida/todol/todoOrg"
	"bufio"

	"com.shin/ashida/todol/todoOrg"
)

func MarkAsDone(element int, path string) {
	fullPath := generatePath(path)
	todoOrg.Decode(fullPath)
}

func test(reader *bufio.Reader) {
	fmt.Println("testing")
	fmt.Println(reader.ReadString('\n'))
}
