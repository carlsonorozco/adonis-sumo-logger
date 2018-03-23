'use strict'

/**
 * adonis-sumo-logger
 *
 * (c) Carlson Orozco <carlsonorozco@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const test = require('japa')
const SumoLoggerDriver = require('../src/SumoLogger')

const sysLog = {
  emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warning: 4,
  notice: 5,
  info: 6,
  debug: 7
}

test.group('Logger | SumoLogger Driver', group => {
  test('initiate logger with correct settings', assert => {
    const sumoLoggerDriver = new SumoLoggerDriver()
    sumoLoggerDriver.setConfig({
      endpoint: 'https://collectors.xx.sumologic.com/receiver/v1/http/xxxxxx=='
    })

    assert.deepEqual(sumoLoggerDriver.logger.levels, sysLog)
  })

  test('return active log level', assert => {
    const sumoLoggerDriver = new SumoLoggerDriver()
    sumoLoggerDriver.setConfig({
      endpoint: 'https://collectors.xx.sumologic.com/receiver/v1/http/xxxxxx=='
    })

    assert.equal(sumoLoggerDriver.level, 'info')
  })

  test('update log level', (assert) => {
    const sumoLoggerDriver = new SumoLoggerDriver()
    sumoLoggerDriver.setConfig({
      endpoint: 'https://collectors.xx.sumologic.com/receiver/v1/http/xxxxxx=='
    })

    sumoLoggerDriver.level = 'debug'
    assert.equal(sumoLoggerDriver.level, 'debug')
  })
})
