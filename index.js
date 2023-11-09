const ProbotExports = require("probot");
const azureFunction = require("./azure-function");
const azureFunctionV4 = require("./azure-function-v4");

module.exports = { ...ProbotExports, createAzureFunction, createAzureFunctionV4 };

/**
 *
 * @param {import('probot').ApplicationFunction} app
 * @param { { probot: import('probot').Probot } } options
 */
function createAzureFunction(app, { probot }) {
  // load app once outside of the function to prevent double
  // event handlers in case of container reuse
  probot.load(app);

  return azureFunction.bind(null, probot);
}

/**
 * @param {import('probot').ApplicationFunction} app
 * @param { { probot: import('probot').Probot } } options
 */
function createAzureFunctionV4(app, { probot }) {
  // load app once outside of the function to prevent double
  // event handlers in case of container reuse
  probot.load(app);
  return azureFunctionV4.bind(null, probot);
}
