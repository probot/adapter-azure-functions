# `@probot/adapter-azure-functions`

> Adapter to run a [Probot](https://probot.github.io/) application function in [Azure Functions](https://azure.microsoft.com/services/functions/)

[![Build Status](https://github.com/probot/adapter-azure-functions/workflows/Test/badge.svg)](https://github.com/probot/adapter-azure-functions/actions)

## Usage

Create your Probot Application as always

```js
// app.js
module.exports = (app) => {
  app.on("issues.opened", async (context) => {
    const params = context.issue({ body: "Hello World!" });
    await context.octokit.issues.createComment(params);
  });
};
```

### Azure Functions v4

In your Azure function file:

```js
// src/functions/probot.js
const { app } = require("@azure/functions");
const {
  createAzureFunctionV4,
  createProbot,
} = require("@probot/adapter-azure-functions");
const probotapp = require("../app");

app.http('probot', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: createAzureFunctionV4(probotapp, {
    probot: createProbot(),
  })
});
```

### Azure Functions v3

Create a folder with `function.json` and `index.js`, e.g.

```js
// ProbotFunction/function.json
{
  "bindings": [
    {
      "authLevel": "Anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": ["post"]
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    }
  ]
}
```

and

```js
// ProbotFunction/index.js
const {
  createAzureFunction,
  createProbot,
} = require("@probot/adapter-azure-functions");
const app = require("../app");
module.exports = createAzureFunction(app, {
  probot: createProbot(),
});
```

For an example Probot App continuously deployed to Azure Functions, see https://github.com/probot/example-azure-function/#how-it-works

## How it works

`@probot/adapter-azure-functions` exports everything that [`probot`](https://github.com/probot/probot/#readme) does plus `createAzureFunction`.

`createAzureFunction` slightly differs from Probot's built-in `createNodeMiddleware`, as an Azure function does receives slightly different parameters.

## License

[ISC](LICENSE)
