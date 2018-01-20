// Dependencies
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
  handle  : require('handlebars'),
  pandoc  : require('pdc'),
  yaml    : require('js-yaml'),
  pug     : require('pug'),
  glob    : require('glob'),
  mkdirp  : require('mkdirp'),
  hljs    : require('highlight.js'),
}

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
const readFile = promisify(Node.fs.readFile)
const writeFile = promisify(Node.fs.writeFile)
const copyFile = promisify(Node.fs.copyFile)
const mkdirp = promisify(Npm.mkdirp)
const glob = (cwd, pattern) => new Promise((resolve, reject) => {
  Npm.glob(pattern, {cwd: cwd}, function(err, files) {
    if (err) reject(err)
    else resolve(files)
  })
})
const renderStylus = (content, filename) => new Promise((resolve, reject) => {
  Npm.stylus.render(content, {}, (err, css) => {
    if (err) reject(err)
    else resolve(css)
  })
})

// Helpers
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
  return Promise.all(filenames.map(async (f) => {
    const content = await readFile(Node.path.join(srcDir, f), 'utf8')
    const result = await transformer(content, f)
    const destfile = Node.path.join(destDir, munge(f))
    console.log(`${blue(f)} => ${green(destfile)}`)
    await mkdirp(Node.path.dirname(destfile))
    return await writeFile(destfile, result)
  }))
}
function makeBulkTask(transformer) {
  return (srcDir, files, destDir, munge) =>
    bulkProcess(srcDir, files, destDir, munge, transformer)
}

async function index(template, srcDir, files, destDir) {
  const metadata = (await glob(srcDir, files))
    .filter((a) => -1 == a.indexOf('index.md')) // This is awful.
    .map((f) => Node.fs.readFileSync(`${srcDir}/${f}`, {}).toString())
    .map(Npm.matter)
    .map(select('data'))

  const html = Npm.pug.renderFile(template, {
    index: metadata
  })
  const destfile = `${destDir}/${Node.path.dirname(files)}/index.html`
  await mkdirp(Node.path.dirname(destfile))
  console.log(`Index ${yellow(files)} (${srcDir}) => ${green(destfile)}`)
  return await writeFile(destfile, html)
}

makeHighlighter = (extension) => {
  const r = new Npm.marked.Renderer()
  r.code = (code, language) => {
    const lang = extension || language;
    const hl = Npm.hljs.highlightAuto(code, !!lang ? [lang] : undefined)
    return Npm.pug.render(`pre: code.hljs.${'pl'} !{code}`, {code: hl.value})
  }
  return r;
}

// e.g. 'README.coffee.md' => 'coffee', 'aoc.pl.md' => 'pl'
highlightLiterate = (_, filename) => {renderer: makeHighlighter(getExtension(chopExtension(filename)))}
const precompilePug = (template, extraOptions = (() => {})) => {

  const pugFunc = Npm.pug.compileFile(template)
  return makeBulkTask((text, filename) => {
    const page = Npm.matter(text)
    const extras = extraOptions(text, filename) || {};
    const content = Npm.marked(page.content, Object.assign(extras, {
      breaks: false,
      smartypants: true,
      renderer: makeHighlighter(filename.split('.').reverse()[1]),
    }))
    return pugFunc(Object.assign({content: content}, page.data))
  })
}

const assets = async (srcDir, files, destDir) => {
  filenames = await glob(srcDir, files)
  return Promise.all(filenames.map(async (f) => {
    const srcfile = Node.path.join(srcDir, f)
    const destfile = Node.path.join(destDir, f)
    await copyFile(srcfile, destfile)
    console.log(`${cyan(f)} => ${green(destfile)}`)
    await mkdirp(Node.path.dirname(destfile))
    return await copyFile(srcfile, destfile)
  }))
}

const stylus = makeBulkTask((text, filename) => renderStylus(text, filename))

const renameMeRender = (template, o) => precompilePug(`${Dir.layout}/${template}.pug`, o)

const tunes = renameMeRender('tunes')
const games = renameMeRender('project')
const home = renameMeRender('homepage')
const pages = renameMeRender('page')
const words = renameMeRender('page')
const lprog = renameMeRender('page', highlightLiterate)


try {
  home(Dir.content, 'index.md', Dir.deploy, extHTML)
  lprog(Dir.content, 'lp/*.md', Dir.deploy, extHTML)
  pages(Dir.content, '{bio,resume}.md', Dir.deploy, toPrettyURL)
  tunes(Dir.content, 'tunes.md', Dir.deploy, toPrettyURL)
  games(Dir.content, 'projects/*.md', Dir.deploy, toPrettyURL)
  words(Dir.content, 'words/*.md', Dir.deploy, toPrettyURL)
  index(`${Dir.layout}/projectlist.pug`, Dir.content, 'projects/*.md', Dir.deploy)
  index(`${Dir.layout}/postlist.pug`, Dir.content, 'words/*.md', Dir.deploy)
  stylus(Dir.media, '**/*.styl', Dir.deploy, extCSS, { })
  assets(Dir.media, '{images,icons}/**/*', `${Dir.deploy}/assets`)
} catch  (err) {
  console.log(`caught ${err}`)
}
