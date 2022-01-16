import { database } from "./db";

function promisifyCallback(id, callBack) {
  return new Promise(function (resolve, reject) {
    callBack(id, function (err, data) {
      if (err !== null) {
        reject(err);
      }
      resolve(data);
    });
  });
}

const buyBookForUser = async (bookId, userId, callback) => {
  const { buyBook, getUser, getUsersBook } = database;

  try {
    await promisifyCallback(userId, getUser);

    const userBooks = await promisifyCallback(userId, getUsersBook);

    if (userBooks?.includes(bookId)) {
      return callback(`User already has book with id=${bookId}`);
    }

    try {
      await promisifyCallback(bookId, buyBook);
      callback(null, "Successs");
    } catch (e) {
      callback(e);
    }
  } catch (e) {
    callback(e);
  }
};

buyBookForUser(1, 1, (err, message) => {
  console.log("err-01", err); // null
  console.log("message", message); // 'Success'
});

buyBookForUser(1, 2, (err, message) => {
  console.log("err = 22", err); // 'User already has book with id=1'
  console.log("message = 2", message); // undefined
});

buyBookForUser(3, 2, (err, message) => {
  console.log("err = 3", err); // null
  console.log("message = 3", message); // 'Success'
});

buyBookForUser(5, 2, (err, message) => {
  console.log("4", err); // 'Book with id=5 not found'
  console.log("m4", message); // undefined
});

buyBookForUser(1, 3, (err, message) => {
  console.log("m5", err); // 'User with id=3 not found'
  console.log("m5", message); // undefined
});
