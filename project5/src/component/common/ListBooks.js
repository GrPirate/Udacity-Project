import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Books from './Books'

class ListBooks extends Component{

    static propTypes = {
        books: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired,
        onUpdateShelf: PropTypes.func.isRequired
    }

    render() {

        const { books, title, onUpdateShelf } = this.props
        
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
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

export default ListBooks