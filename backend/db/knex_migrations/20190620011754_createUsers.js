
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table=>{
      table.increments('id').primary().unsigned();
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.string('password');
      table.string('hometown');
      table.float('hometown_latitude');
      table.float('hometown_longitude');
      table.string('avatar_url');
      table.string('about_me');
      table.string('type');
      table.timestamps(true, true); 
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
