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

import { html, Engine } from './Engine.js'; // <- we just need stuff from our custom engine to get started #LOL !!! :)
// import { eventMixin } from './helpers/mixins/event-mixin.js';
import { installStorageWatcher } from './helpers/LiveStorage.js';


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


// a list of all assets that have been loaded
export const loadedAssetsList = [];


// app children levels
export const APP_SCREENS = 1;
export const APP_PAGES = 2;
export const APP_DIALOGS = 3;
export const APP_MENUS = 4;
export const APP_TOASTS = 5;


// themes
// export const CLASSIC_THEME = 'classic';
// export const LIGHT_THEME = 'light';
// export const DARK_THEME = 'dark';



// TODO: Turn the App into a custom element by extending `HTMLElement`


// Create a `App` class
export class App extends Engine {
  // some app specific constants
  static get CLASSIC_THEME() { return 'classic' }
  static get LIGHT_THEME() { return 'light' }
  static get DARK_THEME() { return 'dark' }

  /**
   * Properties
   *
   * @type { Object }
   */
  static get properties() {
    return {
      id: { type: String },
      name: { type: String },
      title: { type: String },
      lang: { type: String },
      theme: { type: String },
      updated: { type: Boolean }

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
    return [ 
      // 'splash-screen' 
    ];
  }

  /**
   * Animations
   *
   * @type { Array }
   */
  static get animations() {
    return [ 
      // 'fade-in',
      // 'pop-in'
    ];
  }

  /**
   * Screens
   *
   * @type { Object }
   */
  static get screens() {
    return {
      // splash: { name: 'splash-screen' }
      // welcome: { name: 'welcome-screen' }
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

    // show / log a welcome message
    this.#showWelcomeMessage();

    // create the app
    this.#create();

    // DEBUG [4dbsmaster]: tell me about it ;)
    // console.log(`[constructor]: #_props.init =>`, this.#_props.init);
  }


  /**
   * Method that is called from the Engine's constructor
   * @override from `Engine`
   */
  init() {
    // Initialize public properties
    this.id = 'app';
    this.name = APP_NAME;
    this.title = 'Peace & Love';
    this.updated = false;
    
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
   * Renders the app's template
   * IMPORTANT: This is where the html content of the app is defined.
   * 
   * TODO: Return a `HTMLTemplate` instead
   *
   * @returns { String }
   */
  render() {
    return html`
      
      <!-- App Container --> 
      <div id="appContainer" class="theme ${this.theme}" lang="${this.lang}" fit>

        <!-- Screens -->
        <div id="screens" fit></div>
        <!-- End of Screens -->

        <!-- Pages -->
        <div id="pages" fit></div>
        <!-- End of Pages -->

        <!-- Dialogs -->
        <div id="dialogs" fit></div>
        <!-- End of Dialogs -->

        <!-- Menus -->
        <div id="menus" fit></div>
        <!-- End of Menus -->

        <!-- Toasts -->
        <div id="toasts" fit></div>
        <!-- End of Toasts -->

      </div>
      <!-- End of App Container --> 

      <!-- NOTE: Style Links will be injected here -->
    `;
  }
  

  /**
   * First time this app gets updated 
   * @override from `Engine`
   */
  firstUpdated() {

    // install a storage watcher from 'LiveStorage'
    installStorageWatcher(this, ['lang', 'theme'], (changedStorageItems) => this._handleChangedStorageItems(changedStorageItems));
  
    // add event listeners here 

    // this.host.addEventListener('click', (ev) => console.log(`clicking host ev.currentTarget =>`, ev.currentTarget));

    // TODO: Install the starter helper & media-query watcher
     
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[40m\x1b[33m[firstUpdated](1): App have been updated for the first time\x1b[0m`);
    console.log(`\x1b[40m\x1b[33m[firstUpdated](2): this.containerEl => ${eval(this.containerEl)}\x1b[0m`);

  }

  /**
   * Handler that is called whenever a property changes
   *
   * @param { Array[Object] } changedProperties
   * @override
   */
  propertiesUpdated(changedProperties) {
    changedProperties.forEach((prop) => {

      if (['lang', 'theme'].includes(prop.name)) {
        this.liveStorage.setItem(prop.name, prop.value);
      }

      if (prop.name === 'updated' && prop.value === true) {
        // call the first updated method
        this.firstUpdated();
      }

      if (prop.name === 'title') {
        this.setTitle(prop.value);
      }

      // DEBUG [4dbsmaster]: tell me about it ;)
      console.log(`\x1b[33m[changedProperties]: 
        1. prop.name => ${prop.name}
        2. prop.value => ${prop.value} 
        3. prop.oldValue => ${prop.oldValue}
      \x1b[0m`);

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
  async run() {

    // add the app's document fragment to `shadowRoot`
    this.shadowRoot.appendChild(this.documentFragment);
    // set `updated` property to TRUE
    this.updated = true;

    // run the engine first and wait for a response
    let engineResponse = await super.run();



    // Looping through all the assets in `engineResponse`
    // IDEA: Inject the line of style in the app's shadow DOM directly
    Object.entries(engineResponse).map(([assetsId, assetsData]) => {
      // TODO: handle `engineResponse` appropriately 

      // DEBUG [4dbsmaster]: tell me about it ;)
      console.log(`\x1b[40m\x1b[36m[run]: assetsId => ${assetsId} & assetsData => \x1b[0m`, assetsData);

    });


    // HACK / IDEA: allocating enough time before executing the `onReady()` method,
    //              this is to prepare for any unforseen issues
    // after 0.1 seconds or 100 milliseconds...
    setTimeout(() => {
      // ...call the onReady() method
      this.onReady();
    }, 100);


    
  }

  /**
   * Handler that is called when the app is ready
   */
  onReady() {

    // Load the splash screen
    this._loadScreens([SPLASH_SCREEN]).then((loadedScreens) => this._onScreensLoaded(loadedScreens));
    
    
    
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[40m\x1b[31m[onReady]: ${this.name} is ready`); 
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
    // console.log(`[setTitle]: newTitle => ${newTitle} & this.root.title => ${this.root.title}`);

    // If the current title is not the same as newTitle...
    if (this.root.title !== newTitle) {
      // ...update the browser's title with `newTitle`
      this.root.title = newTitle;
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
    // return hasAuthor ? this.root.title : this.root.title.split('|').shift().trim();

    // Initialize the `title` variable with the current browser's title.
    let title = this.root.title;

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

  
  /**
   * Returns the root of the given `appChild`
   *
   * Example usage:
   *  let screensRoot = getRootOf(APP_SCREENS);
   *
   *
   * @param { Number } appChild - Indirect children of app's container or `this.containerEl`
   * @returns { Elememnt } root - eg. '<div id="screens">' if `appChild` is "screens"
   */
  getRootOf(appChild) {
    // Declare the `root` variable
    let root;

    switch(appChild) {
      case APP_SCREENS:
        root = this.screensEl;
        break;
      case APP_PAGES:
        root = this.pagesEl;
        break;
      case APP_DIALOGS:
        root = this.dialogsEl;
        break;
      case APP_MENUS:
        root = this.menusEl;
        break;
      case APP_TOASTS:
        root = this.toastsEl;
        break;
    }

    // return `root`
    return root;
  }

  /**
   * Method used to update the theme 
   *
   * @param { String } newTheme - """c'mon, this is pretty self-explanatory, isn't it? ;)"""
   */
  updateTheme(newTheme) {
    // do nothing if there's no theme
    // TODO: Make sure the given `theme` is supported before proceeding
    if (typeof theme === 'undefined') { return }

    // remove all themes in `containerEl`
    this.containerEl.classList.remove(App.CLASSIC_THEME, App.LIGHT_THEME, App.DARK_THEME);
    // update the theme
    this.containerEl.classList.add(theme);
  }
  
  /* >> Public Setters << */

  /* >> Public Getters << */

  /**
   * Returns the app's `<div id="container">` element in the shadow root
   *  
   * @returns { Element } containerEl
   */
  get containerEl() {
    return this.shadowRoot.getElementById('appContainer');
  }

  /**
   * Returns the top-level or root element of this app.
   *
   * @returns { HTMLDocument } 
   */
  get root() {
    return document;
  }

  /**
   * Returns the host element of the app.
   * NOTE: This elment holds the shadowRoot
   *
   * @returns { HTMLElement } 
   */
  get host() {
    return this.root.getElementById(this.id);
  }


  /**
   * Returns the shadow root of the app.
   *
   * @returns { ShadowRoot }
   */
  get shadowRoot() {
    return this.host.shadowRoot;
  }
  

  /**
   * Returns the `<head>` element in the app's root or document.
   *
   * @returns { Element } 
  */
  get rootHead() {
    return this.root.getElementsByTagName('head')[0];
  }

  /**
   * Returns the `<template>` element inside the `host`
   *
   * @returns { HTMLTemplateElement } 
   */
  get template() {
    return this.host.querySelector('template');
  }


  /**
   * Returns the app's template contents or 'document-fragment'
   * 
   * @returns { DocumentFragment }
   */
  get documentFragment() {
    return this.template.content.cloneNode(true);
  }


  /**
   * Returns the `<div id="screens">` element from the app's shadow root
   *
   * @returns { Element } 
   */
  get screensEl() {
    return this.shadowRoot.getElementById('screens');
  }


  /**
   * Returns the `<div id="pages">` element from the app's shadow root
   *
   * @returns { Element } 
   */
  get pagesEl() {
    return this.shadowRoot.getElementById('pages');
  }

  /**
   * Returns the `<div id="dialogs">` element from the app's shadow root
   *
   * @returns { Element } 
   */
  get dialogsEl() {
    return this.shadowRoot.getElementById('dialogs');
  }


  /**
   * Returns the `<div id="menus">` element from the app's shadow root
   *
   * @returns { Element } 
   */
  get menusEl() {
    return this.shadowRoot.getElementById('menus');
  }


  /* >> Private Methods << */

  /**
   * Handler that is called whenever an item changes in `liveStorage`
   * 
   * @param { Array[Object] } changedStorageItems
   */
  _handleChangedStorageItems(changedStorageItems) {
    // DEBUG [4dbsmaster]: tell me about these changed storage items ;)
    console.log(`\x1b[33m[_handleChangedStorageItems]: changedStorageItems => \x1b[0m`, changedStorageItems);
  }


  /**
   * Creates the app
   * NOTE: This method will create a template element with the formatted html from `render()`, 
   *       and add it to the corresponding host in DOM.
   *
   * @private
   */
  #create() {
    // get the formatted html template string from `render()` as `formattedHTML`
    let formattedHTML = this.render();

    // Check if the browser supports the HTML template 
    if ('content' in this.root.createElement('template')) {

      // create a `template` element
      let templateEl = this.root.createElement('template');

      // insert the `formattedHTML` into the `templateEl`
      templateEl.innerHTML = formattedHTML;

      // append this template element to the host
      this.host.append(templateEl);

      // Now, attach a shadow to the app's host element
      this.host.attachShadow({mode: 'open'}); // <- an `open` mode allows JS to modify/update the contents of shadow-root
      
       
      // append this template element inside the body
      // this.root.body.append(templateEl);

    } else { // <- Browser doesn't support HTML template element :(
      // TODO: Find another way to add the app's template content to `host` :/
      
      // DEBUG [4dbsmaster]: tell me about it ;)
      console.warn(`\x1b[34m[#create]: browser doesn't support HTML template\x1b[0m`);
    }
      

  }

  /**
   * Shows or outpus a welcome message to browser's console
   *
   * @param { String } title
   * @param { String } message
   */
  #showWelcomeMessage(title = APP_NAME, message = "welcome to our blog") {
    // display something like this first: -------------------------------
    console.log(`\x1b[2m${'-'.padEnd(50, ' -')}\x1b[0m`);

    // log the title
    console.log(`%c\`${title}\``, 'color:brown; font-size:40px');
    // log the message
    console.log(`\x1b[1m${message}\x1b[0m`);

    // display something like this last: -------------------------------
    console.log(`\x1b[2;37m${'-'.padEnd(50, ' -')}\n\x1b[0m`);
  }


  /**
   * Handler that is called when one or more screens have been loaded
   *
   * @param { Array[Object] } loadedScreen
   */
  _onScreensLoaded(loadedScreens) {
    loadedScreens.forEach((screen) => {

      // If the Splash Screen has been loaded...
      if (screen.name === SPLASH_SCREEN) {
        // ...handle the splash screen load
        this._splashScreenLoadHandler(screen.object);

      }

      // DEBUG [4dbsmaster]: tell me about it ;)
      console.log(`\x1b[33m[_onScreensLoaded](1): screen.name => ${screen.name} & screen.object => \x1b[0m`, screen.object);
    });
  }

  /**
   * Handler that is called whenever the splash screen loads 
   *
   * @param { Class } SplashScreen
   */
  _splashScreenLoadHandler(SplashScreen) {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[34m[_splashScreenLoadHandler](1): this.screensEl => `, this.screensEl);
    console.log(`\x1b[34m[_splashScreenLoadHandler](2): SplashScreen => `, SplashScreen);

    // get the root of all screens as `screensRoot`
    const screensRoot = this.getRootOf('screens');
    
    // assign the splash screen object to a app's `splashScreen` variable
    this.splashScreen = new SplashScreen('splash-screen');

    // remove the app's spinner 
    this._removeSpinner();

    // TODO: show the splash screen
    this.splashScreen.show();
    //this.splashScreen.run();
    
    
    // install a storage watcher from 'LiveStorage'
    // installStorageWatcher(this, ['lang', 'theme'], (changedStorageItems) => this._handleChangedStorageItems(changedStorageItems));

  }


  /**
   * Removes the app's spinner
   */
  _removeSpinner() {
    // Do nothing if there's no spinner
    if (!this._spinnerEl) { return }

    // remove the spinner element
    this._spinnerEl.remove();
  }


  /* >> Private Setters << */

  /* >> Private Getters << */


  /**
   * Returns the `<img id="spinner">` element
   *
   * @returns { Element } 
   */
  get _spinnerEl() {
    return this.root.getElementById('spinner');
  }




}; // <- End of `App` class



// Attach some mixins to `App`...
// Object.assign(App.prototype, EventMixin);

// Attach some behaviors to `App`...
// Object.assign(App.prototype, AppBehavior);
//


// TODO: Make this a custom element
// customElements.define('blog-js-app', BlogJsApp);
