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
    books: [],
    searchBooks: []
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

  /**
   * 
   * @param {*Array} book 书本详情
   * @param {*String} shelf 书架分类
   */
  updateShelf(book, shelf) {
    BooksAPI.update(book, shelf)
      .then(res => BooksAPI.getAll())
      .then((books) => {
        this.setState({ books })
      })
  }

  searchBook(query){
    BooksAPI.search(query)
    .then((books)=>{
      this.setState({
        searchBooks: books
      })
    })
  }

  render() {

    let { books = [], searchBooks = [] } = this.state

    // books不为数组时重新赋值
    if (!Array.isArray(books))
      books = []
    if (!Array.isArray(searchBooks))
      searchBooks = [] 
    
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelf
            books={books}
            onUpdateShelf={(book, shelf) => {
              this.updateShelf(book, shelf)
            }}
          />
        )} />
        <Route path="/addbook" render={({history}) => (
          <AddBook
            books={searchBooks}
            onSearchBook={(query) =>{
              this.searchBook(query)
            }}
            onUpdateShelf={(book, shelf) => {
              this.updateShelf(book, shelf)
              history.push("/")
            }}
          /> 
        )} />
      </div>
    )
  }
}

export default BooksApp
