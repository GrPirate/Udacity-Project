import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Books from './common/Books'

class AddBook extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onSearchBook: PropTypes.func.isRequired,
        onUpdateShelf: PropTypes.func.isRequired
    }

    handleInput = (e) => {
        e.preventDefault()
        let query = e.target.value
        if (this.props.onSearchBook)
            this.props.onSearchBook(query)
    }

    render() {

        const { books, onUpdateShelf } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" onChange={this.handleInput}/>
                </div>
                </div>
                <div className="search-books-results">
                    <Books
                        books={books}
                        onUpdateShelf={(book, shelf) => {
                          onUpdateShelf(book, shelf)
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default AddBook