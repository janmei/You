var express = require('express');
var app = express();

const {
  getStories,
  getMediaByCode,
  getUserByUsername
} = require('instagram-stories')

// Get stories of Instagram
// id:        account id for get stories
// userid:    me id
// sessionid: value of cookies from Instagram

app.get('/:user', function (req, res) {
  let userId = req.params.user
  console.log(userId);

  getUserByUsername(userId).then((
    user
  ) => {
    console.log(user);

    getStories({
      id: user.graphql.user.id,
      userid: 13367065914,
      sessionid: '13367065914%3Aqjx7CkfYdcnF5u%3A0'
    }).then(stories => {
      console.log(stories)
      res.send(stories)
    })
  })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


// getMediaByCode('BxJ9bbOpGTC').then(media => {
//   console.log(media)
// })