package main

import (
	"flag"
	"fmt"
	"com.shin/ashida/todol/version"
	"com.shin/ashida/todol/git"
	"com.shin/ashida/todol/todoManager"
	"strings"
	"log"
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
	
}

func execVersion() {
	fmt.Println("Build Date:", version.BuildDate)
        fmt.Println("Git Commit:", version.GitCommit)
        fmt.Println("Version:", version.Version)
        fmt.Println("Go Version:", version.GoVersion)
        fmt.Println("OS / Arch:", version.OsArch)
	return
}
