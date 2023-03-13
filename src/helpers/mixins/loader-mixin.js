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


// Import the default screens, pages, views, ... directories from app
import { 
  SCREENS_DIR, 
  PAGES_DIR, 
  VIEWS_DIR,
  THEME_DIR,
  STYLES_DIR,
  ANIM_DIR
} from '../../App.js';


"use strict"; 
// ^^^^^^^^^ This keeps us on our toes, as it forces us to use all pre-defined variables, among other things 😅




// TODO (1): ? Make mixin functions public instead 
// TODO (2): Create a `_load()` function to clean up the mess below (i.e. repeated codes)


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

  },


  /**
   * Method used to load one or more pages
   *
   * @param { Array } pages - list of pages to be loaded
   * @param { String } pagesDir - directory of the pages
   *
   * @returns { Promise } promise
   * @private
   */
  _loadPages(pages, pagesDir = PAGES_DIR) {

    // Create a promise
    let promise = new Promise((resolve, reject) => {

      // initialize the `loadedPages` variable by setting it to an empty array
      let loadedPages = Array();

      // For each page name...
      for (let pageName of pages) {
        // get the url of this page as `pageUrl`
        let pageUrl = pagesDir + `${pageName}-page.js`; 

        // dynamically import the `pageUrl`
        import(pageUrl).then((module) => {

          // get the page id
          let pageId = `${pageName}Page`; // <- returns eg: 'homePage'

          // get the name of the page class
          let pageClassName = pageId.capitalize(); // <- returns eg.: 'HomePage'

          // get the page object from `module`
          let pageObject = eval(`new module.${pageClassName}(pageId)`);

          // Add this page to the `loadedPages` list
          loadedPages.push({ name: pageName, object: pageObject });

          // If the number of loaded pages is equal to the total pages to be loaded
          if (loadedPages.length === pages.length) {
            // ...resolve this promise w/ the `loadedPages`
            resolve(loadedPages);

            // TODO: Call the `onPagesLoaded()` method
            // this.onPagesLoaded(loadedPages);
          }

          // DEBUG [4dbsmaster]: tell me about it ;)
          console.log(`\x1b[32m[_loadPages](2): pageUrl => ${pageUrl} LOADED !!! module => \x1b[0m`, module);
          console.log(`\x1b[32m[_loadPages](3): pageClassName => \x1b[0m`, pageClassName);
        });

        // DEBUG [4dbsmaster]: tell me about it ;)
        console.log(`\x1b[32m[_loadPages](1): pageName to be loaded => ${pageName}\x1b[0m`);
      }

    });

    // return the promise
    return promise;

  },


  /**
   * Method used to load one or more `views` of the given `page`
   *
   * @param { Array } views - list of views to be loaded
   * @param { Array } page - name of the page where the views are located
   * @param { String } viewsDir - directory of the views
   *
   * Example usage:
   *
   *    this._loadViews(['default', 'reader', 'creator'], ARTICLES_PAGE, VIEWS_DIR).then((loadedViews) => {
   *
   *      // do something awesome here with the loaded views (i.e. `loadedViews`)
   *
   *    });
   *
   * @returns { Promise } promise
   * @private
   */
  _loadViews(views, page, viewsDir = VIEWS_DIR) {

    // Create a promise
    let promise = new Promise((resolve, reject) => {

      // initialize the `loadedViews` variable by setting it to an empty array
      let loadedViews = Array();

      // For each view name...
      for (let viewName of views) {
        // get the url of this view as `viewUrl`
        let viewUrl = viewsDir + page + `/${viewName}-${page}-view.js`; 

        // dynamically import the `viewUrl`
        import(viewUrl).then((module) => {

          // get the view id
          let viewId = `${viewName}${page.capitalize()}View`; // <- returns eg: 'defaultHomeView'

          // get the name of the view class
          let viewClassName = viewId.capitalize(); // <- returns eg.: 'DefaultHomeView'

          // get the view object from `module`
          let viewObject = eval(`new module.${viewClassName}(viewId)`);

          // Add this view to the `loadedViews` list
          loadedViews.push({ name: viewName, object: viewObject });

          // If the number of loaded views is equal to the total views to be loaded
          if (loadedViews.length === views.length) {
            // ...resolve this promise w/ the `loadedViews`
            resolve(loadedViews);

            // TODO: Call the `onViewsLoaded()` method
            // this.onViewsLoaded(loadedViews);
          }

          // DEBUG [4dbsmaster]: tell me about it ;)
          console.log(`\x1b[32m[_loadViews](2): viewUrl => ${viewUrl} LOADED !!! module => \x1b[0m`, module);
          console.log(`\x1b[32m[_loadViews](3): viewClassName => \x1b[0m`, viewClassName);
        });

        // DEBUG [4dbsmaster]: tell me about it ;)
        console.log(`\x1b[32m[_loadViews](1): viewName to be loaded => ${viewName}\x1b[0m`);
      }

    });

    // return the promise
    return promise;

  },


  



  // # ======================================================== #
  // # ============ THEME, STYLESHEETS & ANIMATIONS =========== #
  // # ======================================================== #



  /**
   * Method used to load one or more themes.
   *
   * @param { Array } themes - list of themes to be loaded
   * @param { String } themesDir - directory of the themes 
   * Example usage:
   *
   *    this._loadThemes(['color', 'typography', 'styles'], THEME_DIR).then((loadedThemes) => {
   *
   *      // do something awesome here after the themes have been loaded
   *
   *    });
   *
   * @returns { Promise } promise
   * @private
   */
  _loadThemes(themes, themesDir = THEME_DIR) {

    // Create a promise
    let promise = new Promise((resolve, reject) => {

      // initialize the `loadedThemes` variable by setting it to an empty array
      let loadedThemes = Array();

      // For each theme name...
      for (let themeName of themes) {
        // ...get the url of this theme as `themeUrl`
        let themeUrl = themesDir + `${themeName}.css`; 

        // dynamically import the `themeUrl`
        import(themeUrl).then((module) => {

          // get the theme id
          let themeId = `${themeName}Theme`; // <- returns eg: 'colorTheme'

          // get the name of the theme class
          //let themeClassName = themeId.capitalize(); // <- returns eg.: ''

          // get the theme object from `module`
          //let themeObject = eval(`new module.${themeClassName}(themeId)`);
          let themeObject = Object();

          // Add this theme to the `loadedThemes` list
          loadedThemes.push({ name: themeName, object: themeObject });

          // If the number of loaded themes is equal to the total themes to be loaded
          if (loadedThemes.length === themes.length) {
            // ...resolve this promise w/ the `loadedThemes`
            resolve(loadedThemes);

            // TODO: Call the `onThemesLoaded()` method
            // this.onThemesLoaded(loadedThemes);
          }

          // DEBUG [4dbsmaster]: tell me about it ;)
          console.log(`\x1b[32m[_loadThemes](2): themeUrl => ${themeUrl} LOADED !!! module => \x1b[0m`, module);
          // console.log(`\x1b[32m[_loadThemes](3): themeClassName => \x1b[0m`, themeClassName);
        });

        // DEBUG [4dbsmaster]: tell me about it ;)
        console.log(`\x1b[32m[_loadThemes](1): themeName to be loaded => ${themeName}\x1b[0m`);
      }

    });

    // return the promise
    return promise;

  },


  /**
   * Method used to load one or more stylesheets from the given `stylesDir`.
   *
   * @param { Array } styles - list of styles to be loaded
   * @param { String } stylesDir - directory of the styles 
   *
   * Example usage:
   *
   *    this._loadStyles([...SplashScreen.styles], STYLES_DIR).then((loadedStyles) => {
   *
   *      // do something awesome here after the styles have been loaded
   *
   *    });
   *
   * @returns { Promise } promise
   * @private
   */
  _loadStyles(styles, stylesDir = STYLES_DIR) {
    
    // Create a promise
    let promise = new Promise((resolve, reject) => {

      // initialize the `loadedStyles` variable by setting it to an empty array
      let loadedStyles = Array();

      // For each style name...
      for (let styleName of styles) {
        // ...get the url of this style as `styleUrl`
        let styleUrl = stylesDir + `${styleName}.css`; 

        // dynamically import the `styleUrl`
        import(styleUrl).then((module) => {
          
          // get the style id
          let styleId = `${styleName}Theme`; // <- returns eg: 'colorTheme'

          // get the name of the style class
          //let styleClassName = styleId.capitalize(); // <- returns eg.: ''

          // get the style object from `module`
          //let styleObject = eval(`new module.${styleClassName}(styleId)`);
          let styleObject = Object();

          // Add this style to the `loadedStyles` list
          loadedStyles.push({ name: styleName, object: styleObject });

          // If the number of loaded styles is equal to the total styles to be loaded
          if (loadedStyles.length === styles.length) {
            // ...resolve this promise w/ the `loadedStyles` 
            resolve(loadedStyles);

            // TODO: Call the `onStylesLoaded()` method
            // this.onStylesLoaded(loadedStyles);
          }

          // DEBUG [4dbsmaster]: tell me about it ;)
          console.log(`\x1b[32m[_loadStyles](2): styleUrl => ${styleUrl} LOADED !!! module => \x1b[0m`, module);
          // console.log(`\x1b[32m[_loadStyles](3): styleClassName => \x1b[0m`, styleClassName);
        });

        // DEBUG [4dbsmaster]: tell me about it ;)
        console.log(`\x1b[32m[_loadStyles](1): styleName to be loaded => ${styleName}\x1b[0m`);
      }

    });

    // return the promise
    return promise;

  },


  /**
   * Method used to load one or more animations from the given `animationsDir`.
   *
   * @param { Array } animations - list of animations to be loaded
   * @param { String } animDir - directory of the animations
   *
   * Example usage:
   *
   *    this._loadAnimations(['fade-in', 'pop-in', 'slide-from-down'], ANIM_DIR).then((loadedAnimations) => {
   *
   *      // do something awesome here after the animations have been loaded
   *
   *    });
   *
   * @returns { Promise } promise
   * @private
   */
  _loadAnimations(animations, animDir = ANIM_DIR) {
    
    // Create a promise
    let promise = new Promise((resolve, reject) => {

      // initialize the `loadedAnimations` variable by setting it to an empty array
      let loadedAnimations = Array();

      // For each animation name...
      for (let animationName of animations) {
        // ...get the url of this animation as `animationUrl`
        let animationUrl = animDir + `${animationName}.css`; 

        // dynamically import the `animationUrl`
        import(animationUrl).then((module) => {
          
          // get the animation id
          let animationId = `${animationName}Theme`; // <- returns eg: 'colorTheme'

          // get the name of the animation class
          //let animationClassName = animationId.capitalize(); // <- returns eg.: ''

          // get the animation object from `module`
          //let animationObject = eval(`new module.${animationClassName}(animationId)`);
          let animationObject = Object();

          // Add this animation to the `loadedAnimations` list
          loadedAnimations.push({ name: animationName, object: animationObject });

          // If the number of loaded animations is equal to the total animations to be loaded
          if (loadedAnimations.length === animations.length) {
            // ...resolve this promise w/ the `loadedAnimations` 
            resolve(loadedAnimations);

            // TODO: Call the `onAnimationsLoaded()` method
            // this.onAnimationsLoaded(loadedAnimations);
          }

          // DEBUG [4dbsmaster]: tell me about it ;)
          console.log(`\x1b[32m[_loadAnimations](2): animationUrl => ${animationUrl} LOADED !!! module => \x1b[0m`, module);
          // console.log(`\x1b[32m[_loadAnimations](3): animationClassName => \x1b[0m`, animationClassName);
        });

        // DEBUG [4dbsmaster]: tell me about it ;)
        console.log(`\x1b[32m[_loadAnimations](1): animationName to be loaded => ${animationName}\x1b[0m`);
      }

    });

    // return the promise
    return promise;

  }

}; // <- End of `loaderMixin`

