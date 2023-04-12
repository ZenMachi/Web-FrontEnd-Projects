import clubs from "./clubs.js";

// ORIGINAL

// function DataSource(onSuccess, onFailed) {
//   this.onSuccess = onSuccess;
//   this.onFailed = onFailed;
// }

// DataSource.prototype.searchClub = function (keyword) {
//   const filteredClubs = clubs.filter( club =>
//     club.name.toUpperCase().includes(keyword.toUpperCase()));

//   if (filteredClubs.length) {
//     this.onSuccess(filteredClubs);
//   } else {
//     this.onFailed(`${keyword} is not found`);
//   }
// };

// CLASS

// class DataSource {
//   constructor(onSuccess, onFailed) {
//     this.onSuccess = onSuccess;
//     this.onFailed = onFailed;
//   }
// }

// DataSource.prototype.searchClub = function (keyword) {
//   const filteredClubs = clubs.filter(club => club.name.toUpperCase().include(keyboard.toUpperCase()));

//   if (filteredClubs.length) {
//     this.onSuccess(filteredClubs);
//   } else {
//     this.onFailed(`${keyword} is not found`)
//   }
// }

// Promise

class DataSource {
  static searchClub(keyword) {
    return new Promise((resolve, reject) => {
      const filteredClubs = clubs.filter((club) =>
        club.name.toUpperCase().includes(keyword.toUpperCase())
      );

      if (filteredClubs.length) {
        resolve(filteredClubs);
      } else {
        reject(`${keyword} is not found`);
      }
    });
  }
}

export default DataSource;
