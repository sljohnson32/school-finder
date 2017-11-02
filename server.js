const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
  response.sendfile('index.html');
});

app.get('/api/v1/users', (request, response) => {
  database('users').select()
    .then((users) => {
      response.status(200).json(users);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/favorites', (request, response) => {
  database('favorites').select()
    .then((favorites) => {
      response.status(200).json(favorites);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/users', (request, response) => {
  const user = request.body;

  for (let requiredParameter of ['username', 'email', 'street_address', 'oath_id']) {
    if (!user[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String>, email: <String>, street_address: <String>, oath_id: <String>}. You're missing a '${requiredParameter}' property.` });
    }
  }

  database('users').insert(user, 'id')
  .then(user => {
    response.status(201).json({ id: user[0] });
  })
  .catch(error => {
    response.status(500).json({ error });
  });
});

app.post('/api/v1/favorites', (request, response) => {
  const user = request.body;

  for (let requiredParameter of ['school_id', 'school_name', 'school_code', 'user_id']) {
    if (!user[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { school_id: <String>, school_name: <String>, school_code: <String>, user_id: <String>}. You're missing a '${requiredParameter}' property.` });
    }
  }

  database('favorites').insert(user, 'id')
  .then(user => {
    response.status(201).json({ id: user[0] });
  })
  .catch(error => {
    response.status(500).json({ error });
  });
});

app.delete('/api/v1/users/:id', (request, response) => {
  const { id } = request.params;

  database('users').where({ id }).del()
    .then(user => {
      if (user) {
        return response.status(202).json(`User ${id} was deleted from database`);
      } else return response.status(422).json({ error: 'Not Found' });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.delete('/api/v1/favorites/:id', (request, response) => {
  const { id } = request.params;

  database('favorites').where({ id }).del()
    .then(favorite => {
      if (favorite) {
        return response.status(202).json(`Favorite ${id} was deleted from database`);
      } else return response.status(422).json({ error: 'Not Found' });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`User Data API is running on ${app.get('port')}.`);
});

module.exports = app;
