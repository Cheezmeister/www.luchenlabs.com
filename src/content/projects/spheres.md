---
title: Spheres of Influence
longtitle: Spheres of Influence
shorttitle: spheres
description: Procedural rube-goldberg puzzle...IN SPACE.
genre: 3D Puzzle
tech: C++, SDL, OpenGL, Luabind, wiiuse, CMake
screenshot: /assets/images/screenshots/spheres.png 
windows: http://sourceforge.net/projects/soi/files/soi-0.1/
mac: unsupported
nix: http://sourceforge.net/projects/soi/files/Spheres%20of%20Influence-0.1.2-Linux.tar.bz2/download
sauce: http://soi.svn.sourceforge.net/svnroot/soi
status: hiatus
statuschar: ✖
---

Spheres of Influence is just what it sounds like: a bunch of spheres floating around in space and influencing each other in different ways. This includes attracting, repelling, sticking, bouncing, and so on and so forth. The objective is generally to move a unique "Focusphere" to a goal by controlling how it enters the level, placing/moving other spheres prior to launching, and/or influencing its movement after launch.

There are a couple of advantages to a game of this type: 

- A handful of simple, well-defined sphere behaviors are easy to design and implement, but can be combined in creative ways for a wide variety of level designs. 
- Using graphics comprised entirely of spheres means that there's no need for art or modelling, yay!
- It hasn't been done before; or if it has, I'm missing out!

![Screenshot](/assets/images/screenshots/spheres.png)

### Development ###

After toying around with this idea for quite some time, I finally decided to take the dive and implement it. I kicked it off as the quarter-long project in Computer Graphics II. The scope of the quarter was to get the preliminaries out of the way, i.e. a robust engine, sane development environment and lots of PR. By the end of the quarter, we had solid cross-platform support, first-person motion and an interactive demo of different visual effects (it's a graphics course, after all). From there I took a more relaxed pace toward
fleshing out gameplay. Before long it became clear that I'd bitten off more than I could chew again. Between gaping in horror at the mess I'd written in my haste to get something playable out the door, realizing how much I still have yet to learn about GL and C++, and simply wanting to trim some of the more low-hanging fruit off of my backlog of WIPs, I'm putting SOI officially on hiatus. I'll pick it up again at some point, and it will most likely be a rewrite, so let's call this a successful prototype rather than a fizzled effort!

## Download
SOI is hosted on Sourceforge, so you can either grab releases or check the code out from Subversion.

[Spheres of Influence](http://sourceforge.net/projects/soi)

[SVN Repository](http://soi.svn.sourceforge.net/svnroot/soi)

