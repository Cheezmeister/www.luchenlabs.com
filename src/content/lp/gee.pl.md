#!/usr/bin/env liberate perl # [Huh?](https://en.wikipedia.org/wiki/Shebang)

[View Source](gee.pl.md)
[Download](gee.pl)

    #!/usr/bin/env perl
    use warnings;
    use strict;

# Gee: Snappy Web Search from the Terminal

This is a work in progress allowing me to run ad-hoc web searches from the
terminal, similar to the "keyword search" most browsers let you perform. 

# Usage

`ecks.pl <engine keyword> <search terms>`

For example, `ecks.pl z playstation 4` would search Amazon for Playstation 4 listings.

## Engine Keywords

Right now there are just a handful. I'll add more when I feel like it.

Keyword | Engine    
--------|------------------
`g `    | Google           
`d `    | DuckDuckGo       
`w `    | Wikipedia        
`so`    | StackOverflow    
`wa`    | WolframAlpha     
`z `    | Amazon           
`t `    | Google Translate 

# Installation

`curl http://luchenlabs.com/lp/gee.pl -o /usr/local/bin/gee.pl`

You can optionally use shell aliases to your liking. Examples:

* ```
$ alias google='ecks.pl g'
$ google Donald Trump`
```
* ```
$ alias math='ecks.pl wa'
$ math 4 + 5
```

I just `alias G=gee.pl` and leave it at that.

# Implementation

## Search Engines

Add your own.

    my %search_engines = (
      'd' => 'https://duckduckgo.com/?q=%s',
      'g' => 'https://google.com/q=%s',
      'w' => 'https://en.wikipedia.org/wiki/Special:Search?search=%s',
      'so' => 'https://stackoverflow.com/search?q=%s'
      'wa' => 'https://wolframalpha.com/input?i=%s',
      'z' => 'https://www.amazon.com/exec/obidos/external-search/?field-keywords=%s'
      't' => 'https://translate.google.com/#%s/%s/%s'
    );

## Open Command

Modern OSes support directly opening URLs from the terminal, which makes me happy.

Under Linux this is usually `xdg-open`. For Windows, `start` or `cygstart`.  In an unusual turn of events, MacOS actually does the logical thing and calls it `open`.

    my %open_commands = (
      'linux' => 'xdg-open',
      'MSWin32' => 'start',
      'cygwin' => 'cygstart',
      'darwin' => 'open',
    );

## Execution

Grab the engine keyword from command line args.

    my $keyword = shift;

`$^O` reports the OS Perl is running under. If we were, hypothetically, to ask Perl
to `use English`, it'd be called `$OSNAME`, but that's far too intelligible, so we won't.

    my $opener = $open_commands{$^O};

Choose the right URL template from the keyword passed in. In case you forgot, they're listed [up there](#search-engines).

    my $the_url = $search_engines{ $keyword };

The `t` engine for Google Translate is special. It has more than one substitution spot to handle the source and target languages. So,
for example, to translate "pantalones" from Spanish to German I'd type `gee.pl t es de pantalones`.

To handle this use case, we substitute terms one by one until there is one `%s` left. Everything else gets stuffed in there.

    $the_url =~ s/%s/shift/e until scalar (() = $the_url =~ /%s/gi) <= 1;

Grab the search term from remaining args.

    my $search = join ' ', @ARGV;

Smack the search term into the URL and tell the system to take us there.

    $the_url =~ s/%s/$search/;
    exec "$opener '$the_url'"

# But Why?

If you think about it, a browser's address bar is basically a command line. 
This little script is a small step towards removing seams from two of the environments
I spend an inordinate amount of time in.

