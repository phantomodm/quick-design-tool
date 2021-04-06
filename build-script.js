const fs = require('fs-extra');
const concat = require('concat');


(async function build(){
    const files = [
        './dist/quick-design-tool/runtime.js',
        './dist/quick-design-tool/polyfills.js',
        './dist/quick-design-tool/main.js',
    ]

    await fs.ensureDir('nystix-quick-custom')
    await concat(files,'./nystix-quick-custom/nystix-quick-customs.js')


})()
