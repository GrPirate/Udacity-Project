import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Books from './Books'

class AddBook extends Component {
    handleInput = (e) => {
        e.preventDefault()
        let query = e.target.value
        if (this.props.onSearchBook)
            this.props.onSearchBook(query)
    }
    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" placeholder="Search by title or author" onChange={this.handleInput}/>

                </div>
                </div>
                <div className="search-books-results">
                    <Books
                        books={this.props.books}
                        onUpdateShelf={(book, shelf) => {
                          this.props.onUpdateShelf(book, shelf)
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default AddBook