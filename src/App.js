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
import { eventMixin } from './helpers/mixins/event-mixin.js';
import { installStorageWatcher } from './helpers/LiveStorage.js';
import { installRouter } from './helpers/router.js';


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

// home page types
export const PRIMARY_PAGE_TYPE = 420;
export const SECONDARY_PAGE_TYPE = 69;


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


  /**
   * Supported Themes
   *
   * @type { Array[Object] }
   */
  static get supportedThemes() {
    return [
      { id: 'classic', name: 'Classic' },
      { id: 'light', name: 'Light' },
      { id: 'dark', name: 'Dark' }
    ];
  }

  /**
   * Supported Languages
   *
   * @type { Array[Object] }
   */
  static get supportedLanguages() {
    return [
      { id: 'en', name: 'English' },
      { id: 'fr', name: 'French' },
      { id: 'ru', name: 'Russian' },
      { id: 'es', name: 'Spanish' }
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

    // set both current screen and page to null
    // (WE ARE IN BOOTING... So, no screens; no pages)
    this.currentScreen = null;
    this.currentPage = null;

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
        <div id="screens" fit hidden></div>
        <!-- End of Screens -->

        <!-- Pages -->
        <div id="pages" fit hidden></div>
        <!-- End of Pages -->

        <!-- Dialogs -->
        <div id="dialogs" fit hidden></div>
        <!-- End of Dialogs -->

        <!-- Menus -->
        <div id="menus" fit hidden></div>
        <!-- End of Menus -->

        <!-- Toasts -->
        <div id="toasts" fit hidden></div>
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

    // install a router
    installRouter(this, (location, event) => this._handleNavigation(location, event));

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
   * Returns a list of themes currently supported by this App.
   *
   * @param { Boolean } idsOnly
   *
   * @returns { Array[Object] }
   */
  getSupportedThemes(idsOnly = false) {
    // get the list of supported themes from the constructor as `supportedThemes`
    let supportedThemes = this.constructor.supportedThemes;
    // return the `supportedThemes` based on the specified `idsOnly` boolean variable
    return (idsOnly) ? supportedThemes.map((language) => language.id) : supportedThemes;
  }


  /**
   * Returns a list of languages currently supported by this App.
   *
   * @param { Boolean } idsOnly
   *
   * @returns { Array[Object] }
   */
  getSupportedLanguages(idsOnly = false) {
    // get the list of supported languages from the constructor as `supportedLanguages`
    let supportedLanguages = this.constructor.supportedLanguages;
    // return the `supportedLanguages` based on the specified `idsOnly` boolean variable
    return (idsOnly) ? supportedLanguages.map((language) => language.id) : supportedLanguages;
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
  
  /**
   * Updates the current screen of the app with the given `screen`
   *
   * @param { String } screen - name of the page
   */
  set currentScreen(screen) {
    this._currentScreen = screen;
  }

  /**
   * Updates the current page of the app with the given `page`
   *
   * @param { String } page - name of the page
   */
  set currentPage(page) {
    this._currentPage = page;
  }





  /* >> Public Getters << */

  /**
   * Returns the current screen of the app
   * @param { String }
   */
  get currentScreen() {
    return this._currentScreen;
  }

  /**
   * Returns the current page of the app 
   * @param { String } 
   */
  get currentPage() {
    return this._currentPage;
  }


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
   * Handler that is called whenever the browser's URL or location changes
   *
   * @param { String } location
   * @param { Event } event
   */
  _handleNavigation(location, event) {

    // create a url with the `location`
    let url = new URL(location);

    // Replace the base in the location with a `/`
    //location = location.replace(BASE_DIR, '/');

    // get the origin
    let origin = url.origin + BASE_DIR;

    // get the page from the `url`
    let page = url.pathname.replace(BASE_DIR, '/').split('/')[1];

    // get the view from the `url`
    let view = url.pathname.split('/').pop();

    // get the search parameters as `params`
    let params = new URLSearchParams(url.search);

    // check for screens
    let isScreens = (!page.length && !view.length) ? true : false; 

    
    // if we are most likely on a splash or welcome screen...
    if (isScreens && [SPLASH_SCREEN, WELCOME_SCREEN].indexOf(this.currentScreen) !== -1) {
      // ...navigate the screens using the params
      this._navigateScreens(params);
    }


    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[35m[_handleNavigation](1): location => ${location} & event => \x1b[0m`, event);
    console.log(`\x1b[35m[_handleNavigation](2): page => ${page} & view => ${view} & params => \x1b[0m`, params.toString());

  }

  /**
   * Method used to navigate through screens,
   * using the specified `params`
   *
   * @param { Object } params
   */
  _navigateScreens(params) {
    // NOTE: Using switch for scalability reasons ;)
    switch (this.currentScreen) {
      case SPLASH_SCREEN:
        break;
      case WELCOME_SCREEN:
        // get the change setting param as `changeSetting`
        let changeSetting = params.get('change');
        // update the welcomeScreen `changeSetting` property
        this.welcomeScreen.changeSetting = (changeSetting?.length) ? changeSetting : '';
        // open the setting container if there's a change setting 
        this.welcomeScreen.settingsOpened = (changeSetting?.length) ? true : false;
        break;
    }

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[42m\x1b[30m[_navigateScreens]: params => \x1b[0m`, params);

  }

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
   * Handler that is called when on or more pages have been loaded
   *
   * @param { Array[Object] } loadedPages
   */
  _onPagesLoaded(loadedPages) {
    // loop through the pages
    loadedPages.forEach((page) => {
      // If the Home Page has been loaded...
      if (page.name === HOME_PAGE) {
        // ...handle the home page load
        this._homePageLoadHandler(page.object);
      }
    });

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[34m[_onPagesLoaded]: page.name => ${page.name} & page.object => \x1b[0m`, page.object);
  }

  /**
   * Handler that is called when the home page loads
   *
   * @param { Class } HomePage
   */
  _homePageLoadHandler(HomePage) {
    // If there's no `homePage` object in this `App`...
    if (!this.homePage) {
      // ...create an object of `HomePage` class as `homePage`
      this.homePage = new HomePage(PRIMARY_PAGE_TYPE);
    }

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[34m[_homePageLoadHandler](1): this.pagesEl => `, this.pagesEl);
    console.log(`\x1b[34m[_homePageLoadHandler](2): HomePage => `, HomePage);
  }


  /**
   * Handler that is called when one or more screens have been loaded
   *
   * @param { Array[Object] } loadedScreen
   */
  _onScreensLoaded(loadedScreens) {
    // unhide the `screens` element
    this.screensEl.hidden = false;

    loadedScreens.forEach((screen) => {

      // If the Splash Screen has been loaded...
      if (screen.name === SPLASH_SCREEN) {
        // ...handle the splash screen load
        this._splashScreenLoadHandler(screen.object);

      }

      // If the Welcome Screen has been loaded...
      if (screen.name === WELCOME_SCREEN) {
        // ...handle the welcome screen load
        this._welcomeScreenLoadHandler(screen.object);
      }

      // DEBUG [4dbsmaster]: tell me about it ;)
      console.log(`\x1b[33m[_onScreensLoaded](1): screen.name => ${screen.name} & screen.object => \x1b[0m`, screen.object);
    });
  }

  /**
   * Handler that is called whenever the welcome screen loads
   *
   * @param { Class } WelcomeScreen
   */
  _welcomeScreenLoadHandler(WelcomeScreen) {
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[34m[_welcomeScreenLoadHandler](1): this.screensEl => `, this.screensEl);
    console.log(`\x1b[34m[_welcomeScreenLoadHandler](2): WelcomeScreen => `, WelcomeScreen);

    // get the root of all screen as `screensRoot`
    const screensRoot = this.getRootOf('screens');

    // assign the welcome screen object to a app's `welcomeScreen` variable
    this.welcomeScreen = new WelcomeScreen('welcome-screen');

    // set the animation duration to 500
    this.welcomeScreen.setSlideDuration(500);

    // listen to the `last-step` event
    this.welcomeScreen.on('last-step', () => { 
      /* TODO: start loading the home page */
      // If there's no `homePage` in `App`
      if (!this.homePage) {
        // ...load the home page
        this._loadPages([HOME_PAGE]).then((loadedPages) => this._onPagesLoaded(loadedPages));
      }
    });

    // listen to the `start` event
    this.welcomeScreen.on('start', () => { 
      /* TODO: load again & show the home page */
      
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

    // listen to the `almost-complete` event
    this.splashScreen.on('almost-complete', (target) => { 
      // stop/pause the progress 
      target.stopProgress();

      // load the welcome screen 
      this._loadScreens([WELCOME_SCREEN]).then((loadedScreens) => {
        this._onScreensLoaded(loadedScreens);

        // continue the progress
        target.startProgress();

        // complete the progress
        // this.splashScreen.completeProgress();
        
      }); 
       
      // DEBUG [4dbsmaster]: tell me about it ;)
      console.log(`\x1b[44m[_splashScreenLoadHandler](almost-complete|event)\x1b[0m`);
    });


    // listen to the 'progress-complete' event
    this.splashScreen.on('progress-complete', (target) => {
      // TODO: Check the last time the welcome screen was shown and navigate to it accordingly

      // hide the splash screen
      target.hide();

      // show the welcome screen
      this.welcomeScreen.show();

      // set the current screen to welcome screen
      this.currentScreen = WELCOME_SCREEN;

      // DEBUG [4dbsmaster]: tell me about it ;)
      console.log(`\x1b[44m[_splashScreenLoadHandler](progress-complete|event) target => \x1b[0m`, target);
    });

    // remove the app's spinner 
    this._removeSpinner();

    // TODO: show the splash screen
    this.splashScreen.show();
    //this.splashScreen.run();
    
    // set the current screen to splash screen obv. ;)
    this.currentScreen = SPLASH_SCREEN;
    
    
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
Object.assign(App.prototype, eventMixin);

// Attach some behaviors to `App`...
// Object.assign(App.prototype, AppBehavior);
//


// TODO: Make this a custom element
// customElements.define('blog-js-app', BlogJsApp);
