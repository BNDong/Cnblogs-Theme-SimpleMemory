const fs = require('node:fs/promises');
const path = require('node:path');
const postcss = require('postcss');
const config = require('../postcss.config');

async function build() {
    const from = path.resolve(__dirname, '../src/style/simpleMemory.css');
    const to = path.resolve(__dirname, '../dist/simpleMemory.css');
    const css = await fs.readFile(from, 'utf8');
    const result = await postcss(config.plugins).process(css, { from, to, map: false });
    result.warnings().forEach(warning => console.error(warning.toString()));
    await fs.writeFile(to, result.css);
}

build().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
