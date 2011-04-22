---
title:Procedural Audio at Last!
date:Apr 13, 2011
author:Cheezmeister
tags:Coding
---

I don't usually allow myself to get consciously proud of my accomplishments, but when I do, *hoo* boy! It feels great! There's nothing more satisfying than the feeling of having created something unique, and it comes when least expected. Several nights ago, mostly out of boredom, I decided to take another crack at procedurally generated music for [Nextris]($root/projects/nextris), an endeavor that's been on the backburner for almost four years. In late 2007, I threw together this Tetris clone, but made it a challenge by avoiding the use of any resources--image files, sounds, scripts, etc. The entire game consists of the executable file. At around 500k, it's got nothing on [.kkrieger](http://www.theprodukkt.com/kkrieger), but I think it looks rather nice, even by Tetris standards. 

Without any sound, I couldn't call it complete; my initial hope was to find something similar to `Beep` from the Windows API (which I'd months prior used with great success to play the Mario theme on high school computers for my senior prank), but I couldn't for the life of me find anything both portable and simple enough, yet low-level enough to generate the sound without some form of prefabricated data. I let the beta sit unfinished until, at a colleague's behest, I was ready to (quote) "nut up and do it myself," and roll my own little system on top of the closest thing to it, [PortAudio](http://www.portaudio.com/).

Getting up and running was easy enough--PortAudio isn't terribly complex, so the install was lickety-split and the tutorial example built without complaint--a breath of fresh air after grappling with Luabind. After acclimating myself to the idea of setting the position of the speaker itself in a callback function, it made sense enough to abstract that part away. I used a simple struct to describe the waveform The app logic can define the tone in terms of frequency and amplitude, and the callback "makes it go" by updating the phase and calculating its value (presently, everything is a sine wave). 

I cheated somewhat by hardcoding a basic i-VI-III-VII chord progression. The bassline rhythm is randomized somewhat based on your score, and clearing blocks plays different pitches based on the current chord. It's a simple tune, but it has an organic feel to it and it's calming, even cathartic. Now that I've seen this long-held idea in action and working, I can't wait to experiment and see what directions it can go in. Here's what I'm thinking--

 - Learning more about waveforms to create more rich-textured sound
 - Layering on more "instruments" as the gameplay gets more intense
 - Go for a feeling of synaesthesia with synced percussion and pulsating graphics
 - Switching up the chord progressions (more ambitious)

Should be fun!

