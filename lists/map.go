package lists

import (
	"io/fs"
	//	"com.shin/ashida/todol/todoManager"
)

// I want generics ;_;

type mapSignatureFn func(fs.FileInfo) string

func MapFileInfoToString(l []fs.FileInfo, fn mapSignatureFn) []string {
	var resL []string
	for _, e := range l {
		resL = append(resL, fn(e))
	}
	return resL
}
