function findAccountById(accounts, id) {
  //Return accounts match id inputed in our accounts array.
  return (accounts = accounts.find((account) => account.id === id));
}

function sortAccountsByLastName(accounts) {
  //Return our array sorted by last name from A-Z.
  return accounts.sort((nameA, nameB) => nameA.name.last > nameB.name.last ? 1:-1)
}

function getTotalNumberOfBorrows(account, books) {
  //Set count of borrowed books to 0.
  let borrowCount = 0;
  //Loop through our array of books.
  books.forEach((book) => {
    //Loop through our borrows arry inside of each book
    book.borrows.forEach((bookOut) => {
      //Check if the book id = account id, if so add to the borrowCount by 1
      if(bookOut.id === account.id) borrowCount++;
    })
  })
  //Return how many times the book has been borrowed.
  return borrowCount
}

function getBooksPossessedByAccount(account, books, authors) {
  const result = [];
  books.forEach((book) => {
    const borrowedBooks = book.borrows.filter((bookOut) => !bookOut.returned && bookOut.id === account.id);
    if(borrowedBooks.length > 0) {
      const findAuthor = authors.find((author) => author.id === book.authorId)
      result.push({
        id: book.id,
        title: book.title,
        genre: book.genre,
        authorId: book.authorId,
        author: findAuthor,
        borrows: borrowedBooks,
      });
    }
  });
  return result
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
