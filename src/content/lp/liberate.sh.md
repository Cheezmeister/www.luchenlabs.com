#!/usr/bin/env liberate sh # [Huh?](https://en.wikipedia.org/wiki/Shebang)

    #!/bin/sh

# Liberate
### a literate source file interpreter

This program provides an easy way to transparently execute literate programs
written in interpreted programming languages.

# Usage

`liberate` is not intended to be run interactively but rather via a shebang line
on the target source file, like the one at the top of this document.
  
For instance, where a `.rb` file might start with `#!/usr/local/bin/ruby`, an equivalent
`.rb.md` file would instead start with `#!/usr/local/bin/liberate /usr/local/bin/ruby`.

Or, more succincly using `env`: `#!/usr/bin/env liberate ruby`

It's imporant to note that passing flags to the interpreter via shebang may cause strange
behaviour due to the way we juggle arguments. I recommend keeping it simple.

# Implementation

Pretty simple. We grab the interpreter (from the shebang)
and the target file (from the OS)...

    interpreter=$1; shift
    file=$1; shift

Then pass the rest of the args through.

    cat $file | grep '^    ' | cut -b 5- | $interpreter $*
