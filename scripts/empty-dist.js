'use strict';

const path = require('path');
const fs = require('fs-extra');

const PATH_BUILD = path.resolve(__dirname, '..', 'build');
fs.removeSync(PATH_BUILD);
fs.ensureDirSync(PATH_BUILD);
