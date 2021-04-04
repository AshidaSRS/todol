package git

import (
	"fmt"
	"log"
	"os/exec"
)


func Exec(command string) {
	cmd := exec.Command("git", command)
	output, err := cmd.Output()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(string(output))
	return
}
