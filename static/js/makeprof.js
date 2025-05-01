var rt
function makeprof() {
  var name = prompt('Username?: ')
  var pwd = prompt('Password?: ')
  fetch(`/createprofile?name=${name}&pwd=${pwd}`).then(function(r) {
    r.text().then(function(t) {
      rt = t
      while(rt === 'User present') {
        fetch(`/createprofile?name=${name}&pwd=${pwd}`).then(function(r) {
          r.text().then(function(t) {
            rt = t
          })
        })
      }
      fetch(`/login?name=${name}&pwd=${pwd}`).then(function() {
        localStorage.setItem('userstats', rt)
        window.location = '/tutorial'
      })
    })
  })
}