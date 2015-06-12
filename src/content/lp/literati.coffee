$ = require('child_process').exec
file = process.argv[2]
$ "cat #{file} | grep '^    ' | cut -b 5- > $(basename #{file} | cut -d . -f 1-2)"
$ "markdown #{file} > $(basename #{file} | cut -d . -f 1).html"
