This is What Programming Language You Should Learn
==================================================

A frequent question programming newbies ask is, "What programming language should I start with?" It's not a *bad* question, but it's not the right one to ask; it belies a few fundamental misunderstandings regarding the science and art of programming:

* Programming is a means to an end. Your motivation for learning to code may not be the same as mine. 
* Brains come in all shapes and sizes, and the [paradigm][] that vibes with me may not vibe with you.
* Learning a programming language and *learning to program* are two very different things. A language is a tiny tiny part of the equation.

When newbs ask for language recommendations, they typically get one of two things. 
The first is something to the effect of "It doesn't matter. Choose one and stick with it." It's not a *bad* answer, and strictly speaking is correct, but it belies a few fundamental misunderstandings in what a beginner is searching for[1].

* Beginners need a place to start, i.e. a direction to go in
* Beginners **have never programmed before** and tend to be only dimly aware of the most popular options, which may not be right for them
* Beginners asking this question are asking for *help*. "It doesn't matter" is not helpful.

The second is someone's personal favourite language, possibly the only one they've ever used, like "Java". This is a bad answer and if you do this, you should feel bad.

The first, less wrong answer has got to be immensely frustrating for newbs who just want to get the ball rolling. Although the question it addresses is a rather poor one, people keep asking, so it is with great trepidation that I endeavor here to actually answer it, to the extent it can be answered, not with a glib response like "JavaScript"[2], but rather with the questions you *should* be asking, along with way more information than you bargained for. Sorry.

This article is geared towards people who have never (or rarely) programmed before but who are considering a career or otherwise substantial investment of time into learning to code. I hope it may be useful to those who want to pick up coding for shiggles or perhaps to automate a part of their job, but know that it's not my primary focus.

Here's a bigass list of...

Crap Every Programmer Must Learn
--------------------------------

Briefly, and in no particular order:

1. Languages
2. Tools
3. Concepts
4. Libraries
5. Soft Skills

We'll start with the reason you clicked here in the first place.

### Languages

We cannot compare different languages without talking about the idea of *high-level* and *low-level* programming. Programming is built around the idea of abstractions. We can make abstractions upon abstractions, and in so doing, we venture into higher levels of programming. Briefly, like a house has a foundation, then walls, then ceilings, then finally a roof, so too we can build programming languages on top of one another, allowing us to do bigger and better things with less and less (human) effort. High-level languages like JavaScript allow us to push the boundaries of computing, but they cannot exist without low-level ones like C.

![Kind of like the sciences](https://imgs.xkcd.com/comics/purity.png)

Programming languages come in four basic flavors: system, scripting, managed, and data. Oh, there are most certainly others, but these are the ones you'll find yourself dealing with from day to day, for reasons that are beyond the scope of this article.

#### Systems Programming

The lowest-level type of programming as we typically think of it. Fortran and C are the major examples here, although you won't find Fortran in modern usage, except in highly scientific domains, where it is still among the best at what it does. C++ is a bit of a beast in a category all its own, but may be considered a systems language.

Learning a systems language will empower you to write software that runs not only in browsers or PCs, but in toasters, cars, wearables, and devices that have yet to be invented.

Programming in a systems language is not easy. However, *learning* to program in one is. Both stem from the fact that the lower levels have no frills. It ain't pretty, but there's less to trip over.

#### Managed Languages

Managed languages are those that are designed to run on a [virtual machine][vm], rather than directly on your CPU. They are so named because they *manage* some of the more mundane details of execution (most notably memory allocation), freeing you, the programmer, from fretting about it. There are two such machines in common use today: the [Java Virtual Machine][jvm] which of course powers Java [and its family][jlangs], and the [Common Language Infrastructure][cli], which powers C# [and its ilk][nlangs].

Managed languages are just about as general-purpose as they come. Business and backend software overwhelmingly favor managed languages as they strike a nice balance between performance and coder productivity--that is, between speed of execution and speed of delivery, or if you like, between CPU time and developer time. The tradeoff between machine and human time is an important consideration in modern software development that's rarely taught in the classroom. However, the popularity of managed languages in industry means that a formal education in computing will almost certainly introduce you to them.

#### Scripting Languages

Scripting languages are generally the highest level you'll encounter as a typical programmer, and thus do the most work with the smallest amount of code. Python, Perl, and Lua are some popular examples. They're particularly well-suited to automating human work, such as file renames, sending email, or web crawling, as well as to so-called "glue code" that ties different systems together.

A key strength of scripting languages is not relying on a compiler, IDE, or any sort of biuld system. You just write a couple of lines and it's off to the races.

Although flexible and powerful, scripting languages aren't very performant and may take orders of magnitude more CPU time to do the same thing as the same program written in C.

#### Data Languages

- DSLs

### Concepts

This is the stuff they teach you in college. The reason they teach it in college is because, if they didn't, it would take many years to emerge "naturally" as abstractions upon
concrete lessons learned. Even writing this section is a challenge, because the entire space of CS concepts is rather vague, with many grey areas. In my eye, concepts come in two main flavors:

- Control concepts (which give rise to algorithms)
- Data concepts (which give rise to design patterns)

A programming *[paradigm][]* is a set of both control and data constructs that work reasonably well together and are frequently found snuggling together in the form of a particular language. Functional, procedural, and declarative paradigms are highly influential in modern programming, and although OOP gets all the attention, it's really just a particular formulation of those three. You'll want to master them before you begin to truly understand OOP. I mean, hell, the very definition of a *class* is data plus control. I'm sure this section will be controversial to some, but I'm firmly of the opinion that OOP is overused, overrated, and overemphasized in the classroom.

Coding concepts are inextricably tied to programming languages that embody them, and so it's not feasible to study them "purely", as divorced from languages. Still, you should pay special attention to the concepts exposed in your language of choice, and challenge yourself on occasion to bend a language into using a concept it wasn't designed for.

[paradigm]: https://en.wikipedia.org/wiki/Programming_paradigm

### Libraries

Gosh, where to start? Libraries come in many shapes and sizes. At one end of the spectrum we have the module, which is just a small collection of related "stuff" which serves some need. Then we have the "framework", which solves a very particular problem with a large amount of functionality. Frameworks typically make it easy to see fast results at the expense of learning curve, rigidity, and occasionally difficult debugging.

An SDK is a set of software including libraries but might contain compilers, drivers, tools, documentation and/or examples. Typically for unusual hardware or other "platforms"

### Tools
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

### Soft Skills

Sometimes known as interpersonal skills, though many, like discipline, are anything but. Soft skills cannot really be taught, [though][gtd] [some][fine] [try][taol]. They simply arise out of practice at volume, or else from innate talent.


[gtd]: Getting Things Done
[fine]: The Fine Art of Small Talk
[taol]: The Art of Learning

Where to go from Here?
----------------------

If you've read this far, congratulations, you have a longer attention span than I do. And you should know that whichever path you go down, you'll have fun. My advice--take it for what it's worth--is the following:

Pick a language. My preference is C, but yours may not be. Pick a text editor. My preference is vim, but yours may not be. Write Hello World. Run it. Pick a piece of OPC (other people's code). Read it. Build it. Run it. Make it do something else.

Once you feel you have mastered your first programming language and are no longer improving, choose another language *in a different category*. For example, if you started with C, try Lua (these two languages play particularly nicely together). Or if you started with Python, try F#.

Do the above also with concepts, and libraries, and especially tools, rotating through the different categories as you build your knowledge and your own personal "utility belt". It's not a wise investment jump ship to vim if you're already happy in another editor; experiment with your first build system instead! The law of diminishing returns and pareto principle guarantee your time will be well-spent by diversifying your learning, using a breadth of experience to guide where you choose to focus on depth.

Try to pay some mind to which technologies will complement each other, but don't stress about it either: the real objective is that, by gaining experience in unfamiliar areas, you begin to see the knowledge you already have in a different light, and it becomes more valuable to you, simply by virtue of reinterpretation. Messing around with functional programming principles, even if you never write a single *useful* line of Haskell, will enable you to approach your more run-of-the-mill problems, be they at work, school, or play, with a more open mind and a stronger palette of solutions.

I think that's pretty freaking cool.

[1] If you are new to coding and find this to be utterly wrong, please let me know why! It's been a while since I was in your shoes. I like to think I remember what it was like, but you can never quite be sure.
[2] I would never recommend JS to a beginner. The language is laden with more traps than a Mayan temple and it trips up seasoned professionals on a daily basis. It is, however, p retty damn handy and would make a fine second language.
