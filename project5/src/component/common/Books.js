import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Books extends Component{

    constructor(props){
        super(props);
        this.handleMove = this.handleMove.bind(this);
    }

    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateShelf: PropTypes.func.isRequired
    }

    handleMove = (e,book) => {
        if (this.props.onUpdateShelf)
            this.props.onUpdateShelf(book, e.target.value)
    }

    render() {
        
        const { books } = this.props
        
        return (
            <ol className="books-grid">
                {books.map((book) => (
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                    <select
                                        onChange={(e)=>this.handleMove(e,book)}
                                        value={book.shelf}
                                    >
                                        <option value="none" disabled checked>Move to...</option>
                                        <option value="none">None</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors}</div>
                        </div>
                    </li>
                ))}
            </ol>
        )
    }
}

export default Books