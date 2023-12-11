module.exports = azureFunctionV4;

/**
 * @param {import('probot').Probot} probot
 * @param {import('@azure/functions').HttpRequest} request
 * @param {import('@azure/functions').InvocationContext} context
 * @returns {Promise<import('@azure/functions').HttpResponseInit>}
 */
async function azureFunctionV4(probot, request, context) {
  await probot.webhooks.verifyAndReceive({
    id: request.headers.get("X-GitHub-Delivery"),
    name: request.headers.get("X-GitHub-Event"),
    signature: request.headers.get("X-Hub-Signature-256"),
    payload: await request.text(),
  });

  return {
    status: 200,
    body: "ok",
  };
}
