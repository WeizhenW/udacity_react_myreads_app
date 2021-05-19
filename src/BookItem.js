import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI';

class BookItem extends Component {

    state = {
        book: this.props.book
    }

    handleSelect = (e) => {
        const newShelf = e.target.value;
        BooksAPI.update(this.state.book, newShelf).then(
                () => {
                    // this.props.loadAllBooks();
                }
        )
    }

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.state.book.imageLinks ? this.state.book.imageLinks.smallThumbnail : ''})`}}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.handleSelect} value={this.state.book.shelf ? this.state.book.shelf : 'none'}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading" >Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.state.book.title}</div>
                <div className="book-authors">{this.state.book.authors ? this.state.book.authors.map(author => (<span key={author}>{author} </span>)) : ''}</div>
            </div>
        )
    }
}

export default BookItem;