import axios from 'axios'

export default axios.create({
    /// #if DEVELOPMENT
    baseURL: "https://localhost:8000/api/"
    /// #endif
})