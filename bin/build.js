const path = require('path');
const fs = require('fs-extra');
const zl = require("zip-lib");

async function postbuild() {
    const standalone_path = path.resolve("./.next/standalone");

    await Promise.all([
        // copy static to standalone
        fs.copy(path.resolve('./.next/static'), standalone_path + '/.next/static', { overwrite: true }),

        // copy public to standalone
        fs.copy(path.resolve('./public'), standalone_path + '/public', { overwrite: true }),

        // copy locales to standalone
        fs.copy(path.resolve('./locales'), standalone_path + '/locales', { overwrite: true }),

        // copy server.js
        fs.copy(path.resolve('./server.js'), standalone_path + '/server.js', { overwrite: true })
    ])

    // Add all standalone folder to zip
    await zl.archiveFolder(standalone_path, path.resolve('./build/northbit.zip'));

    console.log("DONE");
}
postbuild();