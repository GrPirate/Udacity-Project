import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Head from './Head'
import ListBooks from './ListBooks'

class BookShelf extends Component{
    state = {
        headTitle: 'MyReads',
        currentTitle: 'Currently Reading',
        wantTitle: 'Want To Read',
        readTitle: 'Read'
    }
    render() {
        return (
            <div className="list-books">
              <Head title={this.state.headTitle}/>
            <div className="list-books-content">
              <div>
                <ListBooks
                  title={this.state.currentTitle}
                  books={this.props.books.filter((book) => book.shelf === 'currentlyReading')}
                  onUpdateShelf={(book, shelf) => {
                    this.props.onUpdateShelf(book, shelf)
                  }}
                />
                <ListBooks
                  title={this.state.wantTitle}
                  books={this.props.books.filter((book) => book.shelf === 'wantToRead')}
                  onUpdateShelf={(book, shelf) => {
                    this.props.onUpdateShelf(book, shelf)
                  }}
                />
                <ListBooks
                  title={this.state.readTitle}
                  books={this.props.books.filter((book) => book.shelf === 'read')}
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