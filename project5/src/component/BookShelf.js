import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Head from './Head'
import ListBooks from './ListBooks'

class BookShelf extends Component{
    state = {
        headTitle: 'MyReads',
        currentTitle: 'Currently Reading',
        wantTitle: 'Want To Read',
        readTitle: 'Read',
        books: []
    }
    render() {
      const { headTitle, currentTitle, wantTitle, readTitle } = this.state
      let books = this.props.books
      console.log(books)
      return (
        <div className="list-books">
          <Head title={headTitle} />
          <div className="list-books-content">
            <div>
              <ListBooks
                title={currentTitle}
                books={books.filter((book) => book.shelf === 'currentlyReading')}
                onUpdateShelf={(book, shelf) => {
                  this.props.onUpdateShelf(book, shelf)
                }}
              />
              <ListBooks
                title={wantTitle}
                books={books.filter((book) => book.shelf === 'wantToRead')}
                onUpdateShelf={(book, shelf) => {
                  this.props.onUpdateShelf(book, shelf)
                }}
              />
              <ListBooks
                title={readTitle}
                books={books.filter((book) => book.shelf === 'read')}
                onUpdateShelf={(book, shelf) => {
                  this.props.onUpdateShelf(book, shelf)
                }}
              />
            </div>
          </div>
          <div className="open-search">
            <Link to="/addbook">Add a book</Link>
          </div>
        </div>
      )
    }
}

export default BookShelf