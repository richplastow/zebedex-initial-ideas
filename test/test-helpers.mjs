/** #### Provides mocks and other utilities for testing in Node.js */

import { deepEqual as eq } from 'node:assert';
import { readFileSync } from 'node:fs';

// TODO maybe remove this
// // Mocks the browser's `document` object,
// global.document = {
//     addEventListener: function (eventName, callback) {
//         if (eventName !== 'DOMContentLoaded')
//             throw Error(`document.addEventListener(): eventName is "${eventName}" not "DOMContentLoaded"`);
//         setTimeout(callback, 50); // simulate the DOM taking a 20th of a second to load
//     },
//     querySelector: function (selectors) {
//         if (selectors !== '#zbdx-example-output')
//             throw Error(`document.querySelector(): selectors is "${selectors}" not "#zbdx-example-output"`);
//         return {};
//     },
// };

// Cleans up the global context, and checks that nothing unexpected was added.
const initialGlobalKeys = Object.keys(global);
export const clean = () => {
    delete global.ZBDX_ES5_CODE;
    eq(Object.keys(global), initialGlobalKeys);
    eq(typeof global.ZBDX_ES5_CODE, 'undefined');
};

// Formatters for test messages.
const fmtTag = (isMin) => ' \x1b[1m' + (isMin ? '\x1b[35m (min)' : '\x1b[36m (src)') + ' \x1b[0m';
const fmtAny = (isMin, ifZeroAvoidNewlines, lines) => {
    const nl = ifZeroAvoidNewlines === 0 ? '' : '\n';
    const allLines = ifZeroAvoidNewlines === 0 ? lines : [ifZeroAvoidNewlines, ...lines];
    return nl + nl + '# ' + allLines.join(nl + '# ') + fmtTag(isMin) + nl;
};
export const fmtMin = (ifZeroAvoidNewlines, ...lines) => fmtAny(true, ifZeroAvoidNewlines, lines);
export const fmtSrc = (ifZeroAvoidNewlines, ...lines) => fmtAny(false, ifZeroAvoidNewlines, lines);

// Generates various paths, and reads min and src code.
export const getPathsAndCode = (url) => {
    const filenameParts = url.slice(7).split('/'); // 7 removes "file://"
    const repoPath = filenameParts.slice(0, -2).join('/') + '/';
    const filename = filenameParts.pop();
    const brightFilename = '\x1b[1m' + filename + '\x1b[0m';
    const filenameNoTestMjs = filename.slice(0, -9); // -9 removes ".test.mjs"
    const minPath = `${repoPath}docs/src/${filenameNoTestMjs}.min.mjs`;
    const srcPath = `${repoPath}docs/src/${filenameNoTestMjs}.mjs`;
    const min = readFileSync(minPath, 'utf8');
    const src = readFileSync(srcPath, 'utf8');
    const initialGlobalKeys = Object.keys(global);
    return { brightFilename, initialGlobalKeys, min, repoPath, src };
};
