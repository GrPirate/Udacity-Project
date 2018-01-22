import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Books from './common/Books'
import Loading from './common/Loading'

class AddBook extends Component {

    constructor(props){
        super(props);
        this.handleInput = this.handleInput.bind(this);
    }

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

        const { showLoading, books, onUpdateShelf, selfBooks } = this.props
        // 如果搜索出来的书存在于已分类的书中，则设置已分类状态
        const classedBook = books.map((searchBook) => {
            let isInSelfBooks = false
            selfBooks.forEach(book => {
                if (searchBook.id === book.id) {
                    searchBook.shelf = book.shelf;
                    isInSelfBooks = true;
                    return;
                }
            })
            if (!isInSelfBooks)
                searchBook.shelf = 'none';
            return searchBook;
        })

        return (
            <div className="search-books">
                {showLoading?(<Loading/>):('')}
                <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" onChange={this.handleInput}/>
                </div>
                </div>
                <div className="search-books-results">
                    <Books
                        books={classedBook}
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