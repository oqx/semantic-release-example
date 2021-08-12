module.exports = {
    plugins: [
        ["@semantic-release/commit-analyzer", {
            parserOpts: {
                noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING"]
            }
        }],
        ["@semantic-release/release-notes-generator", {
            parserOpts: {
                noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING", "CH"],
            },
            writerOpts: {
                commitsSort: ["subject", "scope"],
            }
        }],
        ["@semantic-release/npm", {
            npmPublish: false,
            tarballDir: "dist",
        }],
        ["@semantic-release/github", {
            assets: "dist/*.tgz"
        }],
        "@semantic-release/git",
    ],
    branch: "master",
    preset: "angular"
}