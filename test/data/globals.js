module.exports = {

 /*
  * This controls whether to abort the test execution when an assertion failed and skip the rest.
  * It's being used in waitFor commands and expect assertions {nightwatch setting}
  */
  abortOnAssertionFailure : false,

 /*
  * Default timeout value in milliseconds for waitFor commands and implicit waitFor value for
  * expect assertions. Time in ms {nightwatch setting}
  *
  */
  waitForConditionTimeout : 10000,

 /*
  * Timeout value that can be easily accessed in tests and page objects. Time in ms
  */
  TIMEOUT : 10000,

  /**
   *  Pause that is used inside tests.
   */

  TEST_PAUSE: 2000,

  /*
   * Escape characters for useful KEYS
   */
  KEYS: {
    BACKSPACE: "\b"
  }


};