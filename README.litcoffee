Turn Back Now
=============

This is my own little corner of the tubes. Proceed at your own risk.

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

**src  => build => deploy**
jade -> hbs
md+yfm+hbs -> html
styl -> css
css,icons,images -> media
raw -> *

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

Coming from [Hakyll][] by way of [Hyde][], My pages are written in markdown with some YFM metadata. Rendering them by hand seems kind of silly, but evidently there's no middle ground between the hard way and going full-on framework a la assemble or something. Neither is really desirable, but here's the lesser of two evils.
[Hakyll]: http://github.com/jaspervdj/hakyll
[Hyde]: http://hyde.github.io

The `render` task takes MD+YFM content plus a HBS template, and outputs static HTML. One HTML file per input page. An optional index may be supplied.

      matter = require 'gray-matter'
      marked = require 'marked'
      handle = require 'handlebars'

      marked.setOptions { breaks: true }

      grunt.registerMultiTask 'render', 'Render 1..* page(s) and/or an index of multiple pages', ->

        return ok 0 unless @files.length > 0 # Do I need this? Probably.

### Some Helpers

Gotta log when everything goes as planned. This seems to be the conventional way to do it.

        ok = (n) ->
          grunt.log.ok(n + ' ' + grunt.util.pluralize(n, 'file/files') + ' created.')

Invoking handlebars.

        renderStatic = (data, dest, tmpl) ->
          renderedHtml = (handle.compile tmpl) data
          grunt.file.write "#{dest}", renderedHtml

### Rendering Index

A HBS template for an index page (listing metadata about each content file) is optional. I use it for listing projects, and perhaps blog entries if I ever muster the patience to write any. Not likely.

        if @data.index
          template = grunt.file.read(@data.index)
          metadata = @files.
            map((f) -> grunt.file.read f.src).
            map(matter).
            map (x) -> x.data
          fname = "#{@files[0].orig.dest}/index.html"
          renderStatic {index: metadata},fname, template
          grunt.log.ok "created #{fname}"

### Rendering Files

Read each file, pull out its metadata, compile its markdown, and render it.

        template = grunt.file.read @data.template
        @files.map (file) ->
          pageContent = grunt.file.read file.src
          pageData = matter(pageContent)
          pageData.content = marked pageData.content
          renderStatic pageData, file.dest, template

        ok @files.length


