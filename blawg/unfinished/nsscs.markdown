## Presenting the Not Shitty Switch Case Syntax

Switch-case is good for one thing: reducing typing versus a long chain of similar if/else statements. It's a DRY thing. It is NOT good for fallthrough, because you don't use fallthrough, and nobody uses fallthrough. Got it? Good.

Beginners (and sometimes "experts") tend to have a habit of using switch-case for things it's not good at, such as any chain of if/else comparing the same thing. Hint: "x ==" and "case" have the same number of characters.

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


