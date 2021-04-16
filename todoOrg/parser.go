package todoOrg

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
	"regexp"

	"gopkg.in/gookit/color.v1"
)

var checkTodoRegExpr = `(- \[ \]) (.*)`
var todoListRegExpr = `^(\*{1}) (TODO|DONE) (.*)`

func getSubTodoRegExpr(n int) string {
	return fmt.Sprintf(`^(\*{%d}) (TODO|DONE) (.*)`, n)
}

var checkRegExpr = `(- \[( |X)\]) `
var checkedRegExpr = `(- \[X\]) `

//var noCheckRegExpr = `(- \[ \]) `

func Decode(path string) {
	fi, err := os.Open(path)
	if err != nil {
		panic(err)
	}

	defer func() {
		if err := fi.Close(); err != nil {
			panic(err)
		}
	}()

	reader := bufio.NewReader(fi)
	var todoFile TodoFile = TodoFile{
		Lists: []TodoList{},
		Name:  path,
	}

	todoFile = processTodoFile(reader, todoFile)
	j, err := json.MarshalIndent(todoFile, "", "  ")
	if err != nil {
		log.Fatalf(err.Error())
	}
	fmt.Println(string(j))
}

func processLine(reader *bufio.Reader) (string, error) {
	var line string
	var err error
	line, err = reader.ReadString('\n')
	if err != nil && err != io.EOF {
		os.Exit(1)
	}
	return line, err
}

func processTodoFile(reader *bufio.Reader, acc TodoFile) TodoFile {
	line, err := processLine(reader)
	if line == "\n" {
		return processTodoFile(reader, acc)
	}
	isTodo, _ := regexp.Match(todoListRegExpr, []byte(line))
	if isTodo {
		_, l := processTodoList(line, reader, acc.Lists)
		acc.Lists = append(acc.Lists, l...)
	}
	if err != nil {
		return acc
	}
	acc = processTodoFile(reader, acc)
	return acc
}

func tOf(t bool) string {
	if t {
		return color.LightGreen.Render(t)
	} else {
		return color.LightRed.Render(t)
	}
}

func processLoop(line string, reader *bufio.Reader, acc TodoList, list []TodoList) (TodoList, []TodoList) {
	blue2 := color.LightBlue.Render
	isSubList, _ := regexp.Match(getSubTodoRegExpr(2), []byte(line))
	isCheck, _ := regexp.Match(checkTodoRegExpr, []byte(line))
	//	isTodo, _ := regexp.Match(todoListRegExpr, []byte(line))
	fmt.Println(blue2("loop"), "isSublist", tOf(isSubList), "isCheck", tOf(isCheck))
	switch {
	case isSubList:
		acc, list = processSubTodoList(line, reader, acc, list)
		break
	case isCheck:
		acc, list = processChecks(line, reader, acc, list)
		break
	// case isTodo:
	//	return processTodoList(line, reader, append(list, acc))
	// case line == "\n":
	//	line, _ = processLine(reader)
	//	acc, list = processLoop(line, reader, acc, list)
	//	break
	default:
		list = append(list, acc)
		break
	}

	return acc, list
}

func processTodoList(line string, reader *bufio.Reader, list []TodoList) (TodoList, []TodoList) {
	blue := color.LightCyan.Render
	fmt.Println(blue("todo list"), line)
	var todoList = TodoList{
		Done:       false,
		Sublists:   []TodoList{},
		CheckItems: []CheckItem{},
		Name:       line,
		DoneAt:     "",
	}
	line, _ = processLine(reader)
	todoList, list = processLoop(line, reader, todoList, list)
	return todoList, list
}

func processSubTodoList(line string, reader *bufio.Reader, acc TodoList, list []TodoList) (TodoList, []TodoList) {
	blue := color.LightMagenta.Render
	fmt.Println(blue("sub todo"))
	var todoSubList = TodoList{
		Done:       false,
		CheckItems: []CheckItem{},
		Sublists:   []TodoList{},
		Name:       line,
		DoneAt:     "",
	}
	line, _ = processLine(reader)
	fmt.Println(blue(todoSubList))
	todoSubList, list = processLoop(line, reader, todoSubList, list)
	fmt.Println(blue(todoSubList))
	acc.Sublists = append(acc.Sublists, todoSubList)
	return acc, list
}

func processChecks(line string, reader *bufio.Reader, acc TodoList, list []TodoList) (TodoList, []TodoList) {
	blue := color.LightGreen.Render
	fmt.Println(blue("checks"), line)
	var checkItem = CheckItem{
		DoneAt:  "",
		Checked: false,
		Content: line,
		Line:    0,
	}
	line, _ = processLine(reader)
	acc.CheckItems = append(acc.CheckItems, checkItem)
	acc, list = processLoop(line, reader, acc, list)
	return acc, list
}

func Encode() {
	return
}
