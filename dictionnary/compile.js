const yaml      = require('js-yaml');
const fs        = require('fs');
const path      = require('path')
const pluralize = require('pluralize')
const debug     = require('debug')('canto:compiler')

const relPath  = filename => path.join(__dirname, filename)
const readFile = (filename) => fs.readFileSync(relPath(filename), 'utf8');
const readYAML = (filename) => yaml.safeLoad(readFile(filename))

const OUT_FILE = relPath('../src/data/canto.json');

debug('Generating dictionnary');

const data = fs.readdirSync(__dirname)
  .filter(f => /^[a-z]+_\d+\.ya?ml$/.test(f))
  .sort()
  .reduce((dict, filename) => {
    const [type]      = filename.replace(/\.+$/, '').split('_')
    const section     = pluralize(type);

    debug(`Importing ${filename} into ${section}`);

    dict[section] = dict[section] || []
    dict[section].push({
      id: dict[section].length + 1,
      ...readYAML(filename)
    });

    return dict;
  }, {})

fs.writeFileSync(OUT_FILE, JSON.stringify(data, null, 2));

debug(`${OUT_FILE} file generated`);
