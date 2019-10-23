// Dependencies
const requireStart = new Date()
const Node = {
  fs: require('fs'),
  util: require('util'),
  path: require('path')
}
const Npm = {
  stylus  : require('stylus'),
  // coffee  : require('coffee'),
  marked  : require('marked'),
  matter  : require('gray-matter'),
  pandoc  : require('pdc'),
  yaml    : require('js-yaml'),
  pug     : require('pug'),
  glob    : require('glob'),
  mkdirp  : require('mkdirp'),
  hljs    : require('highlight.js'),
  chokidar: require('chokidar'),
}
const requireEnd = new Date()

// Directories
const Dir = {
  layout: 'src/layout',
  content: 'src/content',
  deploy: 'dist',
  media: 'src/assets',
}

// Shorthands and Promisification
const promisify = Node.util.promisify
const identityFn = (a) => a
const invert = (f) => (args) => !f(args)
const wtf = (e) => console.log("WTF: " + red(e))
const readFile = promisify(Node.fs.readFile)
const writeFile = promisify(Node.fs.writeFile)
const copyFile = promisify(Node.fs.copyFile)
const mkdirp = promisify(Npm.mkdirp)
const glob = (cwd, pattern) => new Promise(function(resolve, reject) {
  Npm.glob(pattern, {cwd: cwd}, function(err, files) {
    if (err) reject(err)
    else resolve(files)
  })
})

// General Helpers
function compose(...args) {
  if (!args.length) return identityFn
  const f = args.shift()
  return (x) => compose(...args)(f(x))
}
const select = (field) => (object) => object[field]
const color = (name) => (str) => {
  const termcode = (v) => `\x1b[${v}m`
  const [on, off] = Node.util.inspect.colors[name].map(termcode)
  return `${on}${str}${off}`
}
const chopExtension = (filename) => {
  // This is not watertight. It is good enough(tm).
  const parts = filename.split('.')
  const ext = parts.pop()
  return parts.join('.')
}
const getExtension = (filename) => filename.split('.').reverse()[0]
const changeExtension = (ext) => (filename) => `${chopExtension(filename)}.${ext}`
const toPrettyURL = (filename) => `${chopExtension(filename)}/index.html`

const extHTML = changeExtension('html')
const extCSS = changeExtension('css')

const red = color('red')
const green = color('green')
const blue = color('blue')
const cyan = color('cyan')
const magenta = color('magenta')
const yellow = color('yellow')

// How To Do Stuff
async function bulkProcess(srcDir, files, destDir, munge, transformer) {
  munge = munge || identityFn
  filenames = await glob(srcDir, files)
  const processFile = async (f) => {
    const content = await readFile(Node.path.join(srcDir, f), 'utf8')
    const result = await transformer(content, f)
    const destfile = Node.path.join(destDir, munge(f))
    console.log(`${blue(f)} => ${green(destfile)}`)
    await mkdirp(Node.path.dirname(destfile))
    return await writeFile(destfile, result)
  }
  return Promise.all(filenames.map(processFile))
}

function makeBulkTask(transformer) {
  return (srcDir, files, destDir, munge) =>
    bulkProcess(srcDir, files, destDir, munge, transformer)
}

async function index(template, srcDir, files, destDir) {
  const filenames = await glob(srcDir, files)

  let indexContent = {}
  const isIndex = (a) => a.endsWith('index.md')
  const indexFile = filenames.find(isIndex)
  if (indexFile) {
    const text = await readFile(`${srcDir}/${indexFile}`, 'utf8')
    indexContent = prepContent(text)
  }

  const metadata = filenames
    .filter(invert(isIndex))
    .map((f) => Node.fs.readFileSync(`${srcDir}/${f}`, {}).toString())
    .map(Npm.matter)
    .map(select('data'))

  const html = Npm.pug.renderFile(template, ({
    ...indexContent,
    index: metadata,
  }))
  const destfile = `${destDir}/${Node.path.dirname(files)}/index.html`
  console.log(`Index ${yellow(files)} (${srcDir}) => ${green(destfile)}`)
  await mkdirp(Node.path.dirname(destfile))
  return await writeFile(destfile, html)
}

const prepContent = (text, options = {}) => {
  const markedDefaults = {
    breaks: false,
    smartypants: true,
  }
  const markedOptions = Object.assign(markedDefaults, options.marked)

  const page = Npm.matter(text)
  const content = Npm.marked(page.content, markedOptions)
  return {
    content,
    ...page.data,
    ...options.data,
  }
}

const precompilePug = (template, optionsCallback) => {
  const pugFunc = Npm.pug.compileFile(template)
  return makeBulkTask((text, filename) => {
    const options = optionsCallback ? optionsCallback(text, filename) : {}
    const data = prepContent(text, options)
    return pugFunc(data)
  })
}

const assets = async (srcDir, files, destDir) => {
  filenames = await glob(srcDir, files)
  return Promise.all(filenames.map(async (f) => {
    const srcfile = Node.path.join(srcDir, f)
    const destfile = Node.path.join(destDir, f)
    console.log(`${cyan(f)} => ${green(destfile)}`)
    await mkdirp(Node.path.dirname(destfile))
    return await copyFile(srcfile, destfile)
  })).catch(wtf)
}

const pugPath = (template) => `${Dir.layout}/${template}.pug`
const renderPages = (template, optionsCallback) => 
  precompilePug(pugPath(template), optionsCallback)

const watch = (glob, callback) =>
  Npm.chokidar.
    watch(glob).
    on('change', path => {
      console.log(`Modified: ${magenta(path)}`)
      callback(glob, path)
    })

// TODO: Maybe DRY up, I don't know
const renderPagesAndWatch = (template, optionsCallback) => {
  return (srcDir, files, destDir, munge) =>
    renderPages(template, optionsCallback)(srcDir, files, destDir, munge).then(() =>
      watch(`+(${Node.path.join(srcDir, files)}|${pugPath(template)})`, (glob, path) =>
        renderPages(template, optionsCallback)(srcDir, files, destDir, munge)
      )
    )
}

// e.g. 'README.coffee.md' => 'coffee', 'aoc.pl.md' => 'pl'
const highlightLiterate = (_, filename) => {
  const makeHighlighter = (extension) => {
    // We can augment Marked if we get our hands a little dirty.
    // https://github.com/markedjs/marked/blob/master/lib/marked.js
    const r = new Npm.marked.Renderer()
    r.paragraph = (para, wat) => {
      const cls = (para.match(/^#!/)) ? 'class="shebang"' :
                  (para.match(/^TODO/)) ? 'class="captag todo"' :
                  (para.match(/^FIXME/)) ? 'class="captag fixme"' :
                  (para.match(/^HACK/)) ? 'class="captag hack"' :
                  ''
      const p = para.replace(/^(TODO|FIXME|HACK)/, match => `<span class="caps">${match}</span>`)
      return `<p ${cls}>${p}</p>`
    }
    r.code = (code, language) => {
      const lang = extension || language
      const hl = Npm.hljs.highlightAuto(code, !!lang ? [lang] : undefined)
      return Npm.pug.render(`pre: code.hljs.${lang} !{code}`, {code: hl.value})
    }
    return r
  }

  return {
    data: {
      title: Node.path.basename(filename)
    },
    marked: {
      renderer: makeHighlighter(getExtension(chopExtension(filename))) 
    }
  }
}

const tunes = renderPagesAndWatch('tunes')
const games = renderPagesAndWatch('project')
const home = renderPagesAndWatch('homepage')
const other = renderPagesAndWatch('page')
const words = renderPagesAndWatch('page')
const lprog = renderPagesAndWatch('literate', highlightLiterate)
const stylus = makeBulkTask((text, filename) => new Promise((resolve, reject) => {
  Npm.stylus.render(text, {}, (err, css) => {
    if (err) reject(err)
    else resolve(css)
  })
}))



try {
  Promise.all([
    renderPagesAndWatch('styleguide')(Dir.content, 'styleguide.md', Dir.deploy, extHTML),
    home(Dir.content, 'index.md', Dir.deploy, extHTML),
    lprog(Dir.content, 'lp/*.md', Dir.deploy, compose(chopExtension, toPrettyURL)),
    other(Dir.content, '{lp,bio,resume}.md', Dir.deploy, toPrettyURL),
    tunes(Dir.content, 'tunes.md', Dir.deploy, toPrettyURL),
    games(Dir.content, 'projects/*.md', Dir.deploy, toPrettyURL),
    words(Dir.content, 'words/*.md', Dir.deploy, toPrettyURL),
    index(`${Dir.layout}/projectlist.pug`, Dir.content, 'projects/*.md', Dir.deploy),
    index(`${Dir.layout}/postlist.pug`, Dir.content, 'words/*.md', Dir.deploy),
    // TODO index(`${Dir.layout}/page.pug`, Dir.content, 'lp/*.md', Dir.deploy),
    stylus(Dir.media, '**/*.styl', Dir.deploy, extCSS, { }),
    assets(Dir.media, '{images,icons}/**/*.*', `${Dir.deploy}/assets`)
  ]).then(() => {
    console.log(`Loaded dependencies in ${requireEnd - requireStart}ms`)
    console.log(`  built in ${new Date() - requireStart}ms`)
  }).catch((err) =>
    console.log(`promise caught ${err}`)
  )
} catch  (err) {
  console.log(`caught ${err}`)
}

