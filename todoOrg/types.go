package todoOrg

type CheckItem struct {
	checked bool
	content string
	doneAt string
	line int
}

type SubTodoList struct {
	name string
	checkItems []CheckItem
	done bool
	doneAt string
}

type TodoList struct {
	done bool
	sublists []SubTodoList
	checkItems []CheckItem
	name string
	doneAt string
}
