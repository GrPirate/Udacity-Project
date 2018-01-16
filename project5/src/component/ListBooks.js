import React, { Component } from 'react'
import Books from './Books'

class ListBooks extends Component{
    render(){
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
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

export default ListBooks