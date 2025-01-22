---
title: Good Talk
shorttitle: goodtalk
date: January 6 2025
tags: [AI, LaLaMo, Technical]
---

This is an experiment. I don't know if it's a good idea. I suppose I'll find out.

Below are selected conversations I've had with [LaLaMo](https://www.linkedin.com/posts/cheezmeister_genai-rememberthelalamo-activity-7253748321385693184-7IeF)s that I felt valuable and worth sharing.

<article class="llalamo-chat">

# Factor Me, Baby, 2^18 Times...

<section class="commentary">
After formal training in CompSci and 15 years in the field, I had still never heard the name Tom Kilburn.
</section>

Tom Kilburn played a pivotal role in the early development of computers, particularly in the creation of the first stored-program computer. In 1948, Kilburn led the development of the Small-Scale Experimental Machine (SSEM), nicknamed "Baby," at the University of Manchester[1][5]. This machine was the first to successfully run a stored program on June 21, 1948[1][12].

    The program Kilburn wrote to test the SSEM was designed to find the highest factor of a number. Initially, they used a small number, but within days, they were able to run the program on 2^18. This computation took 52 minutes and involved about 2.1 million instructions with approximately 3.5 million store accesses[1].

    ## Early Mainframe Computers

    The success of the SSEM led to the development of more powerful and practical machines. The Manchester Mark I, commissioned by the government and also led by Kilburn, was completed by November 1948[1]. This marked the beginning of a new era in computing.

    Mainframe computers, as mentioned, were indeed massive machines that filled entire rooms. The Harvard Mark 1, also known as the IBM Automatic Sequence Controlled Calculator (ASCC), is considered the first mainframe computer. It was over 50 feet wide and 8 feet tall[3].

    ## Evolution of Computing Power

    The progression from the SSEM to modern computers is remarkable:

    1. The SSEM had a 32-bit word length and used Williams Tubes for memory[12].
    2. By 1951, the first commercial mainframe, UNIVAC, was built by the Eckert-Mauchly Computer Corporation[7].
    3. In 1953, IBM introduced its Model 701 Electronic Data Processing Machine, which was 25 to 50 times faster than its predecessors[7].
    4. The IBM System/360, launched in 1964, became the industry standard within two years[7].

    ## Managing Complex Systems

    As computers grew more powerful, so did the complexity of software projects. The IBM System/370-165, used by Bosch in 1971, could run 15 programs simultaneously and had a storage capacity of 1 million bytes (1 MB)[13]. This increase in capability necessitated new approaches to software management and development.

    The evolution from Kilburn's 17-instruction program to complex software systems running on mainframes highlights the rapid advancement in computing technology and the growing need for effective project management in software development.

    Citations:
    [1] http://scihi.org/tom-kilburn-stored-program-computer/
    [2] https://aqueductpress.blogspot.com/2024/10/the-first-computer-program.html
    [3] https://www.allaboutcircuits.com/news/the-evolution-of-the-mainframe-computer-to-ibms-latest-z16/
    [4] https://www.mub.eps.manchester.ac.uk/science-engineering/2019/06/20/happy-birthday-baby-tom-kilburn-and-a-new-era-of-computing/
    [5] https://computerhistory.org/profile/tom-kilburn/
    [6] https://curation.cs.manchester.ac.uk/computer50/www.computer50.org/mark1/prog98/ssemref.html
    [7] https://www.ibm.com/think/topics/mainframe
    [8] https://cacm.acm.org/opinion/tom-kilburn/
    [9] https://www.britannica.com/biography/Tom-Kilburn
    [10] http://www.billp.org/baby.pdf
    [11] https://www.computerhistory.org/revolution/mainframe-computers/7/166
    [12] http://www.computer-timeline.com/timeline/frederic-williams-and-tom-kilburn/
    [13] https://www.bosch.com/stories/ibm-mainframe-computer-history/
    [14] https://www.scienceandindustrymuseum.org.uk/objects-and-stories/baby-and-modern-computing
    [15] https://en.wikipedia.org/wiki/Manchester_Baby
</article>


<article class="llalamo-chat">

# Oh... Oh, you can just *do that*

<section class="commentary">

The answer below is largely incorrect, not very interesting nor useful, and should be considered slop. Please do not ingest it. The interesting thing is that you can actually just pipe `stdin` into a LaLaMo, which may seem obvious, but it wasn't to me...until, well, it suddenly was.

</section>

<section class="chat">

```console
% echo "Please explain the following 'git diff' output and tell me what changed:" ; git d | ollama run llama3
```

This is a Git diff output for the file `package.json`. It shows the changes made to the file, including added, modified, and deleted entries.

Here's a breakdown of the contents:

1. The first section is an introduction to the diff format.
2. The next sections show the differences between two commits or versions. Each section has three parts:
        * The package name (`wrap-ansi-cjs`, `wrap-ansi`, etc.)
        * The version number and resolution information (e.g., `version: 7.0.0` and `resolution: "wrap-ansi@npm:7.0.0"`).
        * A checksum value, which is a unique identifier for the package.
3. The `languageName` field indicates that this package is written in Node.js.
4. The `linkType` field is set to either `hard` or `soft`. This determines how the package is linked in the package manager (e.g., npm).

Some notable packages in this list include:

* `wrap-ansi-cjs`: A wrapper around the `wrap-ansi` package, which provides ANSI escape codes for formatting text.
* `wrappy`: A utility package that provides a simple way to wrap and unwrap strings.
* `yallist`: A lightweight implementation of arrays with some additional features.

The last section shows dependencies for the `www.luchenlabs.com@workspace:.` package. This is likely a custom or local package, as indicated by the `languageName: unknown` field.

</section>
</article>

<article class="llalamo-chat">

# How Do I Git Revert Thee? Let me Count the Ways

<section class="commentary">
        
To the best of my knowledge, the below is true and accurate. Please [tell me](mailto:MY_FIRST_NAME@luchenlabs.com?subject=Fake%20News%20Alert&body=FIXME) if it's not (indicate which part, and [drop this link](./)).

</section>

<section class="chat">

```
>>> hey chat!
Hey there! It's great to chat with you! How's your day going so far?
[GIN] 2025/01/06 - 20:26:15 | 200 |  8.867789416s |       127.0.0.1 | POST     "/api/chat"


>>> If I made a git commit in error, what are the primary ways to undo the commit?
I can revert, reset, or checkout the previous commit.
All will achieve my goals in slightly different ways.
Please give some sample git commands to undo a commit, and explain how they work.
```

The joys of Git! Don't worry, I'm here to help you understand the differences between `revert`, `reset`, and `checkout` when it comes to undoing a commit.

**Revert**
----------------

When you run `git revert <commit_hash>`, you're creating a new commit that undoes the changes made in the original commit. This is useful if you want to keep the history intact, but still want to
correct the mistake.

Example:
```bash
git revert HEAD~1  # Revert the last commit (HEAD~1 refers to the parent of HEAD)
```
In this case, `HEAD` points to the most recent commit, and `HEAD~1` refers to its parent. The new commit will have a "revert" message indicating that it's undoing the previous commit.

**Reset**
----------------

`git reset <commit_hash>` is used to move the current branch pointer (HEAD) to a specific commit, effectively discarding any changes made since then. This is useful if you want to start over from a
previous point in your history.

Example:
```bash
git reset HEAD~1  # Move the branch pointer to the parent of the last commit
```
When you run `git reset`, it will:

* Update the branch pointer (HEAD) to the specified commit.
* Discard any changes made since then, including uncommitted files and commits.
* If you have untracked files, they will still be present.

**Checkout**
----------------

`git checkout <commit_hash>` is used to switch your working directory to a specific commit. This is useful if you want to explore an earlier version of your project or undo a commit without creating a
new one.

Example:
```bash
git checkout HEAD~1  # Switch to the parent of the last commit (HEAD~1)
```
When you run `git checkout`, it will:

* Update your working directory to match the specified commit.
* Discard any changes made since then, including uncommitted files and commits.
* If you have untracked files, they will still be present.

Key differences:

* `revert` creates a new commit that undoes the original one, preserving history.
* `reset` moves the branch pointer to a specific commit, discarding changes made since then.
* `checkout` switches your working directory to a specific commit, but doesn't update the branch pointer (HEAD).

In summary:

* Use `revert` if you want to keep the history and create a new commit that undoes the mistake.
* Use `reset` if you want to start over from an earlier point in your history, discarding changes made since then.
* Use `checkout` if you just want to explore or undo a commit without creating a new one.

Now, go forth and master the art of Git!

```
[GIN] 2025/01/06 - 20:32:18 | 200 |         1m24s |       127.0.0.1 | POST     "/api/chat"
```
</section>

</article>

