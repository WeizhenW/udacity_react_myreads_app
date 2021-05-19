import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';

import BookItem from './BookItem';

class BookList extends Component {
    state = {
        currentlyReading: [],
        wantToRead: [],
        read: []
    }

    loadAllBooks = () => {
        BooksAPI.getAll().then(
            (response) => {
                this.setState({
                    currentlyReading: response.filter(book => book.shelf === 'currentlyReading'),
                    wantToRead: response.filter(book => book.shelf === 'wantToRead'),
                    read: response.filter(book => book.shelf === 'read')
                })
            }
        )
    }

    componentDidMount() {
        this.loadAllBooks();
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {this.state.currentlyReading.map(book => (<li key={book.id}><BookItem book={book} loadAllBooks={this.loadAllBooks} /></li>))}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {this.state.wantToRead.map(book => (<li key={book.id}><BookItem book={book} loadAllBooks={this.loadAllBooks} /></li>))}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {this.state.read.map(book => (<li key={book.id}><BookItem book={book} loadAllBooks={this.loadAllBooks} /></li>))}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="open-search">
                    <button onClick={() => window.location.href = '#/search'}>Add a book</button>
                </div>
            </div>
        )
    }
}

export default BookList;