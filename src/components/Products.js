import React from 'react'
import { Link } from 'react-router-dom'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { getProducts, searchProduct } from '../api_interfaces/apiProduct'

const NO_DATA = 'No data available'

class Products extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      productList: [],
      productDataType: '',
      lastPage: 0,
      numOfResults: 0,
      productPage: 0,
      isLoading: true,
      errorMessage: undefined,
      searchValue: ''
    }
  }

  componentDidMount = async () => {
    this.loadProductList()
  }

  loadProductList = async (value = null) => {
    try {
      const productListResult = await getProducts(value)
      this.setState({
        productList: productListResult.data,
        productDataType: productListResult.datatype,
        lastPage: productListResult.lastPage,
        numOfResults: productListResult.numOfResults,
        productPage: productListResult.page,
        isLoading: false
      })
    } catch (e) {
      console.error(e)
      this.setState({
        errorMessage: NO_DATA,
        isLoading: false
      })
    }
  }
  
  closeSearch = (e) => {
    this.setState({
      isLoading: true,
      searchValue: '',
      errorMessage: undefined
    })
    this.loadProductList()
  }

  handleChangePage = async (e, value) => {
    this.setState({
      isLoading: true
    })
    this.loadProductList(value)
  }

  handleChangeInput = (e, name) => {
    this.setState({
      [name]: e.target.value
    })
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.handleSubmitSearch();
    }
  }

  handleSubmitSearch = async () => {
    const { searchValue } = this.state
    this.setState({
      isLoading: true
    })
    try {
      const searchResult = await searchProduct(searchValue)
      this.setState({
        productList: searchResult.data,
        productDataType: searchResult.datatype,
        lastPage: searchResult.lastPage,
        numOfResults: searchResult.numOfResults,
        productPage: searchResult.page,
        isLoading: false
      })
    } catch (e) {
      console.error(e)
      this.setState({
        errorMessage: NO_DATA,
        isLoading: false,
        productDataType: 'SEARCH QUERY'
      })
    }
  }

  productTable = (productList, productPage, lastPage) => {
    if (productList.length) {
      return (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 600 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productList.map((product) => (
                  <TableRow
                    key={product._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row"><Link to={`/product/${product._id}`}>{product.product_name}</Link></TableCell>
                    <TableCell>{product.product_price}</TableCell>
                    <TableCell align="center">
                      <Button>Add</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Stack spacing={10} style={{ margin: '1em 0', float: 'right' }} >
            <Pagination count={ lastPage } page={ productPage } onChange={ (e, value) => this.handleChangePage(e, value) } />
          </Stack>
        </div>
      )
    }
  }

  render() {

    const { productList, productPage, productDataType, lastPage, isLoading, searchValue, errorMessage } = this.state

    return (
      <div style={{ margin: '1em 0' }} >
        <div style={{ margin: '1em 0' }} >
          <TextField placeholder='Search by name' style={{ width: 400 }} disabled={ productDataType === 'SEARCH QUERY' } value={ searchValue } onChange={(e) => this.handleChangeInput(e, 'searchValue')} onKeyPress={(e) => this.handleKeyPress(e) } />
          {
            productDataType === 'SEARCH QUERY' &&
            <Button style={{ fontSize: '12px', margin: '1em', fontWeight: '700' }} onClick={ (e) => this.closeSearch(e) } >Close</Button>
          }
        </div>
        { isLoading ?
          <div style={{ textAlign: 'center' }} >Loading</div>
          :
          errorMessage ?
          <div style={{ textAlign: 'center' }} >{ errorMessage }</div>
          :
          this.productTable(productList, productPage, lastPage)
        }
      </div>
    )
  }
}

export default Products