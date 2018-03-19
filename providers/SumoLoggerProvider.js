'use strict'

/**
 * adonis-sumo-logger
 *
 * (c) Carlson Orozco <carlsonorozco@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const { ServiceProvider } = require('@adonisjs/fold')

class SumoLoggerProvider extends ServiceProvider {
  /**
   * Register all the required providers
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this.app.extend('Adonis/Src/Logger', 'sumologger', () => {
      const SumoLogger = require('../src/SumoLogger')
      return new SumoLogger()
    })
  }
}

module.exports = SumoLoggerProvider
