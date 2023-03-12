/* 
* @license
* blog-js
* Copyright (c) 2023 Abraham Ukachi. The BlogJS Project Contributors. All rights reserved.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*
* @name: Loader
* @type: mixin
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
* @contributor: Hajar Aslan <hajar.aslan@laplateforme.io>
*
* Example usage:
*   1-|> import { loaderMixin } from './src/helpers/mixins/loader-mixin.js';
*    -|>
*    -|> Object.assign(App.prototype, loaderMixin);
*    -|>
*
*
*   2-|> // Load some screens from the `run()` method of `App` class
*    -|>
*    -|> class App extends Engine {
*    -|>  ...
*    -|>  run() {
*    -|>    ...
*    -|>
*    -|>    // loading splash and welcome screens...
*    -|>
*    -|>    this._loadScreens(['splash', 'welcome'], SCREENS_DIR).then((loadedScreens) => {
*    -|>
*    -|>      // do something awesome here with the `loadedScreens`
*    -|>
*    -|>    });
*    -|>  }
*    -|>   
*    -|> }
*
*
*   3-|> // Load some pages from the `run()` method of `App` class
*    -|>
*    -|> class App extends Engine {
*    -|>  ...
*    -|>  run() {
*    -|>    ...
*    -|>
*    -|>    // Loading home, search and articles pages...
*    -|>
*    -|>    this._loadPages(['home', 'search', 'articles'], PAGES_DIR).then((loadedPages) => {
*    -|>
*    -|>      // do something awesome here with the `loadedPages`
*    -|>
*    -|>    });
*    -|>  }
*    -|>   
*    -|> }
*/


// Get the default screens, pages, and views directories from app
import { SCREENS_DIR, PAGES_DIR, VIEWS_DIR } from '../../App.js';


"use strict"; 
// ^^^^^^^^^ This keeps us on our toes, as it forces us to use all pre-defined variables, among other things 😅








/**
 * loaderMixin
 * This is a mixin that is used to dynamically load assets, screens, pages and views.
 *
 * Example usage:
 *  (See above examples)
 */
export const loaderMixin = {

  /**
   * Method used to load one or more screens
   *
   * @param { Array } screens - list of screens to be loaded
   * @param { String } screensDir - directory of the screens
   *
   * @returns { Promise } promise
   * @private
   */
  _loadScreens(screens, screensDir = SCREENS_DIR) {

    // Create a promise
    let promise = new Promise((resolve, reject) => {

      // initialize the `loadedScreens` variable by setting it to an empty array
      let loadedScreens = Array();

      // For each screen name...
      for (let screenName of screens) {
        // get the url of this screen as `screenUrl`
        let screenUrl = screensDir + `${screenName}-screen.js`; 

        // dynamically import the `screenUrl`
        import(screenUrl).then((module) => {

          // get the screen id
          let screenId = `${screenName}Screen`; // <- returns eg: 'splashScreen'

          // get the name of the screen class
          let screenClassName = screenId.capitalize(); // <- returns eg.: 'SplashScreen'

          // get the screen object from `module`
          let screenObject = eval(`new module.${screenClassName}(screenId)`);

          // Add this screen to the `loadedScreens` list
          loadedScreens.push({ name: screenName, object: screenObject });

          // If the number of loaded screens is equal to the total screens to be loaded
          if (loadedScreens.length === screens.length) {
            // ...resolve this promise w/ the `loadedScreens`
            resolve(loadedScreens);

            // TODO: Call the `onScreensLoaded()` method
            // this.onScreensLoaded(loadedScreens);
          }

          // DEBUG [4dbsmaster]: tell me about it ;)
          console.log(`\x1b[32m[_loadScreens](2): screenUrl => ${screenUrl} LOADED !!! module => \x1b[0m`, module);
          console.log(`\x1b[32m[_loadScreens](3): screenClassName => \x1b[0m`, screenClassName);
        });

        // DEBUG [4dbsmaster]: tell me about it ;)
        console.log(`\x1b[32m[_loadScreens](1): screenName to be loaded => ${screenName}\x1b[0m`);
      }

    });

    // return the promise
    return promise;

  }



}; // <- End of `loaderMixin`

