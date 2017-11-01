import axios from 'axios'

export default axios.create({
    /// #if DEVELOPMENT
    baseURL: "http://localhost:8000/api/",
    withCredentials: true
    /// #endif
})