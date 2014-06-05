---
title:Haskelling!
date:June 14, 2010
author:Cheezmeister
tags:Coding
---

I've been tooling with Haskell more often lately, and I think I've nailed down
what it is that's so mindblowing--that is, both neat and esoteric--about it: the
syntax. 

As a pure functional language, it's pretty much a given that Haskell inherits
from Lisp. Syntactically, though, it borrows only in the loosest sense. First
and foremost, those awful parentheses make themselves scarce. Whereas calling
some function expressed as "foo of 3" composed with bar would look quite 
ugly: `((foo 3) (bar arg))`

An equivalent call in Haskell is simply: `foo 3 $ bar arg`

This is probably my personal favorite bit of Haskell: using $-operators to 
denote where arguments to a function begin. Essentially, it accomplishes the 
same thing as parentheses, with the important distinction that it's quite
readable, even for complicated expressions without indentation.

Now, what all of this means for us interested coders is that there's a lot to
memorize. You simply can't deduce what the cash symbol does by looking at some
examples, you have to find out explicitly; but because of all the specialized
syntax, there is always [more than one way to do it]
(http://en.wikipedia.org/wiki/There%27s_more_than_one_way_to_do_it) and you
can express complex, dynamic, introspective magic--stuff that would be a
garbled maelstrom of parentheses in a more orthogonal syntax--in a notation that's clear
and terse. Clear and terse, of course, to proficient Haskellers. 
