var rt
function login() {
  var name = $('#name').val()
  var pwd = $('#pwd').val()
  fetch(`/login?name=${name}&pwd=${pwd}`).then(function(r) {
    r.text().then(function(t) {
      rt = t
      if(typeof rt === String) {
        alert('Inccorect username/password')
      }
      localStorage.setItem('userstats', rt)
      window.location = `/users/${JSON.parse(localStorage.getItem('userstats'))['name']}`
    })
  })
}