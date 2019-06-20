
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table=>{
      table.increments('id').primary().unsigned();
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.string('password');
      table.string('hometown');
      table.float('longitude');
      table.float('latitude');
      table.string('avatar');
      table.string('about_me');
      table.timestamps(true, true); 
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
