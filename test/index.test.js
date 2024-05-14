const nock = require("nock");

const { createAzureFunction, Probot, ProbotOctokit } = require("../index");
const app = require("./fixtures/app");

nock.disableNetConnect();

describe("@probot/adapter-azure-actions", () => {
  let probot;

  beforeEach(() => {
    probot = new Probot({
      githubToken: "test",
      // Disable throttling & retrying requests for easier testing
      Octokit: ProbotOctokit.defaults({
        retry: { enabled: false },
        throttle: { enabled: false },
      }),
      secret: "webhooksecret123",
    });
  });

  test("happy path", async () => {
    const fn = createAzureFunction(app, { probot });

    const mock = nock("https://api.github.com")
      .post(
        "/repos/probot/adapter-azure-functions/commits/headcommitsha123/comments",
        (requestBody) => {
          expect(requestBody).toStrictEqual({
            body: "Hello from test/fixtures/app.js",
          });

          return true;
        },
      )
      .reply(201, {});

    const context = {};
    const payload = JSON.stringify(require("./fixtures/push.json"));
    const signature = await probot.webhooks.sign(payload);
    const req = {
      headers: {
        "x-github-delivery": "eventid123",
        "x-github-event": "push",
        "x-hub-signature": signature,
      },
      rawBody: payload,
    };

    await fn(context, req);

    expect(context).toStrictEqual({
      res: {
        status: "200",
        body: "ok",
      },
    });

    expect(mock.activeMocks()).toStrictEqual([]);
  });

  test("lowercase request headers", async () => {
    const fn = createAzureFunction(app, { probot });

    const mock = nock("https://api.github.com")
      .post(
        "/repos/probot/adapter-azure-functions/commits/headcommitsha123/comments",
        (requestBody) => {
          expect(requestBody).toStrictEqual({
            body: "Hello from test/fixtures/app.js",
          });

          return true;
        },
      )
      .reply(201, {});

    const context = {};
    const payload = JSON.stringify(require("./fixtures/push.json"));
    const signature = await probot.webhooks.sign(payload);
    const req = {
      headers: {
        "x-github-delivery": "eventid123",
        "x-github-event": "push",
        "x-hub-signature": signature,
      },
      rawBody: payload,
    };

    await fn(context, req);

    expect(context).toStrictEqual({
      res: {
        status: "200",
        body: "ok",
      },
    });

    expect(mock.activeMocks()).toStrictEqual([]);
  });
});
