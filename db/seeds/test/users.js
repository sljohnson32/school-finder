
exports.seed = function(knex, Promise) {
  return knex('favorites').del()
    .then(() => knex('users').del())

    .then(() => {
      return Promise.all([

        knex('users').insert({
          id: 1,
          username: 'Dan Alvarez',
          email: 'dan@dan.com',
          street_address: '1331 17th',
          oath_id: '1'
        }, 'id')
        .then(user => {
          return knex('favorites').insert([
            {
              id: 1,
              school_name: 'East High School',
              school_id: '548',
              school_code: '2398',
              user_id: user[0]
            },
            {
              id: 2,
              school_name: 'George Washington High School',
              school_id: '561',
              school_code: '3378',
              user_id: user[0]
            }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
