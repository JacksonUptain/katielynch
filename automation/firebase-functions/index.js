const { onValueWritten } = require("firebase-functions/v2/database");
const { defineSecret } = require("firebase-functions/params");

const githubPagesDispatchToken = defineSecret("GITHUB_PAGES_DISPATCH_TOKEN");

const seoSections = new Set(["Services", "Blog", "Essays"]);

exports.dispatchGithubPagesRebuild = onValueWritten(
  {
    ref: "/Pages/{section}",
    secrets: [githubPagesDispatchToken],
  },
  async (event) => {
    const section = event.params.section;

    if (!seoSections.has(section)) {
      return;
    }

    const response = await fetch(
      "https://api.github.com/repos/JacksonUptain/katielynch/dispatches",
      {
        method: "POST",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${githubPagesDispatchToken.value()}`,
          "Content-Type": "application/json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify({
          event_type: "firebase-content-updated",
          client_payload: {
            section,
            databasePath: `/Pages/${section}`,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub repository dispatch failed with ${response.status}.`);
    }
  }
);
