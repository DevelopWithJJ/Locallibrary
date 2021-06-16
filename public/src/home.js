function getTotalBooksCount(books) {
  //Return how many indexes are in the books array
  return books.length;
}

function getTotalAccountsCount(accounts) {
  //Return how many indexes are in the accounts array
  return accounts.length
}

function getBooksBorrowedCount(books) {
  //Set counter of borrowed books to zero
  let borrowCount = 0
  //Map new array for our books
   books.map((book) => {
     //Loop through our array to see if books were borrowed
     let borrowed = book.borrows.some((unavailable) => !unavailable.returned)
     //If borrowed is true iterate over the counter once
     if(borrowed) borrowCount++
  })
  //return counter with all the borrowed books.
  return borrowCount
}

function getMostCommonGenres(books) {
  let genres = [];
  books.forEach((book) => {
    let genreIndex = genres.findIndex((genre) => {
      return genre.name === book.genre;
    });
    if (genreIndex !== -1) {
      genres[genreIndex].count++;
    } else {
      genres.push(
        { 
          name: book.genre, 
          count: 1 }
        );
    }
  });
  genres.sort((a, b) => b.count - a.count);
  return genres.slice(0, 5);
}

function getMostPopularBooks(books) {
  let popularityBooks = [];
      books.map((book) => {
        popularityBooks.push(
          {
          "name": book.title, 
          "count": book.borrows.length
        });
      });
    popularityBooks.sort((a, b) => b.count - a.count);
   
    let numberItems = 5;
    return popularityBooks.slice(0, numberItems)
}

function _sortObjectByValue(obj) {
  //Set a variable for Object.keys method
  const keys = Object.keys(obj);
  //Return the keys sorted from least to greatest
  return keys.sort((keyA, keyB) => {
    //Check to see if keyA > keyB
    if(obj[keyA] > obj[keyB]) {
      //If so, push key to the left.
      return -1;
      //Check if keyA < keyB
    } else if(obj[KeyA] < obj[keyB]) {
      //If so, push the key to the right
      return 1;
      //Check If keyA = keyB
    } else {
      //If so, keep them in place
      return 0;
    }
  })
}

function getMostPopularAuthors(books, authors) {
  //Set variable for our reduce function
  //Use reduce to grab all borrows on a authors book
  //Destructure authors into authorId and borrows
  const count = books.reduce((acc, {authorId, borrows}) => {
    //Check to see if accumulator hold authorId
    if(acc[authorId]) {
      //If authorId there, push length of borrows into array
      acc[authorId].push(borrows.length);
    } else {
      //If not there, push the length of array into a new array
      acc[authorId] = [borrows.length];
    }
    //Return our accumulator
    return acc;
  }, {})
  //Do a loop through our reduced array
  for(let id in count){
    //Set sum to reduce our new array 
    const sum = count[id].reduce((a, b) => a+b);
    //Set that reduced count to equal sum
    count[id]=sum
  }
  //Sort the authorId from greatest to least
  const sorted = _sortObjectByValue(count);
  //Set variable to map our sorted authorIds
  let arr = sorted.map((authorId)=> {
    //Set destructed variable to find matching author
    const {name: {first, last}} = authors.find(({id}) =>  id === Number(authorId));
    // Set name to template literal of our destructed name.
    let name = `${first} ${last}`;
    //Return name with count of author id
    return {name, count:count[authorId]}
    //
  }).slice(0,5);
  return arr
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  // let popularBooks = [];
  //   books.forEach((book) => {
  //       popularBooks.push(
  //         {
  //           "authorId":book.authorId, 
  //           "count": book.borrows.length, 
  //         });
  //   });

  //   let popularAuthorsID = Array.from(
  //       popularBooks.reduce((a,{authorId,count})=> {
  //           return a.set(authorId, (a.get(authorId)||0) + count);
  //       }, new Map())
  //   ).map(([authorId,count])=>({authorId,count}));
  //   popularAuthorsID.sort((a, b) => b.count - a.count);

  //   let popularAuthors = [];
  //   popularAuthorsID.forEach((popularAuthorID) => {
  //       let authorData = authors.find((author) => {return author.id === popularAuthorID.authorId;});
  //       popularAuthors.push({"name": `${authorData.name.first} ${authorData.name.last}`, "count": popularAuthorID.count});
  //   });

  //   let numberItems=5;
  //   return popularAuthors.slice(0, numberItems);


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
