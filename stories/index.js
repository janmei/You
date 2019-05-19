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

app.get('/', function (req, res) {
  getStories({
    id: 3181107584,
    userid: 19619475,
    sessionid: '19619475%3AiQwRj62DqixC6o%3A11'
  }).then(stories => {
    console.log(stories)
    res.send(stories)
  })
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


// getMediaByCode('BxJ9bbOpGTC').then(media => {
//   console.log(media)
// })

// getUserByUsername('jan_meininghaus').then(({
//   user
// }) => {
//   console.log(user.id)
// })