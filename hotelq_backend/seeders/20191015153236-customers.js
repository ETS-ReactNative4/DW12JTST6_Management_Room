'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('customers', [
      {
        name: "popo",
        identity_number: "qwertyuiop",
        phone_number: "089765434566",
        image: "https://3.bp.blogspot.com/-Tl6npnJCG8A/XEpt67IwK1I/AAAAAAAAGqI/Uhb9j4NriNc3d_3MRVLWG52fcme7Asr4gCHMYCw/s1600/hd-naruto-wallpaper-for-mobile-and-desktop.jpg"
      },
      {
        name: "lala",
        identity_number: "nguheheh",
        phone_number: "0827368762",
        image: "https://3.bp.blogspot.com/-Tl6npnJCG8A/XEpt67IwK1I/AAAAAAAAGqI/Uhb9j4NriNc3d_3MRVLWG52fcme7Asr4gCHMYCw/s1600/hd-naruto-wallpaper-for-mobile-and-desktop.jpg"
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('customers', null, {});    
    
  }
};
