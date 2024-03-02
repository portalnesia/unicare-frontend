const path = require('path');
const fs = require('fs-extra');
const zl = require("zip-lib");

async function postbuild() {
    const standalone_path = path.resolve("./.next/standalone");

    // copy static to standalone
    await fs.copy(path.resolve('./.next/static'), standalone_path + '/.next/static');

    // copy public to standalone
    await fs.copy(path.resolve('./public'), standalone_path + '/public');

    // copy server.js
    await fs.copy(path.resolve('./server.js'), standalone_path + '/server.js', { overwrite: true });

    console.log("DONE");
}
postbuild();