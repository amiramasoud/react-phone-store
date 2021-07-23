import React, { Component } from "react"
import { storeProducts, detailProduct } from "./data"

const ProductContext = React.createContext()

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modal: false,
    modalProduct: detailProduct,
    cartSubtotal: 0,
    cartTax: 0,
    cartTotal: 0
  }
  componentDidMount() {
    this.setProducts()
  }
  setProducts = () => {
    let tempProducts = []
    storeProducts.forEach(item => {
      const singleItem = { ...item } //  الdestructing بيخليني باخد كوبي مش الريفرنس شخصيا
      tempProducts = [...tempProducts, singleItem]
      // console.log(products)
      this.setState(() => {
        return { products: tempProducts }
      })
    })
  }

  getItem = id => {
    const product = this.state.products.find(item => item.id === id)
    return product
  }

  handleDetail = id => {
    const product = this.getItem(id)
    this.setState(() => {
      return { detailProduct: product }
    })
  }

  // or
  // handleDetail = id => {
  //   const Product = this.state.products.find(item => item.id === id)
  //   this.setState({ detailProduct: Product })
  // }

  addToCart = id => {
    const tempProducts = [...this.state.products]
    const index = tempProducts.indexOf(this.getItem(id))
    const Product = tempProducts[index]
    Product.inCart = true
    Product.count = 1
    const price = Product.price
    Product.total = price
    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, Product] }
      },
      () => {
        this.addTotals()
      }
    )
  }

  // or

  // addToCart = id => {
  //   const product = this.getItem(id)
  //   product.inCart = true
  //   product.count = 1
  //   const price = product.price
  //   product.total = price
  //   this.setState(()=>{
  //     return {cart: [...this.state.cart,product]}
  //   })
  // }

  openModal = id => {
    const product = this.getItem(id)
    this.setState(() => {
      return { modal: true, modalProduct: product }
    })
  }

  closeModal = () => {
    this.setState(() => {
      return { modal: false }
    })
  }

  icrement = id => {
    const tempCart = [...this.state.cart]
    const selectedProduct = tempCart.find(item => item.id === id)
    const index = tempCart.indexOf(selectedProduct)
    const product = tempCart[index]
    product.count = product.count + 1
    product.total = product.price * product.count
    this.setState(
      () => {
        return { cart: [...tempCart] }
      },
      () => {
        this.addTotals()
      }
    )
  }
  decrement = id => {
    const tempCart = [...this.state.cart]
    const selectedProduct = tempCart.find(item => item.id === id)
    const index = tempCart.indexOf(selectedProduct)
    const product = tempCart[index]
    product.count = product.count - 1
    if (product.count === 0) {
      this.removeItem(id)
    } else {
      product.total = product.price * product.count
      this.setState(
        () => {
          return { cart: [...tempCart] }
        },
        () => {
          this.addTotals()
        }
      )
    }
  }
  removeItem = id => {
    let tempProducts = [...this.state.products]
    let tempCart = [...this.state.cart]
    tempCart = tempCart.filter(item => item.id !== id)
    const index = tempProducts.indexOf(this.getItem(id))
    const removedItem = tempProducts[index]
    removedItem.inCart = false
    removedItem.count = 0
    this.setState(
      () => {
        return { products: tempProducts, cart: tempCart }
      },
      () => {
        this.addTotals()
      }
    )
  }
  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] }
      },
      () => {
        this.setProducts()
        this.addTotals()
      }
    )
  }

  addTotals = () => {
    let subtotal = 0
    this.state.cart.map(item => (subtotal += item.total))
    const tempTax = subtotal * 0.1
    const tax = parseFloat(tempTax.toFixed(2))
    const total = subtotal + tax
    this.setState(() => {
      return { cartSubtotal: subtotal, cartTax: tax, cartTotal: total }
    })
  }

  render() {
    return <ProductContext.Provider value={{ ...this.state, handleDetail: this.handleDetail, addToCart: this.addToCart, openModal: this.openModal, closeModal: this.closeModal, icrement: this.icrement, decrement: this.decrement, removeItem: this.removeItem, clearCart: this.clearCart }}>{this.props.children}</ProductContext.Provider>
  }
}

const ProductConsumer = ProductContext.Consumer

export { ProductProvider, ProductConsumer }
