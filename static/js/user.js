var stats = JSON.parse(localStorage.getItem('userstats'))
var anc = stats['announcements'].toString().split(',')
for(var i = 0; i < anc.length; i++) {
  if(anc[i] !== '') {
    alert(anc[i])
  }
}
var pageon = $('#username').text()
$('#dias').text(`Diamonds: ${stats['diamonds']}`)
if(stats['name'] === pageon) {
  $('#userdiv').show()
}
if(Number(stats['Health']) > 0) {
  $('#revbtn').hide()
}
function logout() {
  localStorage.removeItem('userstats')
  window.location = '/'
}
function revive() {
  fetch(`/save?name=${stats['name']}&coins=0&XP=0&Level=${stats['Level']}&Health=${stats['Level']*100}&inventory=&armor=None&sword=None&dialos=0`).then(function(r) {
    r.text().then(function(t) {
      if(t === 'Not enough diamonds') {
        alert('Not enough diamonds!')
      } else {
        localStorage.setItem('userstats', t)
        window.location = '/battle'
      }
    })
  })
}
$('#category').change(function() {
  $('#helps').html('')
  var tochse = []
  if($('#category').val() === 'items') {
    tochse = ['Potion', 'Apple', 'Purify']
  } else if($('#category').val() === 'effects') {
    tochse = ['Poison', 'Death', 'Bulk up', 'Cure']
  } else if($('#category').val() === 'armor') {
    tochse = ['Info', 'Majestic', 'Brod', 'Antidote']
  } else if($('#category').val() === 'sword') {
    tochse = ['Info', 'Blade', 'Magic Stick']
  }
  for(var i in tochse) {
    $('#helps').append(
      $(`<option value=${tochse[i].toLowerCase()}>${tochse[i]}</option>`)
    )
  }
})
function helpsr() {
  var valr = $('#helps').val()
  var ctgr = $('#category').val()
  window.location = `/help/${ctgr}/${valr}`
}
function grab() {
  fetch(`/error?rpt=${prompt('What exactly happened? Please go in detail.')}&name=${stats['name']}`)
}
fetch(`/ancfns?name=${stats['name']}`).then(function(r) {
  r.text().then(function(t) {
    localStorage.setItem('userstats', t)
    stats = JSON.parse(localStorage.getItem('userstats'))
  })
})