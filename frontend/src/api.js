import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api', // Pointing to our backend
});

// Add a request interceptor to attach 'x-role: admin' for admin routes if the user is an admin
// Actually, for simplicity, we can pass headers directly in the admin API calls, or check a global state.
// Let's create helper functions for different API calls to centralize logic.

export default API;
