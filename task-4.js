// А можно поподробнее, что надо именно тут сделать, юзать только async/await без изменения самого файла db? или же тут надо просто поубирать вложенность
// немного не понял задачу :(
// ниже я не стал доделывать, решил уточнить

import { database } from "./db";

const buyBookForUser = async (bookId, userId, callback) => {
  const { getUser, getUsersBook, buyBook } = database;

  await getUser(userId, async (err, user) => {
    try {
      await getUsersBook(user?.id, (err, userBooks) => {
        if (userBooks?.includes(bookId)) {
          callback(`User already has book with id=${bookId}`);
        } else {
          buyBook(bookId, (err) => {
            if (err) {
              callback(err);
            } else {
              callback(null, "Success");
            }
          });
        }
      });
    } catch (e) {
      return callback(e);
    }
  });
};

buyBookForUser(1, 1, (err, message) => {
  console.log("err", err); // null
  console.log("message", message); // 'Success'
});

buyBookForUser(1, 2, (err, message) => {
  console.log("err = 2", err); // 'User already has book with id=1'
  console.log("message = 2", message); // undefined
});

buyBookForUser(3, 2, (err, message) => {
  console.log(err); // null
  console.log(message); // 'Success'
});

buyBookForUser(5, 2, (err, message) => {
  console.log(err); // 'Book with id=5 not found'
  console.log(message); // undefined
});

buyBookForUser(1, 3, (err, message) => {
  console.log(err); // 'User with id=3 not found'
  console.log(message); // undefined
});
