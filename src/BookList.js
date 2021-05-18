import React, { Component } from 'react';
import './App.css';
import * as BooksAPI from './BooksAPI';

import BookItem from './BookItem';

class BookList extends Component {
    state = {
        currentlyReading: [],
        wantToRead: [],
        read: []
    }

    componentDidMount() {
        BooksAPI.getAll().then(
          (response) => {
            console.log(response);
            this.setState({
              currentlyReading: response.filter(book => book.shelf === 'currentlyReading'),
              wantToRead: response.filter(book => book.shelf === 'wantToRead'),
              read: response.filter(book => book.shelf === 'read')
            })
          }
        )
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
                                    <li>
                                        <BookItem />
                                    </li>
                                    <li>
                                        <BookItem />
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    <li>
                                        <BookItem />
                                    </li>
                                    <li>
                                        <BookItem />
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    <li>
                                        <BookItem />
                                    </li>
                                    <li>
                                        <BookItem />
                                    </li>
                                    <li>
                                        <BookItem />
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
                </div>
            </div>
        )
    }

}

export default BookList;