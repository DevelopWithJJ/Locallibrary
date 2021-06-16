function findAccountById(accounts, id) {
  return (accounts = accounts.find((account) => account.id === id));
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((nameA, nameB) => nameA.name.last > nameB.name.last ? 1:-1)
}

function getTotalNumberOfBorrows(account, books) {
  let borrowCount = 0;
  books.forEach((book) => {
    book.borrows.forEach((bookOut) => {
      if(bookOut.id === account.id) borrowCount++;
    })
  })
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
