import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import BookItem from './BookItem';


class BookSearch extends Component {
    state = {
        query: '',
        searchResult: [],
        booksOnShelves: []
    }

    componentDidMount() {
        //need to fetch the currently on shelves books, to compare with the search result
        BooksAPI.getAll().then(
            (response) => {
                this.setState({
                    ...this.state,
                    booksOnShelves: response
                })
            }
        )
    }
//handle query input
    handleChange = (e) => {
        this.setState({
            ...this.state,
            query: e.target.value
        })

        if (e.target.value) {
            BooksAPI.search(e.target.value).then(
                (response) => {
                    //check if the books in search result already on shelves, if yes => update the shelf status
                    var i, j;
                    for (i = 0; i < response.length; i++) {
                        for (j = 0; j < this.state.booksOnShelves.length; j++) {
                            if (response[i].id === this.state.booksOnShelves[j].id) {
                                response[i] = this.state.booksOnShelves[j];
                            }
                        }
                    }

                    this.setState({
                        ...this.state,
                        searchResult: response
                    })
                }
            )
        } else {
            //clear the search result when the query is empty
            this.setState({
                ...this.state,
                searchResult: []
            })
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
                    <ol className="books-grid">{Array.isArray(this.state.searchResult) && this.state.searchResult.map(book => (<li key={book.id}><BookItem book={book} loadAllBooks={() => { }} /></li>))}</ol>
                </div>
            </div>)
    }
}

export default BookSearch;