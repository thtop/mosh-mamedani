console.log('Before')

const user = getUser(1)
console.log(user) //undefined

console.log('After')

// Callbacks
// Promises
// Async/await

function getUser(id) {
    setTimeout(() => {
        console.log('Reading a use from a database...')
        return { id: id, gitHubUserbane: 'Thamonwan'}
    }, 2000)
}
