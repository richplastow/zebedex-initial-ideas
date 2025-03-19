/** #### Tests zdbx-es5-core
 *
 * @example
 * node docs/src/zbdx-es5-core.test.mjs
 */

import { readFileSync } from 'node:fs';
import { deepEqual as eq, throws } from 'node:assert';
import './test-helpers.mjs';

const codePath = `${import.meta.url.slice(7, -9)}.mjs`; // file:// ... .test.mjs
const code = readFileSync(codePath, 'utf8');
const initialGlobalKeys = Object.keys(global);

// Cleans up the global context, and checks that nothing unexpected was added.
const clean = () => {
    delete global.zbdxEs5;
    eq(Object.keys(global), initialGlobalKeys);
    eq(typeof global.zbdxEs5, 'undefined');
};

// Before running the code for the first time, `global.zbdxEs5` should not exist.
// This makes sure we are evaluating the code in a clean global context.
eq(initialGlobalKeys.includes('zbdxEs5'), false);
eq(typeof global.zbdxEs5, 'undefined');

// zdbx-es5-core should define the `zbdxEs5` namespace.
global.eval(code);
eq(Object.keys(global).includes('zbdxEs5'), true);
eq(typeof global.zbdxEs5, 'object');
clean();

// Should throw an error if the `zbdxEs5` namespace already exists.
global.zbdxEs5 = null;
throws(() => global.eval(code), {
    name: 'Error',
    message: 'root.zbdxEs5 exists',
});
clean();

// Should throw an error if `zbdx` has already been defined.
global.zbdx = false;
throws(() => global.eval(code), {
    name: 'Error',
    message: 'root.zbdx exists',
});
delete global.zbdx;
clean();
