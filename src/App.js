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
* @name: App
* @type: script
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
* @contributor: Hajar Aslan <hajar.aslan@laplateforme.io>
*
* Example usage:
*   1-|> var blogJSApp = new App(DEFAULT_LANGUAGE, LIGHT_THEME);
*    -|>
*    -|> blogJSApp.setTitle('Peace & Love - Blog');
*    -|>
*    -|> blogJSApp.run();
*
*/

import { Engine } from './Engine.js'; // <- we just need our custom engine to get started #LOL !!! :)
import { loaderMixin } from './helpers/mixins/loader-mixin.js';
// import { eventMixin } from './helpers/mixins/event-mixin.js';

"use strict"; 
// ^^^^^^^^^ This keeps us on our toes, as it forces us to use all pre-defined variables, among other things 😅


// Defining some constant variables...

// app name
export const APP_NAME = "peace-n-love";
// app version
export const APP_VERSION = "0.0.1";
// author
export const AUTHOR = "Abraham Ukachi";

// base directory
export const BASE_DIR = "/blog-js/" // "blog-js/"; (for production)

// assets directory
export const ASSETS_DIR = `${BASE_DIR}assets/`;
// theme directory
export const THEME_DIR = `${ASSETS_DIR}theme/`;
// styles directory
export const STYLES_DIR = `${ASSETS_DIR}stylesheets/`;
// animations directory
export const ANIM_DIR = `${ASSETS_DIR}animations/`;

// source directory
export const SOURCE_DIR = `${BASE_DIR}src/`;
// screens directory
export const SCREENS_DIR = `${SOURCE_DIR}screens/`;
// pages directory
export const PAGES_DIR = `${SOURCE_DIR}pages/`;
// views directory
export const VIEWS_DIR = `${SOURCE_DIR}views/`;


// screens
export const SPLASH_SCREEN = 'splash';
export const WELCOME_SCREEN = 'welcome';

// pages
export const HOME_PAGE = 'home';
export const SEARCH_PAGE = 'search';
export const ARTICLES_PAGE = 'articles';
export const PROFILE_PAGE = 'profile';
export const ADMIN_PAGE = 'admin';
export const SETTINGS_PAGE = 'settings';

// default view
export const DEFAULT_VIEW = 'default';






// Create a `App` class
export class App extends Engine {

  /**
   * Properties
   *
   * @type { Object }
   */
  static get properties() {
    return {
      name: { type: String },
      title: { type: String },
      loading: { type: Boolean }
    };
  }

  /**
   * Theme
   *
   * @type { Array }
   */
  static get theme() {
    return [ 'color', 'typography', 'styles' ];
  }

  /**
   * Styles
   *
   * @type { Array }
   */
  static get styles() {
    return [ 'splash-screen' ];
  }

  /**
   * Animations
   *
   * @type { Array }
   */
  static get animations() {
    return [ 'pop-in' ];
  }

  /**
   * Screens
   *
   * @type { Object }
   */
  static get screens() {
    return {
      splash: { name: 'splash-screen' },
      welcome: { name: 'welcome-screen' }
    };
  }

  /**
   * Pages
   *
   * @type { Array[Object] }
   */
  static get pages() {
    return [
      { name: HOME_PAGE , views: [DEFAULT_VIEW, 'login', 'register'] },
      { name: SEARCH_PAGE, views: [DEFAULT_VIEW] },
      { name: ARTICLES_PAGE, views: [DEFAULT_VIEW] },
      { name: PROFILE_PAGE, views: [DEFAULT_VIEW, 'edit'] },
      { name: ADMIN_PAGE, views: ['dashboard', 'users', 'articles', 'comments', 'categories', 'rights'] },
      { name: SETTINGS_PAGE, views: [DEFAULT_VIEW, 'about', 'languages', 'theme'] },
    ];
  }

  
  // Define some public properties
   
  // Define some private properties
  
   

  /**
   * Constructor of the App
   * NOTE: This constructor will be executed automatically when a new object (eg. blogJSApp) is created.
   *
   * @param { String } lang - The default language of the App
   * @param { String } theme - The default theme of the App
   */
  constructor(lang = 'en', theme = 'dark') {
    // call the `Engine` constructor with `App` as it's controller
    super(App);
    
    // set default attributes
    this.lang = lang;
    this.theme = theme;

    // create the app's prototypes
    this._createPrototypes();

    // DEBUG [4dbsmaster]: tell me about it ;)
    // console.log(`[constructor]: #_props.init => `, this.#_props.init);
  }


  /**
   * Method that is called from the Engine's constructor
   * @override from `Engine`
   */
  init() {
    // Initialize public properties
    this.name = APP_NAME;
    this.title = 'Peace & Love';
    this.loading = true;
    
    // Initialize private properties
    


    // ====== TESTING PROPERTIES ==========
    
    /*
    setTimeout(() => {
      this.loading = false;
      this.title = 'Articles';
    }, 2000);
    */

    // ====================================


  }
  

  /**
   * First time this app gets updated 
   * @override from `Engine`
   */
  firstUpdated() {
    
    // TODO: Install the starter helper & media-query watcher
     
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[33m[firstUpdated](1): App have been updated for the first time\x1b[0m`);
    console.log(`\x1b[33m[firstUpdated](2): this.busy => ${this.loading}\x1b[0m`);
  }

  /**
   * Handler that is called whenever a property changes
   *
   * @param { Array[Object] } changedProperties
   * @override
   */
  propertiesUpdated(changedProperties) {
    changedProperties.forEach((prop) => {
      // DEBUG [4dbsmaster]: tell me about it ;)
      console.log(`\x1b[33m[changedProperties]: 
        1. prop.name => ${prop.name}
        2. prop.value => ${prop.value} 
        3. prop.oldValue => ${prop.oldValue}
      \x1b[0m`);

      if (prop.name == 'title') {
        this.setTitle(prop.value);
      }

    });
  }

  /**
   * Handler that is called whenever a property gets reset to its initial value
   *
   * @param { String } prop - The property's name
   * @param { String|Number|Boolean|Array } value - The value of the property after reset
   * @param { String|Number|Boolean|Array } oldValue - The value of the property before reset
   *
   * @override from `Engine`
   */
  propertyResetHandler(prop, value, oldValue) {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[37m[propertyResetHandler] prop => ${prop} & value => ${value} & oldValue => ${oldValue}\x1b[0m`);
  }


  /* >> Public Methods << */

  /**
   * Method used to run the app
   * @override
   */
  run() {
    super.run(); // TODO: This should load all the controller's available themes, styles and animations 

    // Load the splash screen
    this._loadScreens([SPLASH_SCREEN]).then((loadedScreens) => this.onScreensLoaded(loadedScreens));
    
  }

  /**
   * Handler that is called when the app is ready
   */
  onReady() {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[36m[onReady]: ${this.name} is ready`); 
  }


  /**
   * Sets the app's title with the given `value`
   *
   * @param { String } value - The new title 
   * @param { Boolean } hasAuthor - If TRUE, the name of the author will be shown
   */
  setTitle(value, hasAuthor) {
    // Do nothing if there's no value 
    if (typeof value === 'undefined') { return }
   
    // Define the `newTitle` variable with the given `value`
    let newTitle = hasAuthor ? `${value} | by ${AUTHOR}` : value;

    // DEBUG [4dbsmaster]: tell me about it ;)
    // console.log(`[setTitle]: newTitle => ${newTitle} & this.appRoot.title => ${this.appRoot.title}`);

    // If the current title is not the same as newTitle...
    if (this.appRoot.title !== newTitle) {
      // ...update the browser's title with `newTitle`
      this.appRoot.title = newTitle;
    }

  }
  
  /**
   * Returns the app's title
   *  
   * @param { Boolean } hasAuthor
   *
   * @returns { String } title
   *
   */
  getTitle(hasAuthor = false) {
    // TODO: ? Use this one-liner instead
    // return hasAuthor ? this.appRoot.title : this.appRoot.title.split('|').shift().trim();

    // Initialize the `title` variable with the current browser's title.
    let title = this.appRoot.title;

    // If `hasAuthor` is NOT TRUE
    if (!hasAuthor) {
      title = title
        .split('|') // <- split the title into an array using `|` as a separator
        .shift() // <- take out the first item from the array
        .trim(); // <- remove or trim trailing / outer spaces.
    }
     
    // TODO: do something awesome with the title

    // return the `title`
    return title;
  }
  
  
  /* >> Public Setters << */

  /* >> Public Getters << */

  /**
   * Returns the root object of this app.
   *
   * @returns { Object } 
   */
  get appRoot() {
    return document;
  }
  



  /* >> Private Methods << */


  /**
   * Handler that is called when one or more screens have been loaded
   *
   * @param { Array[Object] } loadedScreen
   */
  onScreensLoaded(loadedScreens) {
    loadedScreens.forEach((screen) => {

      // If the Splash Screen has been loaded...
      if (screen.name === SPLASH_SCREEN) {
        // ...get the splash screen object as `splashScreen`
        this.splashScreen = screen.object;
        
        // TODO: show the splash screen
        // this.splashScreen.show();
      }

      // DEBUG [4dbsmaster]: tell me about it ;)
      console.log(`\x1b[33m[onScreensLoaded](1): screen.name => ${screen.name} & screen.object => \x1b[0m`, screen.object);
    });
  }

  /**
   * Creates the prototypes for the app
   */
  _createPrototypes() {
    
    // String Prototypes 
    
    /**
     * capitalize - string - prototype
     */
    String.prototype.capitalize = function() { 
      return String(this.charAt(0)).toUpperCase() + this.substr(1, this.length);
    };


    // Array Prototypes

    /**
     * screen - array - prototype
     */
    /*
    Array.prototype.findScreen = function(name) {
      return this.filter((screen) => screen.name === name);
    };
    */

  }

  /* >> Private Setters << */

  /* >> Private Getters << */



}; // <- End of `App` class


// Attach some behaviors to `App`...

Object.assign(App.prototype, loaderMixin);

// Object.assign(App.prototype, EngineBehavior);
// Object.assign(App.prototype, LoaderBehavior);


// window.app = App;
