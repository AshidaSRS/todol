package lists

type filter func(string) bool

func Filter(s []string, fn filter) []string{
	var res []string
	for _, f := range s {
		if fn(f) {
			res = append(res, f)
		}
	}
	return res
}
