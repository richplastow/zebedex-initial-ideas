!(function (root) {
    // Create the Zebedex ES5 namespace, and check that the zbdx() function has
    // not been defined yet. Note `var` not `const`, because this script is
    // compatible with ES5.
    // https://eslint.org/play/ ECMA Version: 5, Source Type: script
    var zbdxEs5 = root.zbdxEs5,
        zbdx = root.zbdx;
    if (typeof zbdxEs5 !== 'undefined') throw Error('root.zbdxEs5 exists');
    if (typeof zbdx !== 'undefined') throw Error('root.zbdx exists');
    zbdxEs5 = root.zbdxEs5 = {};

    // // Stores imported modules.
    // // The key is the URL of the script - the long `src` retrieved from the
    // // script tag (different to what was set on the script tag')
    // // The value is a lookup object of exported values
    // var cache = {};

    // //
    // var didExportAll = {};

    // // Handy lookup table of short `src` to long `src`.
    // // For example, if the short `src` is "./src/state.mjs", the long `src`
    // // might be "file:///Users/jo/work/my-app/src/state.mjs".
    // var shortToLong = {};

    // // A simple sub/pub event system, which allows some modules to `export`
    // // asynchronously, after a delay.
    // var subscribers = {};

    // // TODO test whether this does help detect double-exports in async modules - and is this the best way to detect them?
    // var deletedSubscribers = {};

    // zbdxEs5.redactJs = function (n) {
    //     var o = ' ',
    //         f = '-',
    //         t = n.split(''),
    //         i = t.length,
    //         r = -1;
    //     return (
    //         (function () {
    //             for (; ++r < i; )
    //                 (
    //                     ({
    //                         '`': v,
    //                         '{': c,
    //                         '"': d,
    //                         "'": l,
    //                         '/': '*' === t[r + 1] ? a : '/' === t[r + 1] ? e : u,
    //                     })[t[r]] ||
    //                     function () {
    //                         t[r] = o;
    //                     }
    //                 )();
    //         })(),
    //         t.join('')
    //     );
    //     function u() {}
    //     function c() {
    //         for (; ++r < i && '}' !== t[r]; )
    //             (
    //                 ({
    //                     '`': v,
    //                     '{': c,
    //                     '"': d,
    //                     "'": l,
    //                     '/': '*' === t[r + 1] ? a : '/' === t[r + 1] ? e : u,
    //                 })[t[r]] || u
    //             )();
    //     }
    //     function e() {
    //         for (t[r] = o, t[++r] = o; ++r < i && '\n' !== t[r]; ) t[r] = o;
    //     }
    //     function a() {
    //         for (t[r] = o, t[++r] = o; ++r < i; ) {
    //             var n = '*' === t[r];
    //             if (((t[r] = o), n && '/' === t[r + 1])) return void (t[++r] = o);
    //         }
    //     }
    //     function v() {
    //         for (; ++r < i && '`' !== t[r]; )
    //             '$' === t[r] && '{' === t[r + 1] ? (r++, c()) : ('\\' === t[r] && (t[++r] = f), (t[r] = f));
    //     }
    //     function d() {
    //         for (; ++r < i && '"' !== t[r]; ) (t[r] = f), '\\' === t[r] && (t[++r] = f);
    //     }
    //     function l() {
    //         for (; ++r < i && "'" !== t[r]; ) (t[r] = f), '\\' === t[r] && (t[++r] = f);
    //     }
    // };

    // /** #### Used by modules to export constants, functions, etc
    //  * - Note that `value` must be a named function, class or object
    //  * - If a plain object is exported, it must have a `name` property
    //  * - Scalar values cannot be exported
    //  * @param {number} exportTally - Determines when to notify subscribers
    //  * @param {string} longSrc - The long `src` of the imported module
    //  * @param {Object|Function} value - The exported value
    //  */
    // zbdxEs5.export = function (exportTally, longSrc, value) {
    //     var pfx = 'zbdxEs5.export(): ',
    //         te = typeof exportTally,
    //         tl = typeof longSrc,
    //         tv = typeof value;
    //     if (te !== 'number') throw Error(pfx + 'exportTally is type "' + te + '" not "number"');
    //     if (tl !== 'string') throw Error(pfx + 'longSrc is type "' + tl + '" not "string"');
    //     pfx += 'Module ' + longSrc + ':\n  Exports ';
    //     if (tv !== 'object' && tv !== 'function')
    //         throw Error(pfx + 'an item of type "' + tv + '" not "object" or "function"');
    //     var name = value.name,
    //         tn = typeof name;
    //     if (tn !== 'string') throw Error(pfx + 'an object with name of type "' + tn + '" not "string"');
    //     if (name.trim() === '') throw Error(pfx + 'an object with an empty-string or whitespace-only name');

    //     // Detect the first `export` of a newly encountered file.
    //     var firstSignOfFile = !cache[longSrc]; // TODO use firstSignOfFile somehow?
    //     cache[longSrc] = cache[longSrc] || {};

    //     // If the module was already imported elsewhere in the app, `value`
    //     // will be a ref to same object/function referenced by the cache.
    //     var preexistingValue = cache[longSrc][name];
    //     if (preexistingValue) {
    //         if (preexistingValue !== value) throw Error(pfx + 'two objects named "' + name + '"');
    //         if (deletedSubscribers[longSrc])
    //             throw Error(
    //                 pfx +
    //                     '"' +
    //                     name +
    //                     '" asynchronously, but it has already ' +
    //                     'exported "' +
    //                     Object.keys(cache[longSrc]).at(-1) +
    //                     '" asynchronously'
    //             ); // TODO test whether the 2nd name is always correct

    //         // Otherwise this is the first time that this `export` has been
    //         // encountered, so cache the exported object or function. The reference
    //         // will remain in the cache for the lifetime of the app.
    //     } else {
    //         cache[longSrc][name] = value;
    //     }

    //     if (Object.keys(cache[longSrc]).length === exportTally) {
    //         console.log('didExportAll', longSrc); // TODO remove this line
    //         didExportAll[longSrc] = true;
    //     }

    //     // If the expected number of items have been exported, and a subscriber
    //     // is waiting for this module, notify it and clean up the event hub.
    //     var subscriber = subscribers[longSrc];
    //     console.log(Object.keys(subscribers));
    //     console.log(!!subscriber, Object.keys(cache[longSrc]).length, exportTally);

    //     if (subscriber && Object.keys(cache[longSrc]).length === exportTally) {
    //         subscriber(cache[longSrc]);
    //         deletedSubscribers[longSrc] = true;
    //         delete subscribers[longSrc];
    //     }
    // };

    // /** #### Used to import constants, functions, etc from modules.
    //  * @param {string} shortSrc - The short `src` of the module to import
    //  * @param {(moduleObject: Object) => void} loadCallback - Called when script loads
    //  * @param {(reason: string) => void} errorCallback - Called if loading fails
    //  * @returns {void} - Resolves with the imported module
    //  */
    // zbdxEs5.import = function (shortSrc, loadCallback, errorCallback) {
    //     var pfx = 'zbdxEs5.import(): ',
    //         ts = typeof shortSrc,
    //         tl = typeof loadCallback,
    //         te = typeof errorCallback;
    //     if (ts !== 'string') throw Error(pfx + 'shortSrc is type "' + ts + '" not "string"'); // TODO more validation, eg ends '.mjs'?
    //     if (tl !== 'function') throw Error(pfx + 'loadCallback is type "' + tl + '" not "function"');
    //     if (te !== 'function') throw Error(pfx + 'errorCallback is type "' + te + '" not "function"');

    //     // If the script has already been loaded, and all of its `module.export`
    //     // statements have been accounted for, send the cached value.
    //     // TODO avoid redeclaring longSrc
    //     var longSrc = shortToLong[shortSrc];
    //     if (longSrc && didExportAll[longSrc]) {
    //         console.log('cache hit again!', longSrc); // TODO remove this line
    //         loadCallback(cache[longSrc]);
    //         return;
    //     }

    //     // Create a script tag and append it to the body, to load the file.
    //     var $script = root.document.createElement('script');
    //     $script.setAttribute('data-zbdx', 'module');
    //     $script.src = shortSrc;
    //     root.document.body.appendChild($script);

    //     // Reading back the `src` attribute gives the long `src` of the
    //     // script - useful later for retrieving cached `moduleObject`s.
    //     var longSrc = $script.src;
    //     shortToLong[shortSrc] = longSrc;

    //     $script.onerror = function (error) {
    //         console.error(error);
    //         errorCallback(pfx + 'Script ' + shortSrc + ' failed');
    //     };

    //     $script.onload = function () {
    //         // For synchronous scripts, the module-object is in the cache.
    //         var moduleObject = cache[longSrc];
    //         if (moduleObject && didExportAll[longSrc]) {
    //             console.log('cache hit', longSrc); // TODO remove this line
    //             loadCallback(moduleObject);
    //             return;
    //         }

    //         // For asynchronous scripts, zbdxEs5.import() should eventually
    //         // give up waiting. If the script doesn't load in 1 second,
    //         // remove the subscription and call the error callback.
    //         var clearTimeoutId = setTimeout(function () {
    //             deletedSubscribers[longSrc] = true;
    //             delete subscribers[longSrc];
    //             if (!cache[longSrc]) {
    //                 delete subscribers[longSrc];
    //                 errorCallback(pfx + 'Script ' + longSrc + ' took longer than 1s to load');
    //             }
    //         }, 1000);

    //         // zbdxEs5.import() uses a simple sub/pub pattern to wait for
    //         // asynchronous scripts.
    //         console.log(1111111, longSrc);

    //         subscribers[longSrc] = function (moduleObject) {
    //             clearTimeout(clearTimeoutId);
    //             loadCallback(moduleObject);
    //         };
    //     };
    // };

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelector('#zbdx-example-output').textContent = 'Hello Zebedex';
    });
})(typeof global === 'object' ? global : this);
