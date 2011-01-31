---
title:Nextris
longtitle:Nextris
shorttitle:nextris
genre:Puzzle
description:A Tetris clone with a twist
tech:C++, SDL
screenshot:$root/content/screenshots/nextris.png
--- intro

I started Nextris because I realized and found it appalling that I hadn\'t coded a Tetris clone. <i>Everyone</i> has coded a Tetris clone! Why is mine special, you ask? Well, seeing as it\'s a clone, that's an odd question; but come to think of it, wouldn\'t it be fun to play in a style that allows both classic line clearing as well as by grouping similar colors? Yes. It would. I\'m also aiming to code in such a way that the app doesn\'t require any static content. That means drawing rectangles for all of the graphics and, hopefully, procedurally generated music. Should be fun.

--- downloadinfo
[(Source code)]($root/downloads/nextrisBeta.tar.gz)

[(Windows)]($root/downloads/nextris.exe)

[(Windows Installer)]($root/downloads/InstallNextris.exe)

Nextris is in a state of perpetual beta until I figure out how to add sound! It\'s really hard to find utilities for (terse) procedural tone generation, so if you know of any, let me know before I have to hack something together myself.. Otherwise feel free to tell me what you think of the gameplay.
---

## Controls ##

By default, movement uses WASD and rotation uses the L and P keys (this was developed on a laptop, can you tell?). You can change this by hitting Return/Enter during play and following the instructions in the console, or alternatively editing keyconfig.txt and substituting the appropriate ASCII values (ouch). This was as close as I could come to user-configured controls without bending my no-content restriction.
		
