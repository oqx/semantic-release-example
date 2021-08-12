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
                noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING", "Clubhouse"],
                notesPattern: (note) => /^ch[0-9]/i.test(note)
            },
            writerOpts: {
                commitsSort: ["subject", "scope"],
                transform: (str) => {
                    if(/^ch[0-9]/i.test(str)) return `Clubhouse: [${str}](https://app.clubhouse.io/curbee/story/${str})`
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