package todoOrg

type CheckItem struct {
	Checked bool   `json:"cheked"`
	Content string `json:"content"`
	DoneAt  string `json:"done_at"`
	Line    int    `json:"line"`
}

type TodoList struct {
	Done       bool        `json:"done"`
	Sublists   []TodoList  `json:"sublists"`
	CheckItems []CheckItem `json:"check_items"`
	Name       string      `json:"name"`
	DoneAt     string      `json:"done_at"`
}

type TodoFile struct {
	Lists []TodoList `json:"lists"`
	Name  string     `json:"name"`
}
