/** #### Adds the Zebedex ES5 namespace ZBDX_ES5_CORE to the `window` object
 *
 * The Zebedex ES5 core provides a basic module loading system:
 * - A single completely self-contained file with no dependencies
 * - Less than 1KB when minified and gzipped TODO run a script to check this
 * - Mandatory in all Zebedex apps
 * - Must run before any other lib/ or src/ code
 *
 * At this early stage in the app's lifecycle we don't know the capabilities
 * of the browser, so ZBDX_ES5_CORE prioritises compatibility over readability:
 * - JavaScript ES5 (2009)
 * - Only uses features supported by older browsers
 */
!(function (root) {
    // Create the Zebedex ES5 namespace, and check that the zbdx() function has
    // not been defined yet. Note `var` not `const`, because this script is
    // compatible with ES5.
    // https://eslint.org/play/ ECMA Version: 5, Source Type: script
    var alreadyExists = ' already exists',
        ns = 'ZBDX_ES5_CODE',
        zbdxEs5 = root[ns],
        zbdx = root.zbdx;
    if (typeof zbdxEs5 !== 'undefined') throw Error(ns + alreadyExists);
    if (typeof zbdx !== 'undefined') throw Error('root.zbdx' + alreadyExists);
    zbdxEs5 = root[ns] = {};
})(typeof global === 'object' ? global : this);
