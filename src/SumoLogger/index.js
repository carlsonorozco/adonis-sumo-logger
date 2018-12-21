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
const Transport = require('winston-transport')
const SumoLogger = require('sumo-logger')

class SumoLoggerTransport extends Transport {
  constructor (opts) {
    super(opts)

    this.SumoLogger = new SumoLogger(opts)
  }

  log (info, callback) {
    setImmediate(() => {
      this.emit('logged', info)
    })

    this.SumoLogger.log(info)
  }
}

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

    const format = this.config.format || Winston.format.combine(
      Winston.format.splat(),
      Winston.format.simple()
    )

    delete this.config.format

    /**
     * Creating new instance of winston with file transport
     */
    Winston.transports.SumoLoggerTransport = SumoLoggerTransport
    this.logger = Winston.createLogger({
      format: format,
      levels: this.levels,
      transports: [new Winston.transports.SumoLoggerTransport(this.config)]
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
    return this.logger.transports[0].level
  }

  /**
   * Update driver log level at runtime
   *
   * @param  {String} level
   *
   * @return {void}
   */
  set level (level) {
    this.logger.transports[0].level = level
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
