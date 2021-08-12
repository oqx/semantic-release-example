module.exports = {
    plugins: [
        ["@semantic-release/commit-analyzer", {
            preset: "angular",
            parserOpts: {
                noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING"]
            }
        }],
        ["@semantic-release/release-notes-generator", {
            preset: "angular",
            parserOpts: {
                noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING", "CH"],
            },
            writerOpts: {
                commitsSort: ["subject", "scope"],
                transform: (str) => {
                    if(/^ch: [0-9]/i.test(str) || /^ch:[0-9]/i.test(str)) {
                        try {
                            const id = str.split(':').slice(-1)[0].trim()
                            return `CH: [${id}](https://app.clubhouse.io/curbee/story/${id})`
                        } catch(_err) {
                            return str
                        }
                    }
                    return str
                }
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