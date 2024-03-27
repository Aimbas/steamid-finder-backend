var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())
const port = 3001

function commid_to_steamid(commid) {
  var steamid = [];
  steamid.push('STEAM_0:');
  console.log(commid)
  var steamidacct = parseInt(commid) - 76561197960265728;

  console.log(steamidacct)
  if (steamidacct % 2 === 0) {
    steamid.push('0:');
  } else {
    steamid.push('1:');
  }
  steamid.push(String(Math.floor(steamidacct / 2)));
  return steamid.join('');
}


app.get('/get_steam_id', (req, res) => {
  console.log("LLEGAAAAAAA")
  const id = req.query.id
  const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=1CB841CFF94C388B9B53F59BCF4B060E&vanityurl=${id}`

  

  fetch(url)
  .then(response => response.json())
  .then(json => {
      console.log(commid_to_steamid(json.response.steamid))
      res.json({steamid: json.response.steamid});
  })
  .catch(err => {
      console.error(err);
      res.json({steamid: null});
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
