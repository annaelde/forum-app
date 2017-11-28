import StateMachine from '../utils/machine'

// Abstract store to extend
export const AbstractStore = {
    state: {
        data: null,
        machine: new StateMachine(),
        error: ''
    },
    mutations: {
        SET_DATA(state, data) {
            state.data = data
        },
        SET_ERROR(state, message) {
            state.error = message
        },
        SET_STATE(state, action) {
            state.machine.do(action)
        }
    }
}