'use strict';

const path = require('path');
const fs = require('fs-extra');
const manifest = require('./../src/manifest.json');

const PATH = path.resolve('build', 'manifest.json');

// generates the manifest file using the package.json informations
manifest.description = process.env.npm_package_description;
manifest.version = process.env.npm_package_version;

fs.ensureFileSync(PATH);
fs.writeFileSync(PATH, JSON.stringify(manifest));
