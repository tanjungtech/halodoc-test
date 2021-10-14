import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Container from '@mui/material/Container'

// Components

import Products from './components/Products'
import ProductDetailById from './components/ProductDetailById'

const App = () => {

  // const HeaderWithRouter = withRouter(Header)

  return (
    <Router>
      <section className="section">
        <Container maxWidth="md">
          <Switch>
            <Route exact path="/products" component={Products} />
            <Route exact path="/product/:productId" component={ProductDetailById} />
          </Switch>
        </Container>
      </section>
    </Router>
  )
}

export default App
