---
title: Nextris
longtitle: Nextris
shorttitle: nextris
genre: Puzzle
description: A Tetris clone with a twist
tech: C++, SDL, PortAudio
screenshot: $root/content/screenshots/nextris.png
--- 

I started Nextris because I realized and found it appalling that I hadn't coded a Tetris clone. <i>Everyone</i> has coded a Tetris clone! Why is mine special, you ask? Well, seeing as it's a clone, that's an odd question; but come to think of it, wouldn't it be fun to play in a style that allows both classic line clearing as well as by grouping similar colors? Yes. It would. To make things interesting, I'm coding so that the app doesn't require any static content. This means drawing rectangles for all the graphics and playing procedurally generated music. Should be fun.

## Controls ##

By default, movement uses WASD and rotation uses the L and P keys (this was developed on a laptop, can you tell?). You can change this by hitting Return/Enter during play and following the instructions in the console, or alternatively editing keyconfig.txt and substituting the appropriate ASCII values (ouch). This was as close as I could come to user-configured controls without bending my no-content restriction.
	
## Download ##
[(Source code)]($root/downloads/nextrisWithAudio.tar.gz)

[(Windows)]($root/downloads/Nextris-1.0.0-win32.zip)

Now with 100% more sound! I use [PortAudio](http://www.portaudio.com/) to play some beeps and boops, generating a nice, relaxing melody without any premade music resources! Okay, fine, I hardcoded the chords, so shoot me =P I'm incredibly satisfied with how this turned out--give it a shot!

	
