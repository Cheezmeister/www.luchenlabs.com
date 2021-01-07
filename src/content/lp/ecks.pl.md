#!liberate perl
[Huh?](https://en.wikipedia.org/wiki/Shebang)

    #!/usr/bin/env perl

# ecks.pl, a finger-coddling wrapper for tmux

## Prologue

Like all literate programs worth reading, this one begins with a story. Once, long ago, an enterprising young code monkey added this alias to his `.zshrc`:

```sh
alias x='tmux -2'
```

Why `x`, you ask? Well, `t` was already taken by some task list or another, but that's neither here nor there.

For a while, life was good.
The code monkey could hammer out `x ls` to view running sessions, `x new -s something` to start one, and `x a -t something` to attach a session.

Eventually he got tired of that extra space.
Not to mention having to remember which flag went with which command.
Plus for some reason, having to type all three letters of "new" instead of "n" really bugged him.
And so, being a diligent code monkey, he made them unnecessary.

```sh
alias xa='tmux -2 attach-session -t'
alias xn='tmux -2 new-session -s'
```

But in so doing, he had committed a cardinal sin of programming: duplication!
Why three separate tmux-related aliases where one could suffice?
Plus he was tired of having to _think_; discerning between `x`, `xa` and `xn` was neural energy this particular monkey would rather spend on code.

_But Brendan_, you may be thinking, _aliases and dotfiles aren't production code.
It's totally acceptable for them to be a jumbled mess. Healthy, even! [Good for the soul!][soul]_

[soul]: https://64.media.tumblr.com/tumblr_lcxvrtDjcm1qfqcq7o1_400.jpg

You might think that. And depending on who you ask, you're probably right.
In fact, for many moons the three aliases stayed just like that.
The code monkey was perfectly productive, and nobody died.

Inevitably, however, better judgment was trumped by the devious trio of laziness, impatience and hubris, and `ecks.pl` was born.

## Chapter 1: Usage

To list all running sessions (`tmux list-sessions`):

```sh
$ x
```

To create a session named "hackery", or attach to it if it already exists (`tmux attach-session -t hackery || tmux new-session -s hackery`):

```sh
$ x hackery
```

To create or attach a remote session using ssh:

```sh
$ x recon@mordor
```

That's about it. Happy fingers!

## Chapter 2: Implementation

I still have no idea what the Perl ritual actually _does_ but it couldn't hurt, right?

    use warnings;
    use strict;

We could perhaps read inputs from a config file or something, but that would be counterproductive in a tool oriented towards *less* typing.

    my $tmux_command = "tmux -2";
    my ($sessname) = @ARGV;


By default, just print current running sessions and early-out. 

    system("$tmux_command ls"), exit(0) unless $sessname;

Fun fact: this line gave me plenty of grief. It started with a `&&` instead, after shell conventions, but *it turns out* that shell conventions are stupid, treating the success return value of 0 as "true" and nonzero as "false". This makes for intuitive scripts but defies logic (literally); Perl (like C) *does the exact opposite*. 

Anyway, if we did get a session name, read it, then attach or create as necessary.

    $sessname =~ /(\w+)(@(\w+))?/;
    my $cmd =  "$tmux_command attach -t $1 || $tmux_command new-session -s $1";

We can target remote sessions by by adding `@some-other-host`.

    if ($3) {
      system ("ssh $3 -t '$cmd'");
    } 

We can also load pre-baked named sessions with [`tmuxp`](https://tmuxp.git-pull.com/).

    else {
      if (-e "$1.tmux.yml") {
        system("which tmuxp && tmuxp load $1.tmux.yml") ;
      }
      system($cmd);
    }

## Chapter 3: Installation

You have roughly four options.

1. `curl http://luchenlabs.com/lp/ecks.pl -o /usr/local/bin/ecks.pl`
2. [Download](ecks.pl.md) the source code in its raw form and "compile" it with [Literati](literati.html)
3. Download the raw source and run it ad-hoc with [Liberate](liberate.html)
4. Download the raw source and use Notepad to fish out the indented bits. (Not recommended. For legacy purposes only.)

## Epilogue

The lazy little code monkey, yours truly, gleefully deleted those nasty three lines from his `aliases`, which had since splintered off from his `.zshrc`, because sometimes we have to settle for `bash`, and that's okay. We can't always have everything we want. But we can try. And as long as we keep on trying, we just might be able to turn this:

```sh
alias x='tmux -2'
alias xn='tmux new-session -s'
alias xa='tmux attach-session -t'
```

Into this:

```sh
alias x='ecks.pl'
```
Which is just what the code monkey [did](https://github.com/Cheezmeister/dotfiles/commit/edda872). And he lived happily ever after.

I hope reading this has given you as much joy as writing it gave me. Perhaps, with time, the keystrokes it saves me will compensate for the fact that I turned a simple, concise Perl script into a sproinking novel.
