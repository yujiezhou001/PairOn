const faker = require("faker");

const createFakeUser = () => ({
  first_name: faker.Name.firstName(),
  last_name: faker.Name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  avatar_url: faker.internet.avatar(),
})

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      const fakeUsers = [];
      const desiredFakeUsers = 10;
      for (let i = 0; i < desiredFakeUsers; i++) {
        fakeUsers.push(createFakeUser());
      }

      return Promise.all([
        knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1'),
        knex('users').insert(fakeUsers),
        knex.raw('SELECT setval(\'users_id_seq\', (SELECT MAX(id) from "users"));')
      ]);
    });
};
