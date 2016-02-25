#!/usr/bin/env coffee # [Huh?](https://en.wikipedia.org/wiki/Shebang)

    #!/usr/bin/env coffee

# WTF?

This program takes a literate source file and "compiles" it to its native form. It is [self-hosting](https://en.wikipedia.org/wiki/Self-hosting)! That's not as impressive as it sounds, really.

# WTF is a literate source file?

A literate source file is a markdown file that contains the source code it describes. 
It is a form of documentation interwoven with the implementation.

A literate source file must end in its native extension followed by ".md". For example, 
`README.coffee.md`, `markdown.pl.md` or `rails.rb.md`.

All indented code blocks of four spaces or more are kept and compiled or interpreted.
All other lines are ignored.

# Okay, like, can you give me an example?

You're reading one. Or technically, you're reading the rendered form of [this one](literati.coffee.md).
Running this program on itself yields this [tiny coffeescript file](literati.coffee).

# Prove it.

It's not complicated. In order to "build" one of these things, let's define a shorthand for the [exec](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options) 
function.

    $ = require('child_process').exec

And get the filename from the first argument...

    file = process.argv[2]

Then we can grep out documentation and cut out indentation. 

    $ "cat #{file} | grep '^    ' | cut -b 5- > $(basename #{file} | cut -d . -f 1-2)"

# The heck just happened?

That's the entire program. It's not even a program, really. Just a script hidden inside a ton of mindless yammering. 
And inside that script is a bash one-liner that does all the real work.

# But why?

The point is that it takes a single line of code (or three, at a stretch) to make **any programming language** support modern literate programming. It works, but it sure ain't fancy. I bet you can do better. LP holds serious potential in today's distracted tech world, but the tooling for it is just not there.
One can envision a [SCM-integrated wiki](http://www.gitit.net/) that is simultaneously its own codebase and, potentially, [its own test suite](https://bitheap.org/cram/), as well. 
This has huge implications for bridging gaps between managers, architects, engineers and customers. It excites me so much I think I just wet my pants a little. But we're not there yet.

This page is my small step in that direction.

As an added bonus, here's how to generate fancy-ass documentation as well:

    $ "markdown #{file} > $(basename #{file} | cut -d . -f 1).html"

There. Four lines. Is that enough SLOC for my TPS report? Now go, write some LP already, and have fun.

# Where credit is due

I owe a small thanks to [kom lim's StackOverflow Answer](http://stackoverflow.com/a/26753382 "Extract File Basename Without Path and Extension in Bash")
from which I swiped shamelessly.

