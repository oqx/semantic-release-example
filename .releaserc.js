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
                "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING"],
                notesPattern: (note) => /^ch[0-9]/i.test(note)
            },
            writerOpts: {
                commitsSort: ["subject", "scope"],
                transform: (commit) => {
                    const notes = commit?.notes?.map(note => {
                        let id = note?.title
                        if(id && /^ch[0-9]/i.test(id)) {
                            if(id.startsWith('[') && id.endsWith(']')) {
                                id = id.replace('[', '').replace(']', '').replace(/ch/i, '')
                            } else if(id && id.startsWith('ch')) {
                                id = id.replace(/ch/i, '')
                            }
                             return {
                                 ...note,
                                 title: `[Clubhouse ${id}](https://app.clubhouse.io/curbee/story/${id})`
                             }
                        }
                        return note
                    })
                    return {
                        ...commit,
                        notes
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