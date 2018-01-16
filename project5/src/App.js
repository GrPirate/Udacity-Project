import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import AddBook from './component/AddBook'
import BookShelf from './component/BookShelf'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  /**
   * 组件插入DOM后立即调用
   */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books)
      this.setState({ books })
    })
  }
  
  updateShelf(book, shelf) {
    BooksAPI.update(book, shelf).then(res => {
      console.log(res)
      BooksAPI.getAll()
    }).then((books) => {
      console.log(books)
      this.setState({ books })
    })
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelf
            books={this.state.books}
            onUpdateShelf={(book, shelf) => {
              this.updateShelf(book, shelf)
            }}
          />
        )} />
        <Route path="/addbook" render={() => (
          <AddBook/> 
        )} />
      </div>
    )
  }
}

export default BooksApp
