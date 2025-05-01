var userstats = JSON.parse(localStorage.getItem('userstats'))
var usk = Object.keys(userstats)
if(usk.includes('name')) {
  window.location = `/users/${userstats['name']}`
}