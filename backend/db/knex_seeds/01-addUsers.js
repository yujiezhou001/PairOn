const faker = require("faker");

const listOfHomeTowns = [
  {name:'Edmonton', lat: 53.529102, long:-113.490010},
  {name:'Montreal', lat: 45.533671, long:-73.578309},
  {name:'Laval', lat: 45.566168, long:-73.728984},
  {name:'Longueuil', lat: 45.530607, long:-73.501307},
  {name:'Vancouver', lat: 49.256130, long:-123.133176},
  {name:'Tokyo', lat: 35.678151, long:139.758644},
  {name:'Montreal', lat: 45.506194, long:-73.567063},
  {name:'Montreal', lat: 45.524861, long:-73.591322},
  {name:'Boston', lat: 42.356780, long:-71.066843},
  {name:'Honolulu', lat: 21.303958, long:-157.855722}
]

const listOfAboutMe = [
{text: 'I’m a writer, nomad and travel addict originally from Australia. I quit my job in 2015 and have been traveling slowly. I love meeting new people and have a passion for art & history. I love visiting museums.'},
{text: 'I have 3 passions: traveling, people and photography. Ping me to meet up and do something on the fly!'},
{text: 'With my changing schedule, it’s rare that I can plan in advance what to do on a given evening. It’s nice to have impromptu meet-ups for drinks or dinner when possible!'},
{text: 'Lover of coffee, tacos and farmer’s market.'},
{text: 'Avid travel guru. Web ninja. Music maker. '},
{text: 'I love being outdoors and challenging myself. I’d love to meet like-minded people interested in trying an outdoor activity : river surfing, rock climbing etc.'},
{text: 'Music lover. Love meeting people who share passion for composing music.'},
{text: 'Vegan, interested in trying new vegan dishes and new restaurants around town.'},
{text: 'Love to explore a city on foot. Looking forward to meeting locals and travelers alike.'},
{text: 'Comedy lover. Looking for new friends to go to comedy shows with.'}
]



const createFakeUser = (randomNumber) => ({
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  avatar_url: faker.internet.avatar(),
  hometown: listOfHomeTowns[randomNumber].name,
  hometown_latitude: listOfHomeTowns[randomNumber].lat,
  hometown_longitude: listOfHomeTowns[randomNumber].long,
  about_me: listOfAboutMe[randomNumber].text,
  type: "fake"
})

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      const fakeUsers = [];
      const desiredFakeUsers = 10;
      for (let i = 0; i < desiredFakeUsers; i++) {
        const randomNumber = faker.random.number(9);
        fakeUsers.push(createFakeUser(randomNumber));
      }

      return Promise.all([
        knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1'),
        knex('users').insert(fakeUsers),
        knex.raw('SELECT setval(\'users_id_seq\', (SELECT MAX(id) from "users"));')
      ]);
    });
};
