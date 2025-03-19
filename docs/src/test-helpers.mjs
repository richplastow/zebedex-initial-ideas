/** #### Provides mocks and other utilities for testing in Node.js */

// Mocks the browser's `document` object,
global.document = {
    addEventListener: function (eventName, callback) {
        if (eventName !== 'DOMContentLoaded')
            throw Error(`document.addEventListener(): eventName is "${eventName}" not "DOMContentLoaded"`);
        setTimeout(callback, 50); // simulate the DOM taking a 20th of a second to load
    },
    querySelector: function (selectors) {
        if (selectors !== '#zbdx-example-output')
            throw Error(`document.querySelector(): selectors is "${selectors}" not "#zbdx-example-output"`);
        return {};
    },
};
