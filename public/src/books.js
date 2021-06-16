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
  //Set new variable to book.borrows object
  const borrowed = book.borrows;
  //Set new variable to map our borrowed variable
  const result = borrowed.map((borrow) => {
    //Set variable to find accoun thtat matches borrow id and account id
    const account = accounts.find((account) => borrow.id === account.id);
    //When account is found return all entries in borrow and account
    return { ...borrow, ...account };
    //Slice to start at the first index and go to the tenth
  }).slice(0, 10)
  //Return our shiny new array.
  return result
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
