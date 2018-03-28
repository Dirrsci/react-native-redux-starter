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

const name = capitalizeFirstLetter(process.argv[2])

// create folder

// create files
const indexCode = templates.indexTemplate(name)
const modulesCode = templates.modulesTemplate(name)
const testCode = templates.testTemplate(name)

// add it to router? this seems untrivial
