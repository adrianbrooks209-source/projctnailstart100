// API Service - Handles all backend communication
// ⚠️ Make sure config.js is loaded before this file

class APIService {
    constructor(baseURL) {
        this.baseURL = baseURL || API_BASE_URL;
    }

    async request(endpoint, options = {}) {
        try {
            const url = `${this.baseURL}${endpoint}`;
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            };

            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Auth endpoints
    async login(userId, password) {
        return this.request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ userId, password })
        });
    }

    async signup(userId, password, isMember = false) {
        return this.request('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ userId, password, isMember })
        });
    }

    // Notes endpoints
    async getNotes(userId) {
        return this.request(`/api/notes/${userId}`);
    }

    async saveNotes(userId, notes) {
        return this.request(`/api/notes/${userId}`, {
            method: 'POST',
            body: JSON.stringify({ notes })
        });
    }

    // Orders endpoints
    async getOrders() {
        return this.request('/api/orders');
    }

    async createOrder(orderData) {
        return this.request('/api/orders', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
    }

    async updateOrderStatus(orderId, status) {
        return this.request(`/api/orders/${orderId}`, {
            method: 'PATCH',
            body: JSON.stringify({ status })
        });
    }

    // Announcements endpoints
    async getAnnouncements() {
        return this.request('/api/announcements');
    }

    async createAnnouncement(from, message) {
        return this.request('/api/announcements', {
            method: 'POST',
            body: JSON.stringify({ from, message })
        });
    }

    // Health check
    async healthCheck() {
        try {
            return await this.request('/api/health');
        } catch (error) {
            console.error('Backend health check failed:', error);
            return null;
        }
    }
}

// Initialize API service
const api = new APIService();
