#! liberate sh
[Huh?](https://en.wikipedia.org/wiki/Shebang)

    #!/bin/sh

# Liberate
### a literate source file interpreter

This program provides an easy way to transparently execute literate programs
written in interpreted programming languages.

# Usage

`liberate` is not intended for interactive use but rather via a shebang line
on the target source file, like the one at the top of this document.
  
For instance, where a `.rb` file might start with 
```sh
#!/usr/local/bin/ruby
```
An equivalent `.rb.md` file would instead start with 
```sh
#!/usr/local/bin/liberate /usr/local/bin/ruby
```

Or, more succinctly
```sh
#!liberate ruby
```

Passing flags like `-w` to the interpreter via shebang may cause strange
behaviour due to the way we juggle arguments. I recommend against it.

# Implementation

Pretty simple. We grab the interpreter (from the shebang)
and the target file (from the OS)...

    interpreter=$1; shift
    file=$1; shift

Then we can cut and grep our way to success. 

    output="/tmp/${file%.*}"
    cat $file | grep '^    ' | cut -b 5- > $output

Lastly, run the thing.

    $interpreter $output $@

Patches are always welcome, of course.

# Installation

`curl http://luchenlabs.com/lp/liberate.sh -o /usr/local/bin/liberate`

Paste that into your shell.
