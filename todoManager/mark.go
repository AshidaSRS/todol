package todoManager

import (
	"os"
	"fmt"
	"io"
	"com.shin/ashida/todol/todoOrg"
)


func MarkAsDone(element int, path string) {
	fullPath := generatePath(path)
	
	fi, err := os.Open(fullPath)
	if err != nil {
	    panic(err)
	}
	
	defer func() {
	    if err := fi.Close(); err != nil {
		panic(err)
        }
	}()

	buf := make([]byte, 1024)
	for {
	    n, err := fi.Read(buf)
	    if err != nil && err != io.EOF {
		panic(err)
	    }
	    if n == 0 {
		break
	    }
	}

	fmt.Println(element)
	todoOrg.Decode(buf)
	
}
