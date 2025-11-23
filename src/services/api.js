const API_BASE_URL = "http://localhost:3000/api/v1";
const apiCall = async (endpoint, options = {}) => 
{
  try 
  {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = 
    {
      headers: 
      {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    if (options.body && typeof options.body === "object") 
    {
      config.body = JSON.stringify(options.body);
    }

    const response = await fetch(url, config);

    if (!response.ok) 
    {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `API error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } 
  catch (error) 
  {
    console.error("API call failed:", error);
    throw error;
  }
};

export const apiService = {
  getProducts: (params = {}) => 
  {
    const defaultParams = { limit: 1000, offset: 0, ...params };
    const queryString = new URLSearchParams(defaultParams).toString();
    return apiCall(`/products?${queryString}`);
  },

  getProductById: (id) => apiCall(`/products/${id}`),
  getProductsByCategory: (categorySlug) => 
    {
    const params = { limit: 1000, offset: 0 };
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/products/?categorySlug=${categorySlug}&${queryString}`);
    },

  getProductsByPriceRange: (min, max) => 
  {
    const params = { limit: 1000, offset: 0 };
    const queryString = new URLSearchParams(params).toString();
    return apiCall(
      `/products/?price_min=${min}&price_max=${max}&${queryString}`
    );
  },

  login: (credentials) =>
    apiCall("/auth/login", 
    {
      method: "POST",
      body: credentials,
    }),

  refreshToken: (refreshToken) =>
    apiCall("/auth/refresh-token", 
    {
      method: "POST",
      body: { refresh_token: refreshToken },
    }),

  getUsers: () => apiCall("/users"),
  getUserById: (id) => apiCall(`/users/${id}`),
  createUser: (userData) =>
    apiCall("/users", 
    {
      method: "POST",
      body: userData,
    }),

  getCategoriesFromProducts: async () => 
  {
    const products = await apiCall("/products?limit=1000");
    const categoriesMap = {};

    products.forEach((product) => 
    {
      if (product.category && product.category.slug) {
        categoriesMap[product.category.slug] = product.category;
      }
    });

    return Object.values(categoriesMap);
  },
};
