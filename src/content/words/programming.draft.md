---
title: This is What Programming Language You Should Learn
shorttitle: programming
---

This is What Programming Language You Should Learn
==================================================

A frequent question aspiring coders ask is, "What programming language should I start with?" It's not a *bad* question, but it's not the right one to ask; it belies a few fundamental misunderstandings regarding the science and art of programming:

* Programming is a means to an end. Your motivation for learning to code may not be the same as mine. 
* Programming is a cerebral activity. Brains come in all shapes and sizes, and the [paradigm][] that vibes with me may not vibe with you.
* Learning a programming language and *learning to program* are two very different things. A language is a tiny tiny part of the equation.

When newbs ask for language recommendations, they typically get one of two things. 
The first is something to the effect of "It doesn't matter. Choose one and stick with it." It's not a *bad* answer, and strictly speaking is correct, but it belies a few fundamental misunderstandings in what a beginner is searching for[1].

* Beginners need a place to start, i.e. a direction to go in
* Beginners **have never programmed before** and tend to be only dimly aware of the most popular options, which may not be right for them
* Beginners asking this question are asking for *help*. "It doesn't matter" is not helpful.

The second is someone's personal favourite language, possibly the only one they've ever used, like "Java". This is a bad answer and if you do this, you should feel bad.

The first, less wrong answer has got to be immensely frustrating for newbs who just want to get the ball rolling. Although the question it addresses is a rather poor one, people keep asking, so it is with great trepidation that I endeavor here to actually answer it, to the extent it can be answered, not with a glib response like "JavaScript"[2], but rather with the questions you *should* be asking, along with way more information than you bargained for. Sorry.

The short version: it's more important for a budding coder to gain momentum and have fun doing it than it is to start in the "right" place. However, as time goes on and one's skills improve, one will find that certain patterns of knowledge complement each other more readily (see also: specialist vs. generalist) thus enabling a higher overall problem-solving potential. It is my goal to describe and delineate those patterns--to the extent that I (a generalist, game developer, and open-source fan) understand them.

This article is geared towards people who have never (or rarely) programmed before but who are considering a career or otherwise substantial investment of time into learning to code. I hope it may be useful to those who want to pick up coding for shiggles or perhaps to automate a part of their job, but know that it's not my primary focus.

Without further ado, here's a bigass list of...

Crap Every Programmer Must Learn
--------------------------------

Briefly, and in no particular order:

1. Languages
  - Systems
  - Managed
  - Scripting
  - Data
2. Tools
  - text editor
  - browser
  - OS
  - communications
  - productivity
  - shell
  - version control
  - build
  - deploy
  - monitoring
3. Concepts
  - Control
  - Data
4. Libraries
  - Modules
  - Frameworks
  - Software Development Kits
5. Soft Skills
  - Creativity
  - Communication
  - Prioritization
  - Judgment
  - Discipline
  - Motivation
  - Time management
  - Self diagnostics

You will need to learn each major category in parallel (there's simply no way not to), but within each category I find it best--if possible--to focus on one skill at a time, from a new subcategory each time.
We'll start with the reason you clicked here in the first place.

Languages
---------

We cannot compare different languages without talking about the idea of *high-level* and *low-level* programming. Programming is built around the idea of abstractions. We can make abstractions upon abstractions, and in so doing, we venture into higher levels of programming. Briefly, like a house has a foundation, then walls, then ceilings, then finally a roof, so too we can build programming languages on top of one another, allowing us to do bigger and better things with less and less (human) effort. High-level languages like JavaScript allow us to push the boundaries of computing, but they cannot exist without low-level ones like C.

![Kind of like the sciences](https://imgs.xkcd.com/comics/purity.png)

Programming languages come in four basic flavors: system, scripting, managed, and data. Oh, there are most certainly others, but these are the ones you'll find yourself dealing with from day to day, for reasons that are beyond the scope of this article.

### Systems Programming

The lowest-level type of programming as we typically think of it. Fortran and C are the major examples here, although you won't find Fortran in modern usage, except in highly scientific domains, where it is still among the best at what it does. C++ is a bit of a beast in a category all its own, but may be considered a systems language.

Learning a systems language will empower you to write software that runs not only in browsers or PCs, but in toasters, cars, wearables, and devices that have yet to be invented.

Programming in a systems language is not easy. However, *learning* to program in one is. The relative simplicity of the lower levels means there are fewer nasty surprises outside of your control, but you will wind up writing your own nasty surprises as your projects grow in complexity.

### Managed Languages

Managed languages are those that are designed to run on a [virtual machine][vm], rather than directly on your CPU. They are so named because they *manage* some of the more mundane details of execution (most notably memory allocation), freeing you, the programmer, from fretting about it. There are two such machines in common use today: the [Java Virtual Machine][jvm] which of course powers Java [and its family][jlangs], and the [Common Language Infrastructure][cli], which powers C# [and its ilk][nlangs].

Managed languages are just about as general-purpose as they come. Business and backend software overwhelmingly favor managed languages as they strike a nice balance between performance and coder productivity--that is, between speed of execution and speed of delivery, or if you like, between CPU time and developer time. The tradeoff between machine and human time is an important consideration in modern software development that's rarely taught in the classroom (and beyond our scope here). However, the popularity of managed languages in industry means that a formal education in computing will almost certainly introduce you to them.

[vm]: https://en.wikipedia.org/wiki/Virtual_Machine
[jvm]: https://en.wikipedia.org/wiki/Java_Virtual_Machine
[cli]: https://en.wikipedia.org/wiki/Common_Language_Infrastructure
[nlangs]: https://en.wikipedia.org/wiki/List_of_CLI_languages
[jlangs]: https://en.wikipedia.org/wiki/List_of_JVM_languages

### Scripting Languages

Scripting languages are generally the highest level you'll encounter as a typical programmer, and thus do the most work with the smallest amount of code. Python, Perl, and Lua are some popular examples. They're particularly well-suited to automating human work, such as file renames, sending email, or web crawling, as well as to so-called "glue code" that ties different systems together.

Although flexible and powerful, scripting languages aren't very performant and may take orders of magnitude more CPU time to do the same thing as the same program written in C. Now, much of the time that doesn't matter. But sometimes it does.

### Data Languages

Pedants will point out that data languages aren't, technically, languages--but whatever they are, they're hella useful and you should get familiar with several and be an expert at your favourites.

XML, JSON, and Yaml are examples of data interchange formats. They model "stuff" that can be loaded into your program in many different ways. Each has its strengths and weaknesses, but all are easy to use from any programming language and will save you plenty of headaches over rolling your own format [like my dumb ass once did](/projects/cheezus).

HTML, Markdown, LaTeX are [markup languages](https://en.wikipedia.org/wiki/Markup_language), a special form of data language geared towards writing documents. HTML, of course, is the de facto language of the web and it's hard to be a modern techie without getting at least a little familiar with it. LaTeX on the other hand is geared towards printable documents and is commonly used to produce PDFs. Markdown is a more minimalist format modeled after email conventions but it's become popular with communities like GitHub, Reddit and StackOverflow adopting it for its ease of use. This article was written in Markdown.

Oh and by the way, you can combine markup languages with programming languages if you want to describe a bit of code in detail. That's called [literate programming][wiki] and I think it's mad cool. [Here's a small literate program I wrote.](http://luchenlabs.com/lp/literati).

Concepts
--------

This is the stuff they teach you in college. The reason they teach it in college is because, if they didn't, it would take many years to emerge "naturally" as abstractions upon
concrete lessons learned. The entire space of CS concepts is rather vague, with many grey areas. In my eye, concepts come in two main flavors:

- Control concepts (which give rise to algorithms) such as branching, iteration, recursion, parallelization
- Data concepts (which give rise to design patterns) such as pointers, composition, containers and typing

A programming *[paradigm][]* is a set of both control and data constructs that work reasonably well together and are frequently found snuggling together in the form of a particular language. Functional, procedural, and declarative paradigms are highly influential in modern programming, and although OOP gets all the attention, it's really just a particular formulation of those three. You'll want to master them before you begin to truly grok OOP. I mean, hell, the very definition of a *class* is data plus controlling code.

Coding concepts are inextricably tied to programming languages that embody them, and so it's not feasible to study them "purely", as divorced from languages. Still, you should pay special attention to the concepts exposed in your language of choice, and challenge yourself on occasion to bend a language into using a concept it wasn't designed for.

[paradigm]: https://en.wikipedia.org/wiki/Programming_paradigm

Libraries
---------

Libraries come in many shapes and sizes. At one end of the spectrum we have the module, which is just a small collection of related "stuff" which serves some need. Then we have the "framework", which solves a very particular problem with a large amount of functionality. Frameworks typically make it easy to see fast results at the expense of learning curve, rigidity, and occasionally difficult debugging.

An SDK is a set of software including libraries but might contain compilers, drivers, tools, documentation and/or examples, typically for unusual hardware or other "platforms".

Mastering libraries is, relatively speaking, a poor investment in the long term because they rise and fall as technology progresses--especially the React-Angular-Phaser-Kitchen-Sink Du Jour. That said, you'll want to practice getting *familiar* with new libraries quickly and efficiently, since doing so will allow you to benefit from prior efforts rather than rolling your own every single time. Sometimes rolling your own is the right thing to do, either because you need to do something specific and special, because you know you can do it better than the existing solutions, or just to learn. Sometimes it's not.

Learning to judge which route to go is a crucial skill that comes from lots of trial, error, and failure. I still suck at it.

A few of my favorite libraries, in no particular order, include [SDL], [momentjs], [Joda-Time] and [Cordova]. These offerings solve their respective problems in a reliable, effective, non-intrusive way and are real easy to set up and use.


[SDL]: http://libsdl.org
[momentjs]: http://momentjs.com/
[Joda-Time]: http://www.joda.org/joda-time/
[Cordova]: https://cordova.apache.org/

Tools
-----

### Text Editor

Everybody uses one. You cannot write code without one. Whereas **rich text** like you might encounter in a Word document has formatting tied to it, like bolding, colors and such, plain text is just that: text and nothing more. 

Notepad comes standard with Windows. It is the plainest of plaintext editors. It's a great pick for writing Hello World, but you won't want to be using Notepad for much longer than that. 
  
More powerful editors like Notepad++, TextMate or gedit offer syntax highlighting, automatic formatting, and other goodies that will make your life easier. Go one step further and you'll find editors like SublimeText and Atom, extremely capable tools that let you do things like adding text in several places at a time (multi-cursor), preview HTML or Markdown, or upload snippets to code-sharing websites. They also include features more commonly found in IDEs. This comes at the expense of startup time and memory usage, so if your specs are low you may want to start with a lighter option.

`vim` and `emacs` are very old editors with [a friendly rivalry][]. They run in the terminal, which renders mouse use optional and makes it convenient to edit files on remote machines. They're incredibly versatile but come with a steep learning curve.

[a friendly rivalry]: https://en.wikipedia.org/wiki/Editor_war

### Web Browser

Everybody uses one. Except maybe my grandma, because she's just that hardcore. As more and more of society moves into "the cloud", browsing the web is becoming an increasingly large proportion of how we interact with the world around us. 

Web browsers are incredibly powerful bits of software. They are capable of some interesting things that help you save time and stay focused, if you know how to use them. A favorite of mine, pioneered by Opera (if I'm not mistaken) is the ability to set keyword searches. I can type `w visual studio` into the location bar and instantly pull up the Wikipedia page for Visual Studio. I use Wikipedia a ton, so shaving five seconds off of every wiki search I conduct adds up pretty quickly!

Take the time to learn the ins and outs of your browser of choice, and feel more like [Tony Stark][] and less like [Alice in Wonderland][] on the web.

[Tony Stark]: http://www.rixbanga.com/blog/sites/default/files/styles/article_body/public/field/image/ironman-screen.jpg?itok=_2XWD3VA
[Alice in Wonderland]: https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcThDINbhd0q3Gc6MWBb-TC04Rgv9B8Lsh5yP2vZZFvm5glziPso

### Operating System

Everybody uses one. The main three are, of course, Windows, Mac and Linux (with its hundreds of varieties). Others you might not have heard of include Solaris and Haiku (formerly BeOS).

Entire books could be (have been) written about OSes. It's probably impossible to truly master one (let alone multiple), as complex as modern OSes have become. Still, the more you know the more effective your computing will become, programmer or not. So go ahead and be a power user. Hack on your registry. Symlink your folders. Make your caps lock key do something less offensive. Just remember to go back to your real work at some point.

You may (read: will) come across the term "Unix", which is usually used as an umbrella term for many different OSes that behave a certain way, particularly in the sense of having a `sh`-compatible [Shell](#shell), a certain set of built-in commands, and a file system that starts with a forward slash. Mac (as a type of BSD) and Linux (all of them) are flavors of Unix. Sort of.
[That's not 100% accurate](http://unix.stackexchange.com/questions/4091/is-linux-a-unix), but for all intents and purposes, you can consider Mac and Linux to be cousins, after a fashion.

### Communications

These are the tools you use to keep in touch with friends, family and colleagues. They include email, chat, telephony and various social media clients. As anyone with an overflowing inbox can attest, communication in the information age can be an enormous drain on your time and attention if not managed carefully.

The approach I personally take is to avoid "kitchen sink" tools like Facebook or GMail--these products combine email, chat, and social channels in a rather distracting way, and I wind up looking at cat pictures **again** when all I really needed to do was send a quick message. Instead I use Thunderbird for _all_ my email, Pidgin for _all_ my chat accounts[3] and set aside time for checking social media when I can wander aimlessly and not feel bad.

I _still_ haven't found a decent tool for managing telephony/VoIP. Cell phones are a notch above tin-can-and-string in voice quality, and most desktop tools involve services where you pay to connect to landlines. Voice is my least preferred mode of communication though, so finding a solution here isn't a huge priority.

### Productivity

Your toolbelt for [Getting Things Done®]. Productivity tools help you keep the gears spinning and minimize wasted time. They need not be software, either: todo lists, calendars, and contacts--the three pillars of productivity--have been around in paper form long before the personal computer was a twinkle in Turing's eye--and there's something to be said for no batteries required, too.

These days we've got Trello, Workflowy, Wunderlist, Evernote, the list goes on and on and on (pun intended). And if you can't find a tool compatible with your brain, [it's never been easier to make your own](https://www.google.com/search?q=todo+tutorial).

### Shell

Your interactive command line. At its most basic, a shell is a program that reads commands and invokes other programs.

Usually when people talk about a "shell", they mean a Unix-style shell that follows the conventions pioneered by `sh`, the [Bourne Shell][]. `bash` is probably the most popular of these with the more feature-packed `zsh` a close second. 

Microsoft's Powershell is good in its own right, but Windows-only with a high learning curve. It's head-and-shoulders above `cmd`, though, so if you are invested in (or stuck with) Windows, I'd recommend getting comfortable with it at some point.

If you do find yourself on a Mac or Linux system, try `fish`--the [Friendly Interactive SHell][fish]. It's a more modern take on the classic Unix shell which is less compatible with scripts using "traditional" syntax but offers a more pleasant interactive experience.

[fish]: http://fishshell.com/
[Bourne Shell]: https://en.wikipedia.org/wiki/Bourne_shell

### Version Control System

Also known as SCCS (source code control system) or SCM (source code management), your VCS has your back when your code breaks and you can't remember what changed. A well-wrangled VCS is almost like time travel.

VCSes usually fall under one of two categories: *centralized* (Subversion, Perforce) and *distributed* (git, Mercurial, darcs). Each has its strengths and weaknesses, but you will likely come into contact with both at some time. Notably, centralized systems differentiate between client and server, requiring you to set up a server (or access an existing one) in order to use the system.

Ten years ago, when centralized systems were the norm, it was considered good form to use one, but it was still common to go without, making changes on the fly and perhaps making copies of folders in order to back up valuable work. Today, it's generally agreed upon that everyone should use *some* form of source control, and it's extremely easy to do so--`git init` is all you need to get started.

Most VCSes have some concept of a *repository* (where the code lives), a *commit* (a discrete change in which you are confident and wish to "lock in"), a *revert* (rewinding to a previous version, either because you broke something or to gather historical information). What they are called and how they are handled varies from system to system.

A good VCS makes it easy to *branch* and *merge* your code, easing the burden of keeping track of several different changes (alternate realities?) at the same time.

`git` is easily the most popular VCS today, largely due to GitHub, the free service that uses git to manage (and publish, track, or discuss) code.

### Build Automation

"Building" code can mean many different things. *Compilation* is the process of changing source code into binary--specifically, machine language (or, in the case of managed languages, bytecode). *Minification* means removing whitespace to reduce file size without changing it from plaintext. *Transpilation* changes source code from one language into another.

Build tools tend to be language-dependent for some reason. The one that isn't is also one of the oldest: [make][wiki]. Thugh it's not specific to any one language, it *does* assume a Unix environment, so using it on Windows (while possible) can have mixed results.

You can also use a build service, or if you're the buzzwordy type, a *continuous integration* thingamajangus like Travis or Appveyor that automatically build stuff every time you check it in to your VCS (See, they are useful). 

### Deployment

After you build your code, you'll probably want to deploy it. This might be as simple as zipping it up and uploading somewhere, or as complex as requesting computing resources, provisioning VMs, installing dependencies remotely, running deployment validation tests, and sending an email reporting how long it took to do all this...with no human intervention whatsoever.

Most deploy processes will be somewhere in between, but consider this: the former process might take a human being five minutes but a shell script written in the same amount of time can do it in seconds (with `tar` and `scp` for example); the latter process can take *months* if done manually, or a few hours if automated properly (with some recurring human cost to maintaining the automation setup).

My strategy is to deploy manually at first, then automate gradually those steps that turn out to be repeated.

### Monitoring
  - monitoring
    - corporate environments, mostly
    - Splunk, Grafana etc.
    - Many corps roll their own
### Integrated Development Environment

Some developers prefer to use an IDE like [Eclipse][], [Visual Studio][] or [IDEA][] for the bulk of their work. An IDE combines text editing, build, and other bits necessary to make software. While this doesn't remove the need to learn a text editor, shell, and so on, it lessens the burden by offering a working out-of-the-box setup. 

By tying everything together in a known configuration, IDEs make the dev process more seamless. For example, by integrating a debugger with the inbuilt text editor (something that is possible, but difficult to achieve with standalone tools), an IDE can make following the flow of code through a complex project and pinpointing the exact point of failure into a quick and painless process.

In addition, most IDEs are able to offer advanced features for navigating large codebases (e.g. "find references" or "call hierarchy"), intelligent refactoring ("extract method") and code generation (declaring local variables, creating methods that haven't been defined, or encapsulating fields via accessors). This frees the developer from busy work so they can focus on the bigger picture.

The two main downsides to using an IDE are resource consumption (all that power has to come from somewhere) and sometimes inscrutable error messages (IDEs infer a lot of information relating to the build process and often hide it from the user; sometimes they get it wrong).

The choice to use an IDE can be a controversial topic. It's sort of a lifestyle choice. In my opinion, it makes for a poor learning environment because of all the magic that "just works" until it doesn't. However for large, complex projects using managed languages, they become indispensable for cutting through the chaff.

[Eclipse]: https://en.wikipedia.org/wiki/Eclipse
[Visual Studio]: https://en.wikipedia.org/wiki/Visual_Studio
[IDEA]: https://en.wikipedia.org/wiki/IntelliJ

### Miscellaneous Tools
  - misc
    - VMs for easy OS switching
    - Synergy for multiple boxen
    - tmux/screen for turbocharging your terminal

Soft Skills
-----------

These are skills that aren't specific to programming or to any technical field. Entire books have been written about them. They're among the most valuable skills to develop (since they apply literally everywhere), but are also the most difficult to study; so much so that many (e.g. creativity) one could argue more closely resemble innate talents.

I'm not sure this section truly belongs here, but erring on the side of completeness, here are a few examples of traits you should at least be cognizant of as your journey of code proceeds.

### Creativity

> Talent hits a target no one else can hit. Genius hits a target no one else can see.
> 
> -Arthur Schopenhauer

Don't be satisfied to do a great job--do a great job that has never been done before, because it's so crazy no one even considered it.

### Communication

> If you could be here around nine, that'd be great.
>
> -Bill Lumbergh

Working alone is easy. Working in a team is not. Communicating clearly keeps everybody working in harmony and catches potential problems early. 

### Prioritization

> Put first things first.
>
> -Stephen R. Covey

Yeah, it's tempting to go hack on that sweet particle system, but maybe you should nail down the cause of that horrific crash first so you aren't constantly rebooting your machine in the middle of important work.

### Judgment

> With great power comes great responsibility.

Judgment is hard. Some of it comes from the school of hard knocks, some from the spidey-sense that certain people just have a knack for. Either way, making the right decision, the first time, without succumbing to analysis paralysis, will save you hours, money, and heartache.

### Discipline

> The sense of dignity grows with the ability to say no to oneself.
>
> Abraham Joshua Heschel



### Motivation

> Build your trigger.
>
> -Josh Waitzkin

Sometimes ya just don't wanna get out of bed. [And sometimes that's okay][cat]. But most of the time it's not. Ride the wave when it's there. Make your own when it's not. Whether it be music, exercise, Red Bull, whatever puts you in the zone--get your ass in gear!

[cat]: http://1.bp.blogspot.com/-xkxvWlBydGU/UMQwvrihXtI/AAAAAAAABjI/mUU_Wli7J6M/s1600/Funny+Cat+owner+Reading+on+the+bed_.jpg

### Time management

> Never do today what you can put off until tomorrow.
>
> Aaron Burr, Jr.

Time is a precious thing. 80 years is all most of us get. How you choose to spend it is up to you. Make it count.

### Self diagnostics

> What reason do thinkers have for thinking they think? Is it simply the fact that they think?
>
> Fred Dretske

My personal favorite soft skill. It's an incredibly powerful thing to introspect, identify one's own faults (and strengths!) and change accordingly. This sometimes comes at the expense of a small hit to the ego, but then, you have plenty of ego to spare, because you're just that amazing. Right? Right? Of course you are.


Where to go from Here?
----------------------

If you've read this far, congratulations, you have a longer attention span than I do. Know that whichever path you go down, you'll have fun. My advice--take it for what it's worth--is the following:

Google around. See what's out there. Find software that vibes with you. 

Pick a language. My preference is C, but yours may not be. 

Pick a text editor. My preference is vim, but yours may not be. Write Hello World. Run it. 

Pick a piece of OPC (other people's code). Read it. Build it. Run it. Make it do something else.

Once you feel you have mastered your first programming language and are no longer improving, choose another language *in a different category*. For example, if you started with C, try Lua (these two languages play particularly nicely together). Or if you started with Python, try Forth. 

Do the above also with concepts, and libraries, and especially tools, rotating through the different categories as you build your knowledge and your own personal "utility belt". It's not a wise investment jump ship to vim if you're already happy in another editor; experiment with your first build system instead! The law of diminishing returns and pareto principle guarantee your time will be well-spent by diversifying your learning, using a breadth of experience to guide where you choose to focus on depth.

Try to pay some mind to which technologies will complement each other, but don't stress about it either: the real objective is that, by gaining experience in unfamiliar areas, you begin to see the knowledge you already have in a different light, and it becomes more valuable to you, simply by virtue of reinterpretation. Messing around with functional programming principles, even if you never write a single *useful* line of Haskell, will enable you to approach your more run-of-the-mill problems, be they at work, school, or play, with a more open mind and a stronger palette of solutions.

I think that's pretty freaking cool.

[1] If you are new to coding and find this to be utterly wrong, please let me know why! It's been a while since I was in your shoes. I like to think I remember what it was like, but you can never quite be sure.

[2] I would never recommend JS to a beginner. The language is laden with more traps than a Mayan temple and it trips up seasoned professionals on a daily basis.

[3] I use AIM a lot, still. Nobody else does. I'm not sure why.