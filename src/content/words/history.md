---
title: A Brief History of my Fingers
shorttitle: history
date: June 5
tags: [technical]
---

I had a long cross-country flight today. Sleep wasn't in the cards and I couldn't make any code come out of my fingers.

So, on a whim, I poked and prodded at my shell history, eventually arriving at a list of my most frequently used commands:

```bash
sort $HISTFILE | uniq -c | sort --reverse
```

This sorts `zsh`'s history file, which for me is `~/.history`, tallies repeated lines, then sorts the most frequently-used lines towards the top.

Here's what I got. Below is every command I've entered ten times or more since I installed Mac OS about six months ago.

     281 s
     168 g s
     111 r
      91 a
      66 x
      63 make && ./jam-1.0.0
      44 g d
      38 make && ./cheezus2-1.0.0
      36 ls
      35 b
      28 gulp
      27 ./cheezus2-1.0.0
      23 u
      22 rz
      22 make
      19 g l
      17 coffee
      15 g pp
      14 x ls
      14 ssh gany
      13 gulp && jpm -b ~/Applications/Firefox.app/Contents/MacOS/firefox run
      13 ez
      13 d
      11 ./make.js index.jade
      10 x testbed
      10 grunt serve
      10 fg

I'll explain in detail below, but overall these results tell me that I'm generally keystroke-efficient in the terminal. Four of the top five results are one letter, and something like half of my oft-typed commands are under 5 characters. Bear in mind that even the longish commands here were tab-completed. I make heavy use of [alphabeticals][aliases] to slash the time I spend typing to--subjectively--an insignificant proportion of a given task. So while there's no shortage of bullshit to hamper my efficiency, I can at least rest assured that typing isn't contributing. Okay, that's not entirely true because I use Confluence sometimes, but it'll be a long time before Atlassian flushes *that* turd.

*  `281 s`: My shorthand for the `ls` command. No surprises here.
*  `168 g s`: `git status`. Git has its own alias mechanism which, for some reason, I use.
*  `111 r`: Builtin `zsh`ism for the previous command. *Mostly* equivalent to `!!`.
*  ` 91 a`: When `s` isn't enough. This is `ls -alph`, a verbose file listing.
*  ` 66 x`: Once stood for `tmux`, now aliased to `ecks.pl`. TLDR? List tmux sessions.
*  ` 63 make && ./jam-1.0.0`: I was a bit surprised to see this so high. I spent most of an 18 hour train ride in March iterating on some [procgen boilerplate][jamboot], but unfortunately didn't accomplish much except learning I despise OpenGL viewports an apparently can't do algebra anymore.
*  ` 44 g d`: `git diff`. Naturally.
*  ` 38 make && ./cheezus2-1.0.0`: Similar iteration on [Cheezus II][].
*  ` 36 ls`: Apparently, I sometimes fall back into old habits.
*  ` 35 b`: This builds whatever's in the current directory according to whatever build system it looks like it might be using.
*  ` 28 gulp`: I should just use `b` here, but apparently I don't trust it enough yet.
*  ` 27 ./cheezus2-1.0.0`: 
*  ` 23 u`: Shorthand for `cd ..`.
*  ` 22 rz`: Reloads my `.zshrc`.
*  ` 22 make`: Nuff said.
*  ` 19 g l`: A colorfuler, denser `git log` I stole [from @stevelosh](https://bitbucket.org/sjl/dotfiles/src/1ff33bef59847fa2fcec2e172e16c010080923dd/gitconfig?fileviewer=file-view-default#gitconfig-20).
*  ` 17 coffee`: CoffeeScript's REPL
*  ` 15 g pp`: `git pull`, then `git push`. Evidently I only do this a few times a month.
*  ` 14 x ls`: How I listed `tmux` sessions before I made ecks.
*  ` 14 ssh gany`: Shelling into my favoritest server in the whole wide world.
*  ` 13 gulp && jpm -b ~/Applications/Firefox.app/Contents/MacOS/firefox run`: Right after I wiped my laptop and before I had it comfortably tweaked, I worked a lot on [a Firefox plugin][dotbkm] that I still haven't released because I'm horrible. Jetpack wasn't smart enough to detect my `brew cask`-provided Firefox.
*  ` 13 ez`: Edit my `.zshrc`
*  ` 13 d`: My shorthand for `cd`. Given no arguments, this jumps back to $HOME sweet home.
*  ` 11 ./make.js index.jade`: I was too impatient to set up a gulpfile one time.
*  ` 10 x testbed`: One of my younger tmux sessions. I'm surprised this is my most frequently attached.
*  ` 10 grunt serve`: Run the serve task in Grunt. Use your imagination.
*  ` 10 fg`: Pick up a suspended process (usually a `C-Z`'d Vim.) Between [Vimux][], [Dispatch][] and sessions, I don't need to use this frequently.


Other interesting notes...I've run just under 3000 commands total in `zsh` since I formatted my laptop in December. Of those, there are just under 1000 distinct commands, of which a whopping 768--over 75%--are unique, entered once and never again.

That's about it. My shell history in, er, a nutshell. What's yours?

[aliases]: https://github.com/Cheezmeister/dotfiles/blob/master/aliases#L2
[jamboot]: https://github.com/Cheezmeister/jamboot
[Cheezus II]: /projects/cheezus2
[dotbkm]: https://github.com/Cheezmeister/dotbkm-addon
[Vimux]: https://github.com/benmills/vimux
[Dispatch]: https://github.com/tpope/vim-dispatch

