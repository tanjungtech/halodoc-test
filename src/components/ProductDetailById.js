import React from 'react'

// import { getProducts } from '../api_interfaces/apiProduct'

class ProductDetailById extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount = async () => {
    try {
      
    } catch (e) {
      console.error(e)
    }
  }

  render() {
    
    return (
      <div>
        Product Detail By Id
        
      </div>
    )
  }
}

// const mapStateToProps = ({ auth }) => {
//   return { auth }
// }

// export default connect(mapStateToProps, null)(Dashboard)

export default ProductDetailById