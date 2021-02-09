module.exports = azureFunction;

/**
 * @param {import('probot').Probot} probot
 * @param {import('@azure/functions').Context} context
 * @param {import('@azure/functions').HttpRequest} req
 */
async function azureFunction(probot, context, req) {
  // this will be simpler once we  ship `verifyAndParse()`
  // see https://github.com/octokit/webhooks.js/issues/379
  await probot.webhooks.verifyAndReceive({
    id: req.headers["X-GitHub-Delivery"] || req.headers["x-github-delivery"],
    name: req.headers["X-GitHub-Event"] || req.headers["x-github-event"],
    signature:
      req.headers["X-Hub-Signature-256"] ||
      req.headers["x-hub-signature-256"] ||
      req.headers["X-Hub-Signature"] ||
      req.headers["x-hub-signature"],
    payload: req.body,
  });

  context.res = {
    status: "200",
    body: "ok",
  };
}
