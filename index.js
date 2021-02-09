const ProbotExports = require("probot");
const azureFunction = require("./azure-function");

module.exports = { ...ProbotExports, createAzureFunction };

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
