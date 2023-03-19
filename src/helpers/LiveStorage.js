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
* @name: Live Storage
* @type: helper
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
* @contributor: Hajar Aslan <hajar.aslan@laplateforme.io>
*
* Example usage:
*   1-|> import { LiveStorage } from './src/helpers/LiveStorage.js';
*    -|>
*    -|> const liveStorage = new LiveStorage(500);
*    -|>
*    -|> // set multiple items in your browser's local storage
*    -|> liveStorage.setItems({ lang: 'en', theme: 'dark', shape: 'circle' });
*
*
*   2-|> // Retrieve multiple items from your browser's local storage
*    -|>
*    -|> let storageItems = liveStorage.getItems('lang', 'theme', 'shape');
*    -|>   
*
*
*   3-|> // Watch an item or multiple items for their live updates / changes
*    -|> import { installStorageWatcher } from './src/helpers/LiveStorage.js';
*    -|> 
*    -|> class App extends Engine {
*    -|>   ...
*    -|>   firstUpdated() {
*    -|>     installStorageWatcher(this, ['lang', 'theme'], (changedStorageItems) => this._handleChangedStorageItems(changedStorageItems));
*    -|>   }
*    -|> }
*/


// Import a service mixin
import { serviceMixin } from './mixins/service-mixin.js';


"use strict"; 
// ^^^^^^^^^ This keeps us on our toes, as it forces us to use all pre-defined variables, among other things 😅


// Defining some constant variables...

const DEFAULT_LIVESTORAGE_DELAY = 1000; // <- 1 second
const LIVESTORAGE_SERVICE_NAME = 'live-storage';


// Creating a `LiveStorage` class...


/**
 * Class representing a live storage (aka. "A Better Local Storage")
 * NOTE: This is just an improvement to the browser's built-in `localStorage()` function
 *
 * @class
 */
export class LiveStorage {

  // Define some public attributes

  #watchlist = [];
 
  // Define some private attributes

  /**
   * Constructor of this `LiveStorage` class
   * NOTE: This constructor will be executed automatically whenever an object of this `LiveStorage` is created.
   */
  constructor(delay = DEFAULT_LIVESTORAGE_DELAY) {
    this.delay = delay; 

    // start a service named 'live-storage'
    this.startService(LIVESTORAGE_SERVICE_NAME, (storageService) => this._storageServiceHandler(storageService), delay);
  }


  /* >> public methods << */

  /**
   * Watches the given `keys` for any changes.
   * NOTE: This method adds the `keys` to a watchlist, however the process is aborted if one key already exists
   *
   * @param { Array } keys
   * @param { Function } handler - A callback function
   *
   * @returns { Boolean } result - Returns TRUE, if all keys were successfully added to a watch list
   */
  watch(keys, handler) {
    // Initialize a `result` boolean variable
    let result = false;

    // If no given key in `keys` is currently in the watchlist...
    if (!this.checkWatchlist(...keys)) {
      // ...create a watchlist object as `watchlistObj`
      let watchlistObj = {handler, keys};

      // add `watchlistObj` to `#watchlist`
      this.#watchlist.push(watchlistObj);

      // update result to TRUE
      result = true;
    }


    // return the `result`
    return result;
  }

  /**
   * Method used to set one or more `items` in the browser's local storage
   *
   * @param { Object } items - to be stored in the live storage (e.g. { lang: 'en', theme: 'dark' })
   */
  setItems(items) {
    // loop through the given `items`
    Object.entries(items).map(([key, value]) => {
      // store the key/value item in localStorage
      this.setItem(key, value);
    });
  }


  /**
   * Method used to retrieve one or more `items from the browser's local storage.
   * 
   * @param { Array[String] } keys - individual keys to get from the live storage (e.g. 'lang', 'theme'...)
   * @returns { Object } items
   */
  getItems(...keys) {
    // Initialize the `items` object variable
    let items = {};

    // for each key in `keys`...
    for (let key of [...keys]) {
      // ...get the corresponding value
      items[key] = this.getItem(key);
    }

    // return the `items`
    return items;
  }


  /**
   * Returns TRUE, if the all given `keys` exist in the local storage.
   *
   * Exmaple usage:
   *   hasItems('lang', 'theme');
   *
   * @param { Array[String] } keys - individual elements of an array as argument
   *
   * @returns { Boolean }
   */
  hasItems(...keys) {
    // Initialize the `result` variable by checking every key
    let result = false;

    // If the browser supports `Storage`...
    if (this.isStorageSupported) {
      // ...check if every key exist in `localStorage` and assign the value to `result`
      result = [...keys].every((key) => localStorage.hasOwnProperty(key));
    }

    // return `result`
    return result;
  }


  /** 
   * Sets / stores the given `key` and `value` to local storage
   * NOTE: This functionality is similar to `localStorage.setItem()` (for now)
   * TODO: Store a corresponding item type to allow item retrieval in its original data type 
   *       (mostly useful for arrays and objects)
   *
   * @param { String } key
   * @param { String|Number|Boolean } value
   */
  setItem(key, value) {
    // TODO: Make sure browser supports Storage before proceeding

    // If there's no item with this key in storage...
    if (!this.hasItems(key)) {
      // ...define a property setter & getter of this item
      Object.defineProperty(this, key, {

        get() {
          return localStorage.getItem(key);
        },

        set(newValue) {
          localStorage.setItem(key, newValue);
        },

        enumerable: true,
        configurable: true
      });
    }

    // assign the given `value` to the specified `key`.
    this[key] = value;

  }


  /**
   * Returns the value of the given `key` from storage
   *
   * @param { String } key
   *
   * @returns { String|Number|Boolean } value
   */
  getItem(key) {
    // Initialize the `value` variable
    let value = null;

    // If the storage is supported by the browser...
    if (this.isStorageSupported) value = this[key] || localStorage.getItem(key);

    // get the value 
    return value;
  }


  /**
   * Checks if the given `keys` already exist in the `liveStorage`'s watchlist.
   * 
   * Example usage:
   *    let inWatchlist = this.checkWatchlist('lang', 'theme'); // true
   *
   * @param { Array } keys
   *
   * @returns { Boolean } result - Returns TRUE, if all keys were found in `#watchlist`
   */
  checkWatchlist(...keys) {
    // IDEA: find the watch list in which all the `keys` exists, and return TRUE or FALSE respectively
    return [...keys].every((key) => this.#watchlist.find((list) => list.keys.includes(key)));
  }




  /* >> public getters << */

  
  /**
   * Returns TRUE, if the current browser supports `Storage`
   *
   * @returns { Boolean } 
   */
  get isStorageSupported() {
    // IDEA: Check for browser support of `Storage`
    return typeof(Storage) !== 'undefined' ? true : false; // <- #NN ik ;)
  }


  /* >> public setters << */


  /* >> private methods << */

  /**
   * A service handler that is called whenever every `delay` milliseconds
   *
   * @param { Object } service
   */
  _storageServiceHandler(service) {

    // DEBUG [4dbsmaster]: tell me about this awesome service handler ;)
    console.log(`\x1b[45m\x1b[2;34m[_storageServiceHandler](1): service => ${eval(service)}\x1b[30m`);
    console.log(`\x1b[45m\x1b[2;34m[_storageServiceHandler](1): watchlist => \x1b[30m`, this.#watchlist);
  }


  /* >> private getters << */
  /* >> private setters << */

}; // <- End of LiveStorage

// Attach the `serviceMixin` to this `LiveStorage`
Object.assign(LiveStorage.prototype, serviceMixin);




/**
 * A utility method to install a storage watcher on a specified `controller`
 * This watches all the given `keys` for any changes and executes the corresponding `callback` function 
 * whenever a related key changes.
 *
 * @param { Object } controller
 * @param { Array } keys
 * @param { Function } callback
 */
export const installStorageWatcher = (controller, keys, callback) => {

  // Instantiate the `LiveStorage` class as `liveStorage`
  controller.liveStorage = new LiveStorage();

  // watch the keys and attach the specified `callback`
  controller.liveStorage.watch(keys, callback);

};

