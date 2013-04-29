I love zenburn! I especially love that there are so many 
[ports](http://slinky.imukuppi.org/zenburnpage/) 
of it for different editors, shells, styles, and so on. Unfortunately, there's not much 
consistency in these ports, so I decided to throw my favorites on this page to keep things all in one place. 

Most of these can be found elsewhere, so I won't call this original work,
but I'm lazy so I won't give individual credit. You can find that out [easily enough](http://slinky.imukuppi.org/zenburnpage/).

Thanks in particular to Jani Nurminen for `zenburn.vim`, Artur Adib for 
`strapdown.js`, and the throng of assorted authors that adapted the theme 
for everything under the sun.

I prefer using a 16 color variant rather than Jani's original 256-color one--16 colors is plenty enough for 
me, and it plays nicely with a much wider variety of software, including `cmd` 
and ancient terminals. I guess you could say it's more portable :) 

Below are some of the ports I use regularly.

In the future I might extend this tidbit to be a general-purpose color-scheme portomatic...but don't get your hopes up.

<div id="output"></div>

Feel free to send me your own! Here's an example (or just check the source of this page)

    // Just the name of the port paired with a JS function mapping the colorTable to a chunk of HTML
    // plaintextport is a helper that should suffice for most cases
    "Windows CMD, Powershell, etc." : {
      instructions: 'Save with a .reg extension, open file to import to Windows Registry.',
      generator : plaintextport(

        // Any header text goes here
        'Windows Registry Editor Version 5.00\n\n' + 
        '[HKEY_CURRENT_USER\Console]\n', 
      
        // This function takes an index [0..15], a human-readable name, and components and spits out a line for each color
        function(index, name, r, g, b) {
          return '"ColorTable' + pad(index) + '"=dword:00' + hex(r, g, b) + '\n';
        },
      
        // If this port needed any sort of footer, it would appear here
        ''
      )
    }
