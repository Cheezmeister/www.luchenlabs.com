---
title: JavaScript's Evolution in a Nutshell
description: Basically Game of Thrones
shorttitle: jshistory
date: 2019-03-26
tags: [technical]
---

# JavaScript's Evolution in a Nutshell: Basically Game of Thrones

## 1995: [Early Days][1]
  - In the beginning, Brendan Eich hacked together "Mocha" in ten days. 
  - It was originally conceived as a Scheme port for Navigator. This was the job he was hired to do.
  - Netscape decided it wanted to be like the cool kids and requested a Java-y veneer over Mocha's lispy guts
  - In December, Mocha-cum-LiveScript was renamed to JavaScript, arguably for marketing purposes

## 1996: [Spread][2]
  - Microsoft embraced and extended JavaScript for IE (and also IIS), birthing JScript
  - At the same time it introduced VBScript, but we won't talk about that
  - In November, Netscape submitted JS to Ecma International for standardization

## 1997-2000: [Standardization][3] and [The Dust Settles][4]
  - In June '97, ECMAScript first edition is finalized as ECMA-262
  - A year later, in June '98, ES2 is released. CSS level 2 was published in May
  - The DOM is introduced in October. It also sucks, but allows JS to manipulate the document tree directly instead of just injecting html
  - Senate acquits Bill Clinton, ending the Lewinsky/Starr impeachment story arc
  - December '99, ES3 is finalized. It would not see another standards revision for the next decade.
    - n.b. ES4 *does not exist*. ES3.1, its competitor is what effectively became ES5 (aka the last bastion of `var`)

## Early 2000s: [The Wild West Era][5]
  - Popups, script-kiddies, and clipboard-driven-development
  - Microsoft wins the first Browser War, Netscape is reborn as Mozilla Phoenix (the precursor to Firefox)
  - During this time, the CSS standard also continues to languish, leaving many behaviours up to the implementation
  - XHTML gains popularity to avoid the tag soup problem
  - JavaScript's monumental suckage contributes to Macromedia (later Adobe) Flash gaining ground
  - Douglas Crockford popularizes JSON

## Late 2000s: [Making it suck less][6] 
  - 2006: John resig publishes jQuery and changes the game forever
  - 2006: XmlHTTPRequest is introduced; AJAX becomes a thing
  - 2008: 
    - Crockford publishes [JavaScript: The Good Parts](https://c1.staticflickr.com/5/4066/4704268314_bb0e9d0ff3_b.jpg)
    - Google open-sources its V8 engine
    - HTML5 is introduced
    - Ruby on Rails explodes in popularity
  - 2009
    - ES5 (and with it, JSON) is *finally* standardized
    - Node.js, based on V8 engine, frees JS from the browser
    - Jeremy Ashkenas introduces Underscore and CoffeeScript
  - 2010: 
    - NPM is introduced
    - Backbone, Express, Angular kick off web framework proliferation
    - MEAN stack is conceived as the hipster's answer to LAMP

## Early 2010s: [Stacks on stacks on stacks][6]
  - More frameworks: Ember, Knockout, Meteor, Wakanda, script.aculo.us
  - Browserify pioneers module bundling, uglify nukes whitespace, Grunt automates it all, and Gulp does it better
  - Webpack is introduced and does all of the above
  - Evan Czapliki introduces Elm shortly before Facebook introduces React (and Vue stumbles in drunk)
  - ES6, while not finalized, gains wide early adoption due to strong browser support and transpilers

## Modern Era:
  - ES6 aka ES2015 drops to much applause and starts a yearly revision cadence
  - It's all downhill from here


[1]: http://speakingjs.com/es5/ch04.html
[2]: https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/scripting-articles/ms974588(v=msdn.10)#jscript-net
[3]: http://www.ecma-international.org/publications/standards/Ecma-262.htm
[4]: https://web.archive.org/web/20170427220310/http://www.digital-web.com/articles/the_document_object_model/
[5]: https://youtu.be/-C-JoyNuQJs
[6]: http://speakingjs.com/es5/ch25.html
[7]: https://html9responsiveboilerstrapjs.com/
