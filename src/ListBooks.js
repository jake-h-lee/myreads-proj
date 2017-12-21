import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookUpdate: PropTypes.func.isRequired
  }
  
  render(){
    const {books, bookshelves, onBookUpdate} = this.props


    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {bookshelves.map((shelf) => (
              <div key={shelf} className="bookshelf">
                <h2 className="bookshelf-title">{shelf[1]}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.filter((book) => (book.shelf === shelf[0])).map((book) => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+book.imageLinks.smallThumbnail+')' }}></div>
                            <div className="book-shelf-changer">
                              <select
                                onChange={(event) => (
                                  onBookUpdate(book.id, event.target.value)
                                  )
                                }
                                defaultValue={shelf[0]}
                              >
                                <option value="none" disabled>Move to...</option>
                                {bookshelves.map((s) => (
                                  <option key={s[0]} value={s[0]} >{s[1]}</option>
                                ))}
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          {book.authors.map((author, index) => (
                            <div key={index} className="book-authors">{author}</div>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>

    )
  }

}

export default ListBooks
