declare module "@probot/adapter-azure-functions" {
    import ProbotExports = require("probot");

    /**
     * @param {import('probot').ApplicationFunction} app
     * @param { { probot: import('probot').Probot } } options
     */
    function createAzureFunction(app: ProbotExports.ApplicationFunction, { probot }: {
        probot: ProbotExports.Probot;
    }): any;

    /**
     * @param {import('probot').ApplicationFunction} app
     * @param { { probot: import('probot').Probot } } options
     */
    function createAzureFunctionV4(app: ProbotExports.ApplicationFunction, { probot }: {
        probot: ProbotExports.Probot;
    }): any;

    const _exports: {
        createAzureFunction: typeof createAzureFunction;
        createAzureFunctionV4: typeof createAzureFunctionV4;
        Context: typeof ProbotExports.Context;
        ProbotOctokit: typeof import("@octokit/core").Octokit & import("@octokit/core/dist-types/types").Constructor<{
            retry: {
                retryRequest: (error: import("@octokit/request-error").RequestError, retries: number, retryAfter: number) => import("@octokit/request-error").RequestError;
            };
        } & {
            paginate: import("@octokit/plugin-paginate-rest").PaginateInterface;
        } & import("@octokit/plugin-rest-endpoint-methods/dist-types/generated/method-types").RestEndpointMethods & import("@octokit/plugin-rest-endpoint-methods/dist-types/types").Api & import("@probot/octokit-plugin-config/dist-types/types").API>;
        run: typeof ProbotExports.run;
        Probot: typeof ProbotExports.Probot;
        Server: typeof ProbotExports.Server;
        createNodeMiddleware: typeof ProbotExports.createNodeMiddleware;
        createProbot: typeof ProbotExports.createProbot;
    };

    export = _exports;
}
//# sourceMappingURL=index.d.ts.map