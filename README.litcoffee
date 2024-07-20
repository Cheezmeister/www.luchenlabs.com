Turn Back Now [![Total alerts](https://img.shields.io/lgtm/alerts/g/Cheezmeister/luchenlabs.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Cheezmeister/luchenlabs/alerts/) [![Build Status](https://www.travis-ci.org/Cheezmeister/luchenlabs.svg?branch=master)](https://www.travis-ci.org/Cheezmeister/luchenlabs)
=============

This is my own little corner of the internet. It's where I share things about myself that I think others might care about, today, a week, a decade from now.

The remainder of this README is a Gruntfile in Literate CoffeeScript (one of my personal favorite programming languages which, as a pragmatic programmer, I would _never_ use in production). It was last used in 2017 or so, at a time when [Pug.js](https://github.com/pugjs/pug) was still called Jade, when I decided to stop switching static-site generators and simply write one [large but simple build script](./build.js) that can do anything I might want it to do, without any upstream dependencies. At the time, I called the custom script a `ridiculous over-the-top masochistic bespoke build`, but as the years wear on, I believe it was in fact a sound choice. I rarely need to touch it or worry about it. Reading it makes more sense (to me at least) than any `webpack.config.js` ever has.

I keep the old gruntfile around as a historical artifact of my journey as a developer. It comes with no warranty, express or implied.

Proceed at your own risk.

    require './build'

![Long live Grunt](https://i.imgflip.com/2vsugr.jpg)

All Systems Go
--------------

    module.exports = (grunt) ->

Yes, I use Node and Grunt, I'm a horrible person. This is the real gruntfile. Because grunt configuration tends to get hideously overgrown, I've taken the liberty of hiding it in a separate file so as not to dominate the readme.

      grunt.initConfig(require "./grunt_config.yaml")

Below you'll find some of the giants whose shoulders I stand on or...hang off of, or something.

      # Plugins
      grunt.loadNpmTasks plugin for plugin in [
        'grunt-contrib-jade',
        'grunt-contrib-stylus',
        'grunt-contrib-clean',
        'grunt-contrib-watch',
        'grunt-contrib-copy',
        'grunt-contrib-connect',
        'grunt-compile-handlebars',
      ]

The pipeline is sort of randomly cobbled together but looks something like the following:

src    | build | deploy
-------|-------|-----
jade   | hbs
md+yfm |  +    | = html
styl   |  ->    | css
css,icons,images || assets
raw | -> | *

      # Tasks
      grunt.registerTask 'default', 'build'
      grunt.registerTask 'build', [
        'copy',
        'stylus',
        'jade',
        'render',
      ]
      grunt.registerTask 'serve', [
        'build',
        'connect:server',
        'watch',
      ]

Heavy Lifting
-------------

Just in case.

      d = console.log

Gotta log when everything goes as planned. This seems to be the conventional way to do it.

      ok = (n) ->
        grunt.log.ok(n + ' ' + grunt.util.pluralize(n, 'file/files') + ' created.')

## Render

You might ask what makes this website special. I don't know why you would, but you might. Well, besides being mine, this website is
static. It has (excepting bits that are obviously interactive) no JavaScript. At all. It also has no database or server-side logic. At all. 
This makes page loads quite snappy and limited only by the actual size of the page and the speed of your connection.
I _use_ all of the crap in this repo to make it that way, but once built, it's just stuff.

Coming from [Hakyll][] by way of [Hyde][], my pages are written in markdown with some YFM metadata. Rendering them by hand seems kind of silly, but evidently there's no middle ground between the hard way and going full-on framework a la assemble or something. Neither is really desirable, but here's the lesser of two evils.

[Hakyll]: http://github.com/jaspervdj/hakyll
[Hyde]: http://hyde.github.io

The `render` task takes MD+YFM content plus a HBS template, and outputs static HTML. One HTML file per input page. An optional index may be supplied.

      matter = require 'gray-matter'
      marked = require 'marked'
      handle = require 'handlebars'
      pandoc = require 'pdc'

      grunt.registerMultiTask 'render', 'Render 1..* page(s) and/or an index of multiple pages', ->

        gruntTask = this

        return ok 0 unless @files.length > 0 # Do I need this? Probably.

### Some Helpers

Get the extension of a Grunt "src/dest" file. I can't believe this doesn't come standard.

        extension = (file) ->
          "#{file.src}".split('.').pop()

Capitalize a string

        capitalize = (str) ->
          str.charAt(0).toUpperCase() + str.slice(1)

Invoking handlebars.

        renderStatic = (pageData, dest, tmpl) ->
          renderedHtml = (handle.compile tmpl) pageData
          grunt.file.write "#{dest}", renderedHtml

Compiling content. We use Marked for markdown...

        compileMarkdown = (content, highlightLanguage) ->
          marked.setOptions
            highlight: (code) ->
              hljs = require('highlight.js')
              result = if highlightLanguage then hljs.highlightAuto(code, [highlightLanguage]) else hljs.highlightAuto code
              result.value

          marked content, {breaks: false, smartypants: true}

...and Pandoc for LaTeX. I couldn't find a synchronous Pandoc wrapper, so Grunt `async` it is! I could also promises, but feh.

        compileLatex = (content, callback) ->
          pandoc.path = require('path').resolve(process.env.HOME, '.cabal/bin/pandoc')
          pandoc content, 'latex', 'html', (err, result) ->
            if err
              console.warn err
              callback(err, result)
            else
              callback(err, result)

### Rendering Index

A HBS template for an index page (listing metadata about each content file) is optional. I use it for listing projects, and perhaps blog entries if I ever muster the patience to write any. Not likely.

        if @data.index
          template = grunt.file.read(@data.index)
          metadata = @files.
            map((f) -> grunt.file.read f.src).
            map(matter).
            map (x) -> x.data
          fname = "#{@files[0].orig.dest}/index.html"

Infer the page's title from the task args. E.g. `grunt render:Posts:Javascript` will set title to 'Posts - Javascript'. We can also configure a title directly.

          title = @data.title || capitalize @target

          renderStatic {index: metadata, title: title},fname, template
          grunt.log.ok "created #{fname} from #{@files.map (f)->f.src}"

### Rendering Files

Perhaps instead of configuring a single template, it could be specified
per-document with YFM. Or just override. I dunno.

        template = grunt.file.read @data.template
        literate = @data.literate

        @files.map (file) ->

If the task has `literate: true` we will detect the source language from the 
_inner_ file extension and use it to highlight code blocks.

          codeExt = null
          if literate
            codeExt = "#{file.src}".split('.').reverse()[1]
            console.log "Ext is #{codeExt}"

Regardless, we read each file, pull out its metadata, compile its content, and render it.

          pageContent = grunt.file.read file.src
          pageData = matter(pageContent)
          if extension(file) is 'md'
            pageData.data.content = compileMarkdown pageData.content, codeExt
            renderStatic pageData.data, file.dest, template
          else
            done = gruntTask.async()
            compileLatex pageData.content, (err, result) ->
              if result
                pageData.content = result
                renderStatic pageData, file.dest, template
              done(err || true)

        ok @files.length

## Writ

      writ = require 'writ'
      grunt.registerMultiTask 'writ', 'Emit source for literate programs using writ', ->
        writ.writ file.src, file.orig.dest for file in @files
