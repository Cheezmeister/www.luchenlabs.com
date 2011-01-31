---
title:TuxMath
longtitle:TuxMath
shorttitle:gsoc
description:My main open source activity
genre:Educational
tech:C, SDL, autotools 
screenshot:$root/content/screenshots/gsoc.png
--- intro
*Tux, of Math Command*, or TuxMath for short, is a math tutor game for children based on [Missile Command](http://en.wikipedia.org/wiki/Missile_Command). It is the product of almost a decade of work by a handful of incredibly cool people. I\'ve been involved with TuxMath, and its parent organization [Tux4Kids](http://tux4kids.alioth.debian.org), since Tux4Kids accepted me into [GSoC](http://socghop.appspot.com) for 2008. That summer, I worked on TuxMath, adding two new gameplay modes, a full campaign and a turn-based multiplayer. I also put in support for any resolution display and retooled the backend to be more extensible.

--- downloadinfo
[Windows] [1], [Linux] [2], and [Mac] [3] releases. This is how things looked right before I started messing w - I mean, contributing.

[Git Repository](git://git.debian.org/tux4kids/tuxmath.git): For the latest and greatest code. 

[1]: http://alioth.debian.org/frs/download.php/2442/tuxmath-1.6.3-win32-installer.exe
[2]: http://alioth.debian.org/frs/download.php/2147/tuxmath-1.5.4-1.i386.rpm
[3]: http://alioth.debian.org/frs/download.php/2381/TuxType_w_fonts-1.5.17-MacOS10.3PPC.dmg
---

## What the Heck is GSoC? ##
Summer of Code is a program that Google has run for the past few years aimed to get young people started in open source work. How it works is that interested programmers apply by choosing an open source organization and project that they\'d like to work with, coming up with an idea to improve it and applying to the program by submitting a proposal. The organization then chooses the best ideas, assigns members of the community to serve as mentors, and tells Google to accept those students. Then, over the summer, accepted students write lots and lots of code and interact mainly with their mentors and organization, and Google gives students a stipend for their work. So, although it\'s not actually working for Google, they are flipping the bill and get mad props.

## News ##
I\'m a student again for 2010! This time around I\'m tackling the far less
glamorous task of factoring out code common to TuxType and TuxMath into a
shared library, libt4k_common. Previously, the two apps benefited from each
other largely by copy-paste. Ouch!

I\'m a mentor for 2009! How the heck did that happen? 

