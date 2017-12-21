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

  componentWillMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }


  updateBook = (id, shelf) => {
    BooksAPI.get(id).then((book) => {
      BooksAPI.update(book, shelf).then((res) => {
        BooksAPI.getAll().then((books) => {
          this.setState({books})
        })
      })
    })
  }

  findDefaultValue = (id) => {
    for(var i=0, books = this.state.books; i<books.length; i++){
      if(books[i].id === id){
        return books[i].shelf
      }
    }
    return 'none'
  }

  render() {
    const {books, bookshelves} = this.state

    if(books){
      BooksAPI.getAll().then((books) => {
        this.setState({books})
      })
    }

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
            getDefaultValue={this.findDefaultValue}
          />
        )}/>

      </div>
    )

  }
}

export default BooksApp
