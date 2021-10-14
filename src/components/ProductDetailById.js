import React from 'react'
import { Link } from 'react-router-dom'

import { getProductById } from '../api_interfaces/apiProduct'

class ProductDetailById extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      productData: null,
      productType: '',
      isLoading: true
    }
  }

  componentDidMount = async () => {
    this.loadProductDetailById(this.props.match.params.productId)
  }

  loadProductDetailById = async (productId) => {
    try {
      const productDetails = await getProductById(productId)
      this.setState({
        productData: productDetails.data,
        productType: productDetails.dataType,
        isLoading: false
      })
    } catch (e) {
      console.error(e)
    }
  }

  renderProduct = (productData, productType) => {
    return (
      <div style={{ margin: '1em 0', lineHeight: '1.618' }} >
        <div style={{ margin: '.5em 0' }} >Name: { productData.product_name }</div>
        <div style={{ margin: '.5em 0' }}>Price: { productData.product_price }</div>
        <div style={{ margin: '.5em 0' }}>Description: { productData.product_description }</div>
      </div>
    )
  }

  render() {

    const { productData, productType, isLoading } = this.state
    
    return (
      <div>
        <Link to={'/products'} >Back</Link>
        {
          isLoading ?
          <div style={{ textAlign: 'center' }} >Loading</div>
          :
          this.renderProduct(productData, productType)
        }
      </div>
    )
  }
}

export default ProductDetailById