import axios from 'axios'

const PRODUCT_API_URL = 'https://dummyproducts-api.herokuapp.com/api/v1/products?apikey=5oIDTjlULgO8'
const SEARCH_PRODUCT_API_URL = (searchTerm) => {
  return `https://dummyproducts-api.herokuapp.com/api/v1/products/search?term=${searchTerm}&apikey=5oIDTjlULgO8`
}
const PRODUCT_BY_ID_API_URL = (productId) => {
  return `https://dummyproducts-api.herokuapp.com/api/v1/products/${productId}?apikey=5oIDTjlULgO8`
}

export const getProducts = async (page = 1) => {
  try {
    const productUrl = `${PRODUCT_API_URL}${page > 1 ? `&page=${page}` : ''}`
    const res = await axios.get(productUrl)
    if (!res.data) {
      throw 'No data available'
    }
    return res.data    
  } catch (e) {
    console.error('error', e)
    throw e
  }
}

export const searchProduct = async (searchTerm = '') => {
  try {
    const res = await axios.get(SEARCH_PRODUCT_API_URL(searchTerm))
    if (!res.data) {
      throw 'No data available'
    }
    return res.data    
  } catch (e) {
    console.error('error', e)
    throw e
  }
}

export const getProductById = async (productId) => {
  try {
    console.log('productId', productId)
    const res = await axios.get(PRODUCT_BY_ID_API_URL(productId))
    console.log('res', res)
    if (!res.data) {
      throw 'No data available'
    }
    return res.data    
  } catch (e) {
    console.error('error', e)
    throw e
  }
}