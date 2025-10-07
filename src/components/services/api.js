const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbwyATRhlwyNorgWg5HTxp_IRlMQeLbkrXh9aMAn8wXt7AOywyza-jDJJgcZud3ANFDG_A/exec';

export const apiService = {
    async getProducts(page = 1, limit = 12, search = '') {
        const params = new URLSearchParams({
            path: 'products',
            page: page.toString(),
            limit: limit.toString()
        });

        if (search) {
            params.append('search', search);
        }

        try {
            const response = await fetch(`${API_BASE_URL}?${params}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    async getProductDetail(id) {
        const params = new URLSearchParams({
            path: 'detail-product',
            id: id.toString()
        });

        try {
            const response = await fetch(`${API_BASE_URL}?${params}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching product detail:', error);
            throw error;
        }
    }
};