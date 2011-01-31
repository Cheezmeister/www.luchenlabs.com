---
title:Spheres of Influence
longtitle:Spheres of Influence
shorttitle:spheres
description:My current pet project
genre:3D Puzzle
tech:C++, SDL, OpenGL, Luabind, wiiuse, CMake
screenshot:$root/content/screenshots/spheres.png
--- downloadinfo
SOI is hosted on Sourceforge, so you can either grab releases or check the code out from Subversion.

[Spheres of Influence](http://sourceforge.net/projects/soi)

[SVN Repository](http://soi.svn.sourceforge.net/svnroot/soi)

--- intro

Spheres of Influence is just what it sounds like: a bunch of spheres floating around in space and influencing each other in different ways. This includes attracting, repelling, sticking, bouncing, and so on and so forth. The objective is generally to move a unique \"Focusphere\" to a goal by controlling how it enters the level, placing/moving other spheres prior to launching, and/or influencing its movement after launch.

There are a couple of advantages to a game of this type: 

- A handful of simple, well-defined sphere behaviors are easy to design and implement, but can be combined in creative ways for a wide variety of level designs. 
- Using graphics comprised entirely of spheres means that there's no need for art or modelling, yay!
- It hasn't been done before, or if it has, I'm missing out!

---

### Development ###

After toying around with this idea for quite some time, I finally decided to make the commitment to implement it. I kicked it off as the quarter-long project in Computer Graphics II. The scope of the quarter was to get the preliminaries out of the way, i.e. a robust engine, sane development environment and lots of PR. By the end of the quarter, we had solid cross-platform support, first-person motion and an interactive demo of different visual effects (it's a graphics course, after all). From there it's been all about gameplay.

## News ##

[Version 1.1](http://sourceforge.net/projects/soifiles/soi-0.1/) is now available for Linux and Windows. This version includes all my summer work: gravity spheres (particles) and "billiard" spheres that don't quite behave correctly. There's also some UI fixes, so check it out!

