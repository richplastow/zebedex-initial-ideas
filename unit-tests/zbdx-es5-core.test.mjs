/** #### Tests `ZDBX_ES5_CORE` source and minified code
 *
 * @example
 * node unit-tests/zbdx-es5-core.test.mjs
 */

import { deepEqual as eq, throws } from 'node:assert';
import { clean, fmtMin, fmtSrc, getPathsAndCode } from './test-helpers.mjs';

const { brightFilename, initialGlobalKeys, min, repoPath, src } = getPathsAndCode(import.meta.url);

const testNamespace = (code, fmt) => {
    let title = fmt(0, 'Testing the ZDBX_ES5_CORE namespace');
    console.log(title);

    title = fmt(
        'Before running the code for the first time, `global.ZBDX_ES5_CODE` should not exist.',
        'This makes sure we are evaluating the code in a clean global context.',
    );
    eq(initialGlobalKeys.includes('ZBDX_ES5_CODE'), false, title);
    eq(typeof global.ZBDX_ES5_CODE, 'undefined', title);

    title = fmt('zdbx-es5-core should define the `ZBDX_ES5_CODE` namespace');
    global.eval(code);
    eq(Object.keys(global).includes('ZBDX_ES5_CODE'), true, title);
    eq(typeof global.ZBDX_ES5_CODE, 'object', title);
    clean();

    title = fmt('Should throw an error if the `ZBDX_ES5_CODE` namespace already exists');
    global.ZBDX_ES5_CODE = null;
    throws(
        () => global.eval(code),
        {
            name: 'Error',
            message: 'ZBDX_ES5_CODE already exists',
        },
        title,
    );
    clean();

    title = fmt('Should throw an error if `zbdx` has already been defined');
    global.zbdx = false;
    throws(
        () => global.eval(code),
        {
            name: 'Error',
            message: 'root.zbdx already exists',
        },
        title,
    );
    delete global.zbdx;
    clean();
};

// Runs all tests.
export default function test() {
    console.log(`\n# ${repoPath}unit-test/${brightFilename}`);
    testNamespace(min, fmtMin);
    testNamespace(src, fmtSrc);
}
