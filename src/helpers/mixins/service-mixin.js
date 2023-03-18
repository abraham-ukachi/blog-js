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
* @name: Service
* @type: mixin
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
* @contributor: Hajar Aslan <hajar.aslan@laplateforme.io>
*
* Example usage:
*   1-|> import { serviceMixin } from './src/helpers/mixins/service-mixin.js';
*    -|>
*    -|> Assign.object(App.prototype, serviceMixin);
*    -|>
*
*
*   2-|> // Start or launch a service (inside a Class)
*    -|>
*    -|> const delay = 1000; // <- every 1 second
*    -|>
*    -|> const storageServiceId = this.startService('Storage', (storageService) => { 
*    -|>  this._storageServiceHandler(storageService)
*    -|> }, delay);
*    -|>   
*
*
*   3-|> // Stop or kill a running service (inside a Class)
*    -|> 
*    -|> const storageServiceId = 300;
*    -|> this.stopService(storageServiceId); 
*    -|> 
*
*   4-|> // Restart service (inside a Class)
*    -|> 
*    -|> const storageServiceId = 300;
*    -|> this.restartService(storageServiceId); 
*    -|> 
*/


// Import a service helper
// import { Service } from './helpers/service-mixin.js';


"use strict"; 
// ^^^^^^^^^ This keeps us on our toes, as it forces us to use all pre-defined variables, among other things 😅


// defining some constant variables...

const PREFIX_SERVICE_RUNNER = 'serviceRunner';

/**
 * `serviceMixin`
 * This is a mixin that is used to start, stop, restart and verify a service.
 * NOTE: A recursive method is used in this mixin for better performance.
 *
 * Example usage:
 *  (See above examples)
 */
export const serviceMixin = {

  // public properties
   
  // private properties

  /**
   * List of currently running serivces
   *
   * @type { Array[Object] }
   * @private
   */
  #_runningServices = [];


  /* >>> public methods <<< */

  /**
   * Method used to start a new service
   *
   * @param { String } name - the service name
   * @param { Function } func - a callback function to be executed every `delay` milliseconds.
   * @param { Number } delay - the time, in milliseconds the timer should delay in between executions of the specific function
   *
   * @returns { Number } sid - a unique service ID for the newly activated service.
   */
  startService(name, func, delay) {
    // Initialize the `sid` variable with a randomly generated service ID
    let sid = this._getRandomServiceId();

    // get the current timestamp as `timestamp`
    let timestamp = this._getCurrentTimestamp();

    // create a service object as `service` with the specified `name`, `sid`, `timestamp` and `delay`
    let service = {name, sid, timestamp, delay};

    // launch the service runner
    this._launchServiceRunner(service, func);

    // return the `sid`
    return sid;
  }


  /**
   * Verifies if the given `serviceId` exists in the list of running services.
   *
   * @param { Number } serviceId
   *
   * @returns { Boolean } - returns TRUE, if the specified service ID was found.
  */
  verifyServiceId(serviceId) {
    return this.#_runningServices.find((service) => service.id === randomServiceId) !== 'undefined';
  }

  /* >>> public getters <<< */

  /* >>> public setters <<< */




  /* >>> private methods <<< */

  /**
   * Launches a service runner
   * NOTE: This is a recursive function
   *
   * @param { Object } service - the service object containing the name, service id, timestamp and delay of the service to run
   * @param { Function } func - A callback function
   */
  _launchServiceRunner(service, func) {
    // setup a service runner using the service id (e.g. 'serviceRunner324'
    this[PREFIX_SERVICE_RUNNER + service.sid] = setTimeout((timer) => {
      // add a runtime to the service
      service.runtime = this._getCurrentTimestamp() - service.timestamp;

      // call back the `func`
      func(service, timer);

      // re-run the this launcher
      this._launcherServiceRunner(service, func);

    }, service.delay);
  }

  /**
   * Returns a random service ID.
   * NOTE: This is a unique ID that hasn't been used by another service
   *
   * @return { Number } randomServiceId
   */
  _getRandomServiceId() {
    // Initialize the `randomServiceId` variable,
    // by setting it to a random number between 1 and 1000
    let randomServiceId = Math.floor(Math.random(1) * 1000);

    // Making sure our service Id is actually random and unique...
    // If `randomServiceID` already exists...
    while (this.verifyServiceId(randomServiceId) == true) {
      // ...generate a new service otherwise
      randomServiceId = Math.floor(Math.random(1) * 1000);
    }

    // Return the `randomServiceId`
    return randomServiceId;
  }

  /**
   * Returns the current timestamp
   *
   * @returns { Number } - e.g. 1679161593103 
   */
  _getCurrentTimestamp() {
    return (new Date()).getTime();
  }

  /* >>> private getters <<< */


  /* >>> private setters <<< */

}; // <- End of `serviceMixin`

