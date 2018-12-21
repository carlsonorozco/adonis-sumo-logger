'use strict'

/**
 * adonis-sumo-logger
 *
 * (c) Carlson Orozco <carlsonorozco@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const _ = require('lodash')
const Winston = require('winston')
const SumoLogger = require('sumo-logger')

// class SumoLoggerTransport extends Winston.Transport {
//   constructor (opts) {
//     super(opts)

//     this.SumoLogger = new SumoLogger(opts)
//   }

//   log (level = '', msg = '', meta = {}, callback) {
//     this.SumoLogger.log({ level, msg, meta })
//   }
// }

class WinstonSumoLogger {
  setConfig (config) {
    /**
     * Merging user config with defaults.
     */
    this.config = Object.assign({}, {
      name: 'adonis-app',
      level: 'info',
      colorize: 'all',
      timestamp: new Date().toLocaleTimeString()
    }, config)

    /**
     * Creating new instance of winston with file transport
     */
    Winston.transports.SumoLogger = SumoLogger
    this.logger = Winston.createLogger({
      transports: [new Winston.transports.SumoLogger(this.config)]
    })

    /**
     * Updating winston levels with syslog standard levels.
     */
    this.logger.setLevels(this.levels)
  }

  /**
   * A list of available log levels
   *
   * @attribute levels
   *
   * @return {Object}
   */
  get levels () {
    return {
      emerg: 0,
      alert: 1,
      crit: 2,
      error: 3,
      warning: 4,
      notice: 5,
      info: 6,
      debug: 7
    }
  }

  /**
   * Returns the current level for the driver
   *
   * @attribute level
   *
   * @return {String}
   */
  get level () {
    return this.logger.transports[this.config.name].level
  }

  /**
   * Update driver log level at runtime
   *
   * @param  {String} level
   *
   * @return {void}
   */
  set level (level) {
    this.logger.transports[this.config.name].level = level
  }

  /**
   * Log message for a given level.
   *
   * @method log
   *
   * @param  {Number}    level
   * @param  {String}    msg
   * @param  {...Spread} meta
   *
   * @return {void}
   */
  log (level, msg, ...meta) {
    const levelName = _.findKey(this.levels, (num) => {
      return num === level
    })
    this.logger.log(levelName, msg, ...meta)
  }
}

module.exports = WinstonSumoLogger
