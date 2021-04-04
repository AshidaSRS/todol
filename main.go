package main

import (
	"flag"
	"fmt"
	"com.shin/ashida/todol/version"
	"com.shin/ashida/todol/git"
	"com.shin/ashida/todol/todoManager"
	"github.com/kyokomi/emoji/v2"
	"strings"
	"log"
	"strconv"
	"os"
)

func main() {

    
	versionFlag := flag.Bool("version", false, "Version")
	flag.Parse()

	if *versionFlag {
		execVersion()
		return
	}

	var args []string = flag.Args()

	if (len(args) == 0) && !*versionFlag {
		todoManager.List()
		return
	}

	var firstArg string = args[0]
	if firstArg == "git" {
		log.Println("Executing git command")
		git.Exec(strings.Join(args[1:], " "))
		return
	}

	if firstArg == "mark" {
		fmt.Println("Making as", args[1])
		path := fmt.Sprintf("%s%s", args[2], ".org")
		element, err := strconv.Atoi(args[3])
		if err != nil {
			fmt.Println(err)
			os.Exit(2)
		}
		todoManager.MarkAsDone(element, path)
		return
	}
	
}

func execVersion() {
	emoji.Println(":calendar: Build Date: ", version.BuildDate)
        emoji.Println(":key: Git Commit: ", version.GitCommit)
        emoji.Println(":small_blue_diamond: Version: ", version.Version)
        emoji.Println(":small_blue_diamond: Go Version: ", version.GoVersion)
        emoji.Println(":computer: OS / Arch: ", version.OsArch)
	return
}
