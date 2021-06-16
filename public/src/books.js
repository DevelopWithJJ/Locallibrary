function findAuthorById(authors, id) {
  //Return author that matches in our author array.
  return authors.find((author) => author.id === id) 
}

function findBookById(books, id) {
  //Return book that matches id in our book array.
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  //Set an empty array for books on loan
  const loanedBooks = [];
  //Set an empty array for books currently in library
  const notLoanedBooks = [];
  //Set empty array for all of books status.
  const finalBookArray = [];
  //Loop through our array of books
  books.forEach((book) => {
    //Set a variable that filters through our books to see if
    //if they're out on loan
    const borrowedBooks = book.borrows.filter((transaction) => {
      //Return the books that are currently on loan
      return !transaction.returned;
    })
    //Check if books on loan is greater than zeron
    if (borrowedBooks.length > 0) {
      //Push the books that are loan out to our loaned books array
      loanedBooks.push(book)
      //Push books in the library to other array
    } else notLoanedBooks.push(book);
  })
  //Push both our loaned books and in library books to our final array
  finalBookArray.push(loanedBooks, notLoanedBooks)
  //Return the final array so we can see the book status
  return finalBookArray;
}

function getBorrowersForBook(book, accounts) {
  //Set empty array
  let finalArray = [];
  //Loop through the borrow array history of each book
  book.borrows.forEach((bookOut) => {
    //Loop through the account array
    accounts.forEach((account) => {
      //Check to see if the book reserved id matches account id.
      if(bookOut.id === account.id) {
        //Push the books to the array
        finalArray.push({
          //Set keys to the corresponding variable
          id: account.id,
          returned: bookOut.returned,
          picture: account.picture,
          age: account.age,
          name: account.name,
          company: account.company,
          email: account.email,
          registered: account.registered
        })
      }
    })
  })
  //Return the final array with the first 10
  return finalArray.slice(0, 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
