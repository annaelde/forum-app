function StateMachine() {
    return {
        state: 'idle',
        do: function(action) {
            try {
                this.state = this.behavior[this.state][action]
            } catch (error) {
                throw `StateMachine Error: Tried to perform ${action} during ${this.state} state.`
            }
        },
        behavior: {
            idle: {
                // Default state before interaction
                request: 'loading'
            },
            loading: {
                // Sending a request to the server
                // Resolve/reject immediately reset the machine
                resolve: 'idle',
                reject: 'idle',
                // Update and handle used for more complicated behaviors
                update: 'updating',
                handle: 'handling'
            },
            updating: {
                // Updating based on response
                request: 'loading',
                complete: 'idle'
            },
            handling: {
                // Handling an error
                request: 'loading', // Re-request another resource
                throw: 'idle' // Reset to idle
            }
        }
    }
}

export default StateMachine
