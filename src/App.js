import React, { Component } from 'react'
import { Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends Component {
  state = {
    books : [],
    bookshelves : [
      ['currentlyReading', 'Currently Reading'],
      ['wantToRead', 'Want to Read'],
      ['read', 'Already Read']
    ]
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  removeBook = (book) => {
    this.setState((state) => ({
      books: state.books.filter((b) => b.id !== book.id)
    }))
    BooksAPI.remove(book)
  }

  updateBook = (book) => {
    console.log(book)
  }

  addBook = (book) => {

  }

  render() {
    const {books, bookshelves} = this.state

    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <ListBooks
            bookshelves={bookshelves}
            books={books}
            onBookUpdate={this.updateBook}
          />
        )}/>

        <Route path="/search" render={() => (
          <SearchBooks
            bookshelves={bookshelves}
            onBookUpdate={this.updateBook}
            onBookAdd={this.addBook}
          />
        )}/>

      </div>
    )

  }
}

export default BooksApp
