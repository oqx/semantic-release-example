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
                "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING"]
            },
            writerOpts: {
                commitsSort: ["subject", "scope"],
                transform: (commit) => {
                    if(commit.footer && commit.footer.startsWith('[') && commit.footer.endsWith(']')) {
                        commit.footer = commit.footer.replace('[', '').replace(']', '').replace(/ch/i, '')
                    } else if(commit.footer && commit.footer.startsWith('ch')) {
                        commit.footer = commit.footer.replace(/ch/i, '')
                    }
                    return {
                        ...commit,
                        footer: commit.footer ? `[${commit.footer}](https://app.clubhouse.io/curbee/story/${commit.footer})` : null
                    }
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