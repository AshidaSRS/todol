package todoOrg

import (
	"fmt"
	"regexp"
	"time"
)

var checkTodoRegExpr = `(- \[ \]) (.*)`
var todoListRegExpr = `^(\*{1}) (TODO|DONE) (.*)`
func getSubTodoRegExpr(n int) string {
	return fmt.Sprintf(`^(\*{$d}) (TODO|DONE) (.*)`, n)
}
var checkRegExpr = `(- \[( |X)\]) `
var checkedRegExpr = `(- \[X\]) `
//var noCheckRegExpr = `(- \[ \]) `

func Decode(buffer []byte) {
	cosas := regexp.MustCompile(getSubTodoRegExpr(2))
	c := cosas.FindAll(buffer, -1)
	for _, l := range c {
		fmt.Println(string(l))
	}
	re := regexp.MustCompile(checkTodoRegExpr)
	re2 := regexp.MustCompile(checkRegExpr)
	var checkLists []CheckItem
	for i, exp := range re.FindAll(buffer, -1) {
		done, _ := regexp.Match(checkedRegExpr, exp)
		content := re2.Split(string(exp), -1)[1]
		date := time.Now()

		var d = CheckItem {
			line: i+1,
			checked: done,
			content: content,
			doneAt: map[bool]string{true: date.String(), false: ""} [done],
		}
		checkLists = append(checkLists, d)
	}
	fmt.Println(checkLists)
	return
}

func Encode() {
	return
}
