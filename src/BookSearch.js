import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import BookItem from './BookItem';


class BookSearch extends Component {
    state = {
        query: '',
        searchResult: []
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            query: e.target.value
        })

        if (e.target.value) {
            BooksAPI.search(e.target.value).then(
                (response) => {
                    this.setState({
                        ...this.state,
                        searchResult: response
                    })
                }
            )
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={() => this.props.history.push('/')}>Close</button>
                    <div className="search-books-input-wrapper">
                        <input onChange={this.handleChange} type="text" placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">{Array.isArray(this.state.searchResult) && this.state.searchResult.map(book => (<li key={book.id}><BookItem book={book} loadAllBooks={() => {}}/></li>))}</ol>
                </div>
            </div>)
    }
}

export default BookSearch;