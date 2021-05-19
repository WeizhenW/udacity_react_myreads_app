import React from 'react';
import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom';

import BookSearch from './BookSearch';
import BookList from './BookList';


class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Router>
          <Route path='/search' component={BookSearch} />
          <Route path='/' exact component={BookList} />
        </Router>        
      </div>
    )
  }
}

export default BooksApp;
