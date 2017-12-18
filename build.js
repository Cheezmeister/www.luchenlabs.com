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
}

// Directories
const Dir = {
  layout: 'src/layout',
  content: 'src/content',
  deploy: 'dist',
  media: 'src/assets',
}

// Shorthands
const readFile = Node.util.promisify(Node.fs.readFile)
const writeFile = Node.util.promisify(Node.fs.writeFile)
const mkdirp = Node.util.promisify(Npm.mkdirp)
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
const chopExtension = (filename) => {
  const parts = filename.split('.')
  const ext = parts.pop()
  return parts.join('.')
}
const changeExtension = (ext) => (filename) => `${chopExtension(filename)}.${ext}`
const color = (name) => (str) => {
  const vals = Node.util.inspect.colors[name]
  const oncode = `\x1b[${vals[0]}m`
  const offcode = `\x1b[${vals[1]}m`
  return `${oncode}${str}${offcode}`
}
const green = color('green')
const blue = color('blue')

// How To Do Stuff
async function bulkProcess(srcDir, files, destDir, munge, transformer) {
  // console.log(`Got  ${files}`)
  filenames = await glob(srcDir, files)
  console.debug(`Expanded to ${filenames}`)
  return Promise.all(filenames.map(async (f) => {
    const content = await readFile(Node.path.join(srcDir, f), 'utf8')
    const result = await transformer(content, f)
    const destfile = `${destDir}/${munge(f)}`
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
  console.log('here')
  const html = Npm.pug.renderFile(template, {
    index: (await glob(Dir.content, files)).map(readFile).map(Npm.matter).map((o)=>o.data)
  })
  console.log('there')
  destfile = changeExtension('html')(template)
  console.log(`Index ${blue(files)} => ${green(destfile)}`)
  return await writeFile(destfile, html)
}

const stylus = makeBulkTask((text, filename) => renderStylus(text, filename))
const renderTemplate = (template) => {
  const pugFunc = Npm.pug.compileFile(template)
  return makeBulkTask((text, filename) => {
    const page = Npm.matter(text)
    const html = Npm.marked(page.content, {breaks: false, smartypants: true})
    return pugFunc(Object.assign({content: html}, page.data))
  })
}

const pages = renderTemplate(`${Dir.layout}/page.jade`)
const tunes = renderTemplate(`${Dir.layout}/tunes.jade`)
const words = renderTemplate(`${Dir.layout}/page.jade`)
const games = renderTemplate(`${Dir.layout}/project.jade`)
// const lp    = renderTemplate(`${Dir.layout}/page.page`)
const home = renderTemplate(`${Dir.layout}/homepage.jade`)

try {


  // stylus(Dir.media, '**/*.styl', Dir.deploy, changeExtension('css'), { })
  // home(Dir.content, 'index.md', Dir.deploy, changeExtension('html'))
  // pages(Dir.content, '{bio,resume}.md', Dir.deploy, changeExtension('html'))
  // pages(Dir.content, 'lp/**.md', Dir.deploy, changeExtension('html'))
  // games(Dir.content, 'projects/*.md', Dir.deploy, changeExtension('/index.html'))
  // index(Dir.content, 'projects/*.md', Dir.deploy)
  index(`${Dir.layout}/projectlist.jade`, 'projects', '*.md', Dir.deploy)
} catch  (err) {
  console.log(`caught ${err}`)
}
