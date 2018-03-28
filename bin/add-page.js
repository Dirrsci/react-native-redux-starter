/*
Create folder structure
  <Page_name>/
    index.js
    modules.js
    test.js
    styles.js
*/
import templates from './templates'
import { capitalizeFirstLetter } from '../src/utils'
import mkdirp from 'mkdirp'
import path from 'path'

const name = capitalizeFirstLetter(process.argv[2])

const pagePath = path.join(__dirname, '../src/pages/testfolder')

// create folder
mkdirp(pagePath, (err) => {
  if (err) console.log(err)
  console.log('herere niii')
})

// create files
const files = {
  'index.js': templates.indexTemplate(name),
  'modules.js': templates.modulesTemplate(name),
  'test.js': templates.testTemplate(name),
  'styles.js': templates.stylesTemplate()
}

// add it to router? this seems untrivial
