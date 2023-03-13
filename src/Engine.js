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
* @name: Engine
* @type: script
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
* @contributor: Hajar Aslan <hajar.aslan@laplateforme.io>
*
* Example usage:
*
*   1-|> import './Engine';
*    -|> 
*    -|> class App extends Engine {
*    -|> 
*    -|>  constructor() { super(App) }
*    -|> 
*    -|> }
*
*
*   2-|> // Create a `sleeping` boolean property in App class
*    -|>
*    -|> class App extends Engine {
*    -|>   ...
*    -|>   static get properties() {
*    -|>
*    -|>    return {
*    -|>      sleeping: { type: Boolean }
*    -|>    };
*    -|>  }
*    -|>  ...
*    -|>
*
*   3-|> // Initialize the `sleeping` boolean property in `init()` method
*    -|>
*    -|> class App extends Engine {
*    -|>   ...
*    -|>   init() {
*    -|>     this.sleeping = false;
*    -|>  }
*    -|>  ...
*    -|>
*
*   4-|> // Get the value of `sleeping` property with the App object
*    -|>
*    -|> let app = new App();
*    -|> let sleeping = app.getProperty('sleeping');
*    -|> console.log(sleeping);
*    -|>
*    =|o> true
*/


import { loaderMixin } from './helpers/mixins/loader-mixin.js';

"use strict"; 
// ^^^^^^^^^ This keeps us on our toes, as it forces us to use all pre-defined variables, among other things 😅





// Defining some constant variables...

const PROPERTY_UPDATE_DELAY = 200; 



// Creating a `Engine` class...


/**
 * Class representing an app engine.
 *
 * @class
 */
export class Engine {

  // public properties

  // private properties  

  /**
   * The Property Object
   * This contains the initial, old and new/value properties
   *
   * @type { Object }
   * @private
   **/
  #_props = {init: {}, old: {}, value: {}};

  /**
   * Controller
   *
   * @type { Class }
   */
  #_controller = null; // <- the controller

  /**
   * Changed properties
   * This is just a 'temporary' list of properties that have changed
   *
   * @type { Array }
   * @private
   */
  #_changedProps = [];


  /**
   * Properties Update Timer
   *
   * @type { setTimeout } 
   */
  #_propsUpdateTimer = null;






  /**
   * Constructor of the engine
   *
   * @param { Class } controller - The child class that inherits this `Engine` class
   */
  constructor(controller) {
    // Initialize the private `_controller` variable
    this.#_controller = controller;

    // If this `_controller` has some properties...
    if (this.#_controller.hasOwnProperty('properties')) {
      // ...call the properties initializer of the engine's controller
      this.#_propertiesInitializer(this.#_controller.properties);
    }


    // call the `init()` public method
    this.init();

  }



  /* >> Public Methods << */

  /**
   * The first method that is called when this engine is instantiated or inherited.  
   * NOTE: Any user can override this method
   */
  init() {}
  
  /**
   * Runs the engine
   * NOTE: Any user can override this method
   */
  run() {}

  /**
   * Handler that is called whenever a property gets reset
   * NOTE: The user can override this method
   *
   * @param { String } prop - The name of the property that was reset
   * @param { String|Number|Boolean|Array } value - The value the property after reset
   * @param { String|Number|Boolean|Array } oldValue - The value of the property before reset
   *
   */
  propertyResetHandler(prop, value, oldValue) {}


  /**
   * Method used to set and initialize or create a new property 
   * with the given `propName`, `propType` and `propValue`
   *
   * @param { String } propName
   * @param { String } propType
   * @param { String|Number|Boolean|Array } propValue
   *
   * @returns { Boolean } result - Returns TRUE, if the property was set successfully ;)
   */
  setProperty(propName, propType, propValue) {
    // Initialize the `result` variable
    let result = false;

    // do nothing if controller has no properties
    if (!this.#_controller.properties) { return result }
    
    // Checking if a property with this name already exists, using our beloved ternary statement...
    let propFound = Object.keys(this.#_controller.properties).includes(propName) ? true : false;

    if (!propFound) {
      // add the property to the controller's properties list
      this.#_controller.properties[propName] = { type: propType };

      this.#_props.init[propName] = undefined;
      this.#_props.value[propName] = propValue;
      this.#_props.old[propName] = undefined;


      // Define a setter for this `propName`
      this.__defineSetter__(propName, (propValue) => this.#_propertySetter(propName, propValue));

      // Define a getter for this `propName`
      this.__defineGetter__(propName, this.#_propertyGetter);

      // Set the result to TRUE
      result = true;
    }


    // return `result`
    return result;
    
  }

  /**
   * Returns the property value of the given `propName`
   *
   * @returns { String|Number|Boolean|Array }
   */
  getProperty(propName) {
    return this.#_props.value[propName];
  }

  /* >> Public Setters << */

  /* >> Public Getters << */





  /* >> Private Methods << */

  /**
   * Resets the property with the given `propName` to it's initial state / value
   *
   * @param { String } propName - The name of an existing property to be reset
   * @param { Boolean } notifyController - If TRUE, this engine or controller will be notified of this recent change
   */
  _resetProperty(propName, notifyController = false) {
    // Get the initial prop value from the private `#_props` as `value`
    let value = this.#_props.init[propName];
    // Get the old prop value as `oldValue`
    let oldValue = this[propName];

    // Assign this `value` to the corresponding `propName`
    this[propName] = value;

    // If the controller should be notified (i.e. `notifyController` is TRUE)...
    if (notifyController) {
      // Call the `propertyResetHandler()` to notify this engine or controller that a property has been reset
      this.propertyResetHandler(propName, value, oldValue);
    }

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[35m[resetProperty]: propName => ${propName} & notifyController ? ${notifyController}\x1b[0m`);
    
  }


  /**
   * Method used to initialize all the given properties
   *
   * @param { Object } properties
   * @private
   */
  #_propertiesInitializer(properties) {
    // Loop through all [name, data] of the properties
    Object.entries(properties).map(([propName, propData]) => { 
      // Initialize the `propValue` variable by setting it to 'undefined'
      let propValue = undefined; //propData.type();

      // assign this undefined `propValue` to the current property's value
      this.#_props.value[propName] = propValue;

      // Define a setter for this `propName`
      this.__defineSetter__(propName, (propValue) => this.#_propertySetter(propName, propValue));

      // Define a getter for this `propName`
      this.__defineGetter__(propName, this.#_propertyGetter);

    });

  }

    /**
     * Setter for the given `propName` property
     *
     * @param { String } propName - The name of the property
     * @param { String|Number|Boolean|Array } propValue - The new value of the property
     * @private
     */
    #_propertySetter(propName, propValue) {
      // Do nothing if the given `propValue` type is not the same as
      // the specified type of the corresponding controller property, using a nullish coalescing operator ('?.').
      if (typeof propValue !== typeof this.#_controller.properties?.[propName].type()) { return }
       
      // Get the old value of this property as `oldPropValue`
      // let oldPropValue = this.#_props.old[propName];

      // Get the current value of this property as `currentPropValue`
      let currentPropValue = this.#_props.value[propName];


      
      // If the current value is not the same as the given `propValue`... 
      if (currentPropValue !== propValue) {
        // ...Check if the initial value of this property has been set...
        if (typeof this.#_props.init[propName] === 'undefined') { // <- ...if it hasn't or undefined...
          // ...set it !
          this.#_props.init[propName] = propValue;
          // Also, set the current value to `propValue`
          this.#_props.value[propName] = propValue;

          // 
        } else { // <- the initial value has already been set, therefore this is a #propertyUpdate
          // So, let's update the current value with the given `propValue`
          this.#_props.value[propName] = propValue;
          
          // Add this property's name to the list of changed properties (i.e. `#_changedProps`)
          this.#_changedProps.push(propName);

          // Update the old property value w/ the current (not new)
          this.#_props.old[propName] = currentPropValue;


          // Clear any active timer for property update`propsUpdateTimer`
          clearTimeout(this.#_propsUpdateTimer);

          // Setup a private timer for property update named `#_propsUpdateTimer`
          this.#_propsUpdateTimer = setTimeout(() => {
            
            // Map the `#_changedProperties` and asign the returned list to `changedProperties` variable
            let changedProperties = this.#_changedProps.map((propName) => {
              return {
                name: propName, 
                value: this.#_props.value[propName],
                oldValue: this.#_props.old[propName]
              };
            });

            // call the `propertiesUpdated()` handler with one argument: `changedProperties`
            this.propertiesUpdated(changedProperties);

          }, PROPERTY_UPDATE_DELAY);

        } // <- End of else

      }


      // DEBUG [4dbsmaster]: tell me about it ;)
      // console.log(`[_propertySetter](1): propName => ${propName} & propValue => ${propValue}`); 
      // console.log(`[_propertySetter](2): currentPropValue => ${currentPropValue}`); 


    }


    /**
     * Getter for the given `propName` property
     * 
     * @param { String|Number|Boolean|Array } propValue
     */
    #_propertyGetter(propName) {
      return this.#_props.value[propName];
      // return this[`__${propName}`];
    }


  /* >> Private Setters << */

  /* >> Private Getters << */




}; // <- End of `Engine` class


// Attach the loader mixin to the engine
Object.assign(Engine.prototype, loaderMixin);
