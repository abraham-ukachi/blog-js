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





// TODO: Turn the App into a custom element by extending `HTMLElement`


// Create a `App` class
export class App extends Engine {

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
      <div id="appContainer" class="theme ${this.theme}" lang="${this.lang}">

        <!-- Screens -->
        <div id="screens"></div>

        <!-- Pages -->
        <div id="pages"></div>

        <!-- App Layout -->
        <div id="appLayout" class="flex-layout horizontal" fit>

          <!-- TODO: Create and add vertical <nav-bar> custom component here -->
          <!-- (e.g. <nav-bar type="vertical" page="home" init="au" connected responsive></nav-bar>) -->

          <!-- Vertical Nav Bar -->
          <div id="verticalNavBar" class="nav-bar"></div>
          <!-- End of Vertical Nav Bar -->

        </div>
        <!-- End of App Layout -->

        <!-- <p class="txt upper">hello from <strong>${this.id}</strong></p> -->

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



  /* >> Private Methods << */

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
   * @param { Object } splashScreen
   */
  _splashScreenLoadHandler(splashScreen) {
    // assign the splash screen object to a app's `splashScreen` variable
    this.splashScreen = splashScreen;

    // remove the app's spinner 
    this._removeSpinner();

    // TODO: show the splash screen
    // this.splashScreen.show();
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
