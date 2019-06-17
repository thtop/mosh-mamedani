console.log('Before')

// Callbacks
const user = getUser(1, (user) => {
    console.log('User: ', user)

    // Get the repositiories
    getRepositories(user.getRepositories, repo => {
        console.log('Repo: ', repo)
    })
})

console.log('After')

// Promises
// Async/await

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a use from a database...')
        callback({ id: id, gitHubUserbane: 'Thamonwan'})
    }, 2000)
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Calling GitHub API...')
        callback(['repo1', 'repo2', 'repo3'])
    }, 2000)
}
