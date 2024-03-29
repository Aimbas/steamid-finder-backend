var express = require('express')
var cors = require('cors')
var app = express()
const dotenv = require('dotenv')
dotenv.config();
app.use(cors())
const port = 3001

transform_steam = (type,id) => {
  var newSteam = ""
  switch (type) {
    case "hex":
      newSteam = BigInt(id).toString(16)
      break;
    default:
      break;
  }

  return(newSteam)
}



app.get('/get_steam_id', (req, res) => {
  const id = req.query.id
  const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=1CB841CFF94C388B9B53F59BCF4B060E&vanityurl=${id}`

  

  fetch(url)
  .then(response => response.json())
  .then(json => {
    console.log(json.response.steamid)
    const hex = transform_steam("hex", json.response.steamid);
    
    res.json({steamid64: json.response.steamid, steamid_hex: hex});
  })
  .catch(err => {
      console.error(err);
      res.json({steamid64: null});
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
