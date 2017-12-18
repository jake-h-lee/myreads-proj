import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {

  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({query})
  }

  onBookStatusChange = () => {

  }

  render(){
    const {bookshelves, onBookStatusChange} = this.props
    const {query, books} = this.state

    if(query){
      BooksAPI.search(query).then((books) => {
        this.setState({books})
      })
    }

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                onChange={(event) => this.updateQuery(event.target.value)}
              />
          </div>
        </div>

        {books.length > 0 && (
          <div className="bookshelf">
            <br/>
            <br/>
            <div className="bookshelf-books">
                <h3>showing {books.length} matching books</h3>
              <ol className="books-grid">

                {books.map((book)=>(
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        {book.imageLinks && (
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: 'url('+book.imageLinks.smallThumbnail+')'
                            }}
                          ></div>
                        )}
                        <div className="book-shelf-changer">
                          <select defaultValue="none">
                            <option value="none" disabled>Move to...</option>

                            {bookshelves.map((s) => (
                              <option key={s[0]} value={s[0]} >{s[1]}</option>
                            ))}

                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>

                        {book.authors && (
                          book.authors.map((author, index) => (
                          <div key={index} className="book-authors">{author}</div>
                        ))
                      )}

                    </div>
                  </li>
                ))}

              </ol>
            </div>
          </div>
          )
        }
      </div>
    )

  }


}

export default SearchBooks
