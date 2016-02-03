## Presenting the Not Shitty Switch Case Syntax

Let's talk about language features that suck. Let's talk about switch-case.

Switch-case is good for one thing: reducing typing versus a long chain of similar if/else statements. It's a DRY thing. If I have some preposterously long expression like this...

```c
    if (bigAssTruck * series(0f, TUBES) == INTERNET) {
      doStuff();
    } else if (bigAssTruck * series(0f, TUBES) == CONNECTIONS) {
      doOtherStuff();
    } else if (bigAssTruck * series(0f, TUBES) == CONSUMERS) {
      doMoreStuff();
    }
```

...I don't want to be typing it for every value I need to compare it against. Sure, I could assign it to a local, but come on, really? Who does that? Not this guy. Enter switch-case. With this syntax, I can type my huge honkin' expression and use it *implicitly* for each of my cases. So, as you already know from your freshman CS class, you get something like this...

```c
    switch (bigAssTruck * series(0f, TUBES) == INTERNET) {
      case INTERNET: doStuff(); break;
      case CONNECTIONS: doOtherStuff(); break;
      case CONSUMERS: doMoreStuff(); break;
    }

That's an improvement, right? Well, sort of. There are still those breaks there ruining teh party, bringing down the vibes. And what if, instead of a loooong expression, I only needed to compare, say, 'x'?
Hint: "x ==" and "case" have the same number of characters. Beginners (and sometimes experts) tend to have a habit of using switch-case wherever there are repetitive if clauses, but the benefit's just not really there.

Okay, well what about fallthrough? You can't do THAT with an if tree! Let's get one thing straight. It is NOT good for fallthrough, because you don't use fallthrough. Nobody uses fallthrough. Ever. Unless your name is [Tom Duff](http://en.wikipedia.org/wiki/Duff%27s_device), we don't go near that messy business in anything that could remotely be called production code. Got it? Good.

There is an exception to my visceral fear of fallthrough, and that's for cases (no pun intended) like this:

```c
    switch (yoMomma->so) {
      case FAT:
      case DUMB:
      case UGLY:
        str = "Yo momma's so " + yoMomma->so + ", when she " + yoMomma->verb + ", the whole " + yoMomma->breaks + " breaks.";
      case NICE:
      case SWEET:
      case COOL:
        str = "Dude, your mom is like the " yoMomma->so "est mom in the history of moms.";
    }
```

Right. Long-ass expressions. That's about it. Because of the repetition of "case" and "break", not to mention the extra lines and indentational nightmare, switch-case often outweights its usefulness with sheer awkwardness. 

How about trimming the fat on the awkwardness, and building the awesomeness? Check this out


switch (x * y + someLongAssExpression() % (2 + 4 + 36)) {
  @(1): doThis();
  @(2): {
    doThat();
    doTheOther();
  }
  @{3, 4, 5, 7}: doSomethingElse();

  default: {
    exit();
  }
}


For any C-like language. So elegant. I have no idea what the grammar for that would look like, but how hard could it be?


