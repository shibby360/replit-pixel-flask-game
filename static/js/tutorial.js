var tuti = 0
function tutorial() {
  var tutorials = ['Use arrow keys to move', 'Overlap on the enemies to attack them', 'Overlap on the merchants or blacksmith to interact with them', 'You may need to scroll down to view all your stats', "Overlap on chests to collect what's inside", "You're all set!"]
  $('#phelp').text(tutorials[tuti])
  tuti += 1
  if(tuti === tutorials.length + 1) {
    window.location = '/battle'
  }
}
try {
if(localStorage.getItem('userstats') === null) {
  var userstats = {}
} else {
  var userstats = JSON.parse(localStorage.getItem('userstats'))
}
if(userstats === {}) {
  window.location = '/login'
}
if(userstats['Health'] === 0) {
  alert('You\'re already dead!')
  window.location = `/users/${userstats['name']}`
}
var globalnum = 30
var sizelim = 600
var shaqqed = false
$('#biggy').css({'width':sizelim+globalnum+'px', 'height':sizelim+globalnum+'px'})
$('#pstats').css('top', sizelim+34+'px')
function save() {
  names = []
  for(var i in player.inventory) {
    if(player.inventory[i].name) {
      names.push(player.inventory[i].name)
    }
  }
  fetch(`/save?coins=${player.coins}&XP=${player.xp}&Level=${player.level}&Health=${player.health}&name=${userstats['name']}&inventory=${names}&armor=${player.armor.name}&sword=${player.sword.name}`).then(function() {
    var name = userstats['name']
    var pwd = userstats['password']
    fetch(`/login?name=${name}&pwd=${pwd}`).then(function(r) {
      r.text().then(function(t) {
        localStorage.setItem('userstats', t)
        window.location = '/'
      })
    })
  })
}
function remitem(name, itervar) {
  var indx = player.inventory.indexOf(player.inventory[itervar])
  player.inventory.splice(indx, 1)
  if(names[itervar] === 'Potion') {
    player.health += 25
    if(player.health > player.maxhealth + player.armor.healthboost) {
      player.health = player.maxhealth + player.armor.healthboost
    }
  } else if(names[itervar] === 'Apple') {
    player.xp += 10
    if(player.xp >= player.level*10) {
      player.level += 1
      player.xp = 0
      player.dmg += player.level*10
      player.health += 20
      player.maxhealth = player.level*100
      if(player.health > player.maxhealth + player.armor.healthboost) {
        player.health = player.maxhealth + player.armor.healthboost
      }
    }
  } else if(names[itervar] === 'Purify') {
    player.effects.poisoned = false
    player.effects.deathed = false
    $('#effectinfo').text('')
  }
  setstats()
  $('#pinvlst').html('')
}
function setstats() {
  $('#pxp').text(`XP: ${player.xp}/${player.level*10}`)
  $('#phlt').text(`Health: ${player.health}/${player.maxhealth}`)
  names = []
  for(var i in player.inventory) {
    if(player.inventory[i].name) {
      names.push(player.inventory[i].name)
    }
  }
  $('#pinv').text(`Inventory: ${names}`)
  $('#pinv').click(function() {
    $('#pinvlst').html('')
    for(var i = 0; i < player.inventory.length; i++) {
      if(names[i] === 'Potion') {
        var el = $(`<li><button onclick="remitem('Potion', ${i})">Potion</button></li>`)
      } else if(names[i] === 'Apple') {
        var el = $(`<li><button onclick="remitem('Apple', ${i})">Apple</button></li>`)
      } else if(names[i] === 'Purify') {
        var el = $(`<li><button onclick="remitem('Purify', ${i})">Purify</button></li>`)
      }
      $('#pinvlst').append(el)
    }
  })
  $('#plvl').text(`Level: ${player.level}`)
  $('#pcoins').text(`Coins: ${player.coins}`)
  $('#parmor').text(`Armor: ${player.armor.name}, Health Boost: ${player.armor.healthboost}`)
  $('#psword').text(`Sword: ${player.sword.name}, Damage Boost: ${player.sword.dmgboost}`)
}
function collided(el1, el2) {
  var top1 = Number($(el1).css("top").replace('px', ''));
  var left1 = Number($(el1).css("left").replace('px', ''));
  var top2 = Number($(el2).css("top").replace('px', ''));
  var left2 = Number($(el2).css("left").replace('px', ''));
  return top1 === top2 && left1 === left2
}
function Potion() {
  this.name = 'Potion'
}
function Apple() {
  this.name = 'Apple'
}
function Purify() {
  this.name = 'Purify'
}
function Empty() {
  this.name = false
}
function InvItem(item) {
  if(item === 'Potion') {
    return new Potion()
  } else if(item === 'Apple') {
    return new Apple()
  } else if(item === 'Purify') {
    return new Purify()
  } else {
    return new Empty()
  }
}
function OceanGate() {
  var ocean1 = $('<img class="ocean" src="/static/imgs/water.png" id="ocean1">')
  var ocean2 = $('<img class="ocean" src="/static/imgs/water.png" id="ocean2">')
  var ocean3 = $('<img class="ocean" src="/static/imgs/water.png" id="ocean3">')
  var ocean4 = $('<img class="ocean" src="/static/imgs/water.png" id="ocean4">')
  var x = Math.floor(Math.random() * sizelim)
  var y = Math.floor(Math.random() * sizelim)
  x = Math.ceil(x / globalnum) * globalnum;
  y = Math.ceil(y / globalnum) * globalnum;
  ocean1.css({'top':y+'px', 'left':x+'px', 'width':globalnum, 'height':globalnum})
  ocean2.css({'top':y+globalnum+'px', 'left':x+'px', 'width':globalnum, 'height':globalnum})
  ocean3.css({'top':y+'px', 'left':x+globalnum+'px', 'width':globalnum, 'height':globalnum})
  ocean4.css({'top':y+globalnum+'px', 'left':x+globalnum+'px', 'width':globalnum, 'height':globalnum})
  $(document.body).append(ocean1)
  $(document.body).append(ocean2)
  $(document.body).append(ocean3)
  $(document.body).append(ocean4)
  this.ocean = [ocean1, ocean2, ocean3, ocean4]
}
function Armor(empty, armor) {
  if(empty) {
    this.healthboost = 0
    this.name = 'None'
  } else {
    armorsd = {'Majestic':70, 'Brod':40, 'Antidote':0, 'None':0}
    armors = Object.keys(armorsd)
    armors.pop()
    if(armor) {
      armortouse = armor
    } else {
      armortouse = armors[Math.floor(Math.random() * armors.length)]
    }
    this.name = armortouse
    this.healthboost = armorsd[this.name]
  }
}
function Sword(empty, sword) {
  if(empty) {
    this.dmgboost = 0
    this.name = 'None'
  } else {
    swordsd = {'Blade':60, 'Magic Stick':30, 'None':0}
    swords = Object.keys(swordsd)
    swords.pop()
    if(sword) {
      swordtouse = sword
    } else {
      swordtouse = swords[Math.floor(Math.random() * swords.length)]
    }
    this.name = swordtouse
    this.dmgboost = swordsd[this.name]
  }
}
function Person(type) {
  var person = $(`<img id="person" src="/static/imgs/${type}.png">`)
  this.person = person
  var x = Math.floor(Math.random() * sizelim)
  var y = Math.floor(Math.random() * sizelim)
  x = Math.ceil(x / globalnum) * globalnum;
  y = Math.ceil(y / globalnum) * globalnum;
  person.css({'top':y+'px', 'left':x+'px'})
  for(var i in blocks) {
    while(collided(person, blocks[i].blk)) {
      x = Math.floor(Math.random() * sizelim)
      y = Math.floor(Math.random() * sizelim)
      x = Math.ceil(x / globalnum) * globalnum;
      y = Math.ceil(y / globalnum) * globalnum;
      person.css({'top':y+'px', 'left':x+'px'})
    }
    for(var i in enemies) {
      while(collided(person, enemies[i].enm)) {
        x = Math.floor(Math.random() * sizelim)
        y = Math.floor(Math.random() * sizelim)
        x = Math.ceil(x / globalnum) * globalnum;
        y = Math.ceil(y / globalnum) * globalnum;
        person.css({'top':y+'px', 'left':x+'px'})
      }
    }
  }
  if(chest) {
    while(collided(person, chest.chest)) {
      x = Math.floor(Math.random() * sizelim)
      y = Math.floor(Math.random() * sizelim)
      x = Math.ceil(x / globalnum) * globalnum;
      y = Math.ceil(y / globalnum) * globalnum;
      person.css({'top':y+'px', 'left':x+'px'}) 
    }
  }
  if(type === 'Merchant') {
    this.info = "It's Molly the merchant!<br><button onclick='buypotion(player)'>Buy a Potion(25 coins)</button><br><button onclick='buyapple(player)'>Buy Apple(20 coins)</button><br><button onclick='buypurify(player)'>Buy a Purify(50 coins)</button>"
  } else if(type === 'Blacksmith') {
    this.info = "It's Billy the blacksmith!<br><button onclick='forgearmor(player)'>Get Armor(100 coins)</button><br><button onclick='forgesword(player)'>Get Sword(90 coins)</button>"
  }
  $(document.body).append(person)
}
function Enemy(type, enenum) {
  this.speed = globalnum
  var x = Math.floor(Math.random() * sizelim)
  var y = Math.floor(Math.random() * sizelim)
  x = Math.ceil(x / globalnum) * globalnum;
  y = Math.ceil(y / globalnum) * globalnum;
  var enm = $(`<img class="enemy" id="enemy${enenum}">`)
  if(type === 'Ghost') {
    enm.attr('src', '/static/imgs/ghost.png')
    this.health = 100
    this.dmg = 5
    this.xpearned = 5
    this.effchance = 0
    this.effect = function() {}
  } else if(type === 'Slime') {
    enm.attr('src', '/static/imgs/slime.png')
    this.health = 150
    this.dmg = 10
    this.xpearned = 10
    this.effchance = 25
    this.effect = effects['Poison']
  } else if(type === 'Bat') {
    enm.attr('src', '/static/imgs/bat.png')
    this.health = 50
    this.dmg = 75
    this.xpearned = 20
    this.effchance = 5
    this.effect = effects['Death']
  }
  enm.css({'top':y+'px', 'left':x+'px'})
  this.enm = enm
  $(document.body).append(enm)
  this.goleft = function() {
    var left = Number($(this.enm).css("left").replace('px', ''));
    left = left - this.speed + 'px'
    $(this.enm).css('left', left)
  }
  this.goright = function() {
    var right = Number($(this.enm).css("left").replace('px', ''));
    right = right + this.speed + 'px'
    $(this.enm).css('left', right)
  }
  this.goup = function() {
    var up = Number($(this.enm).css("top").replace('px', ''));
    up = up - this.speed + 'px'
    $(this.enm).css('top', up)
  }
  this.godown = function() {
    var down = Number($(this.enm).css("top").replace('px', ''));
    down = down + this.speed + 'px'
    $(this.enm).css('top', down)
  }
  this.move = function(direc) {
    if(direc === 'Up') {
      this.goup()
    } else if(direc === 'Down') {
      this.godown()
    } else if(direc === 'Left') {
      this.goleft()
    } else if(direc === 'Right') {
      this.goright()
    }
  }
  this.out = function() {
    var top = Number($(this.enm).css("top").replace('px', ''));
    var left = Number($(this.enm).css("left").replace('px', ''));
    if(top < 0) {
      this.godown()
    }
    if(top > sizelim) {
      this.goup()
    }
    if(left < 0) {
      this.goright()
    }
    if(left > sizelim) {
      this.goleft()
    }
  }
  this.hitblock = function(togo) {
    for(var i = 0; i < blocks.length; i++) {
      if(collided(this.enm, blocks[i].blk)) {
        this.move(togo)
      }
    }
    if(chest) {
      if(collided(this.enm, '#chest')) {
        this.move(togo)
      }
    }
    if(person) {
      if(collided(this.enm, person.person)) {
        this.move(togo)
      }
    }
  }
  this.hitplayer = function(togo, player) {
    if(collided(this.enm, '#player')) {
      player.health -= this.dmg
      if(player.health <= 0) {
        player.health = 0
        player.level -= 1
        player.xp = 0
        player.inventory = []
        player.armor = new Armor(true)
        player.sword = new Sword(true)
        player.coins = 0
        alert('You died.')
        save()
      }
      this.move(togo)
    }
    setstats()
  }
}
enemytypes = ['Ghost', 'Slime', 'Bat']
enemies = []
for(var i = 0; i <= 10; i++) {
  enemies.push(new Enemy(enemytypes[Math.floor(Math.random() * enemytypes.length)], i))
}
function Block() {
  var x = Math.floor(Math.random() * sizelim)
  var y = Math.floor(Math.random() * sizelim)
  x = Math.ceil(x / globalnum) * globalnum;
  y = Math.ceil(y / globalnum) * globalnum;
  var blk = $(`<img src="/static/imgs/crystal.png" class="block">`)
  blk.css({'top':y+'px', 'left':x+'px'})
  for(var i in enemies) {
    while(collided(blk, enemies[i].enm)) {
      var x = Math.floor(Math.random() * sizelim)
      var y = Math.floor(Math.random() * sizelim)
      x = Math.ceil(x / globalnum) * globalnum;
      y = Math.ceil(y / globalnum) * globalnum;
      blk.css({'top':y+'px', 'left':x+'px'})
    }
  }
  blk.css({'top':y+'px', 'left':x+'px'})
  $(document.body).append(blk)
  this.blk = blk
}
blocks = []
for(var i = 0; i < 50; i++) {
  blocks.push(new Block())
}
function Coin() {
  var x = Math.floor(Math.random() * sizelim)
  var y = Math.floor(Math.random() * sizelim)
  x = Math.ceil(x / globalnum) * globalnum;
  y = Math.ceil(y / globalnum) * globalnum;
  var coin = $(`<img src="/static/imgs/coin.png" class="coin">`)
  coin.css({'top':y+'px', 'left':x+'px'})
  for(var i in blocks) {
    while(collided(coin, blocks[i].blk)) {
      x = Math.floor(Math.random() * sizelim)
      y = Math.floor(Math.random() * sizelim)
      x = Math.ceil(x / globalnum) * globalnum;
      y = Math.ceil(y / globalnum) * globalnum;
      coin.css({'top':y+'px', 'left':x+'px'})
    }
    for(var i in enemies) {
    while(collided(coin, enemies[i].enm)) {
      var x = Math.floor(Math.random() * sizelim)
      var y = Math.floor(Math.random() * sizelim)
      x = Math.ceil(x / globalnum) * globalnum;
      y = Math.ceil(y / globalnum) * globalnum;
      coin.css({'top':y+'px', 'left':x+'px'})
    }
  }
  }
  $(document.body).append(coin)
  this.coin = coin
}
coins = []
for(var i = 0; i < 50; i++) {
  coins.push(new Coin())
}
function Chest(x, y) {
  this.contents = {'Coins':Math.floor(Math.random() * 100)};
  var chest = $('<img id="chest" src="/static/imgs/chest.png">')
  if(x && y) {
    var x = x
    var y = y
  } else {
    var x = Math.floor(Math.random() * sizelim)
    var y = Math.floor(Math.random() * sizelim)
  }
  x = Math.ceil(x / globalnum) * globalnum;
  y = Math.ceil(y / globalnum) * globalnum;
  chest.css({'top':y+'px', 'left':x+'px'})
  for(var i in blocks) {
    while(collided(chest, blocks[i].blk)) {
      x = Math.floor(Math.random() * sizelim)
      y = Math.floor(Math.random() * sizelim)
      x = Math.ceil(x / globalnum) * globalnum;
      y = Math.ceil(y / globalnum) * globalnum;
      chest.css({'top':y+'px', 'left':x+'px'})
    }
    for(var i in enemies) {
      while(collided(chest, enemies[i].enm)) {
        x = Math.floor(Math.random() * sizelim)
        y = Math.floor(Math.random() * sizelim)
        x = Math.ceil(x / globalnum) * globalnum;
        y = Math.ceil(y / globalnum) * globalnum;
        chest.css({'top':y+'px', 'left':x+'px'})
      }
      for(var i in coins) {
        while(collided(chest, coins[i].coin)) {
          x = Math.floor(Math.random() * sizelim)
          y = Math.floor(Math.random() * sizelim)
          x = Math.ceil(x / globalnum) * globalnum;
          y = Math.ceil(y / globalnum) * globalnum;
          chest.css({'top':y+'px', 'left':x+'px'})
        }
      }
    }
  }
  items = [new Potion(), new Empty(), new Apple(), new Purify()]
  this.contents['item'] = items[Math.floor(Math.random() * items.length)]
  chest.css({'top':y+'px', 'left':x+'px'})
  this.chest = chest
  $(document.body).append(chest)
}
function Player() {
  this.speed = globalnum
  this.xp = Number(userstats['XP'])
  this.health = Number(userstats['Health'])
  this.inventory = []
  var userinv = userstats['inventory'].toString().split(',')
  for(var i in userinv) {
    this.inventory.push(InvItem(userinv[i]))
  }
  this.level = Number(userstats['Level'])
  this.dmg = Number(userstats['Level'])*10
  this.coins = Number(userstats['coins'])
  this.maxhealth = Number(userstats['Level'])*100
  this.armor = new Armor(false, userstats['armor'])
  this.sword = new Sword(false, userstats['sword'])
  //Effect attributes
  this.effects = {}
  this.effects.poisoned = false
  this.effects.poisonleft = 0
  this.effects.deathed = false
  this.effects.deathleft = 0
  //Functions
  this.goleft = function() {
    var left = Number($('#player').css("left").replace('px', ''));
    left = left - this.speed + 'px'
    $('#player').css('left', left)
  }
  this.goright = function() {
    var right = Number($('#player').css("left").replace('px', ''));
    right = right + this.speed + 'px'
    $('#player').css('left', right)
  }
  this.goup = function() {
    var up = Number($('#player').css("top").replace('px', ''));
    up = up - this.speed + 'px'
    $('#player').css('top', up)
  }
  this.godown = function() {
    var down = Number($('#player').css("top").replace('px', ''));
    down = down + this.speed + 'px'
    $('#player').css('top', down)
  }
  this.move = function(direc) {
    if(direc === 'Up') {
      this.goup()
    } else if(direc === 'Down') {
      this.godown()
    } else if(direc === 'Left') {
      this.goleft()
    } else if(direc === 'Right') {
      this.goright()
    }
  }
  this.hitblock = function(togo) {
    for(var i = 0; i < blocks.length; i++) {
      if(collided('#player', blocks[i].blk)) {
        this.move(togo)
      }
    }
  }
  this.hitcoin = function(togo) {
    for(var i = 0; i < coins.length; i++) {
      if(collided('#player', coins[i].coin)) {
        this.coins += 1
        coins[i].coin.remove()
        coins.push(new Coin())
      }
    }
  }
  this.hitenemy = function(togo) {
    var enehit = null
    for(var i in enemies) {
      var thenemy = enemies[i]
      var enindxof = i
      if(collided('#player', thenemy.enm)) {
        this.move(togo)
        enehit = thenemy
        break
      }
    }
    if(enehit) {
      enehit.health -= this.dmg + this.sword.dmgboost
      if(enehit.health <= 0) {
        enehit.health = 0
        enemies.splice(enindxof, 1)
        enehit.enm.remove()
        enemies.push(new Enemy(enemytypes[Math.floor(Math.random() * enemytypes.length)], enindxof))
        if(Math.floor(Math.random() * 100) <= enehit.effchance) {
          enehit.effect(player, enehit)
        }
        this.xp += enehit.xpearned
        if(this.xp >= this.level*10) {
          this.xp = 0
          this.level += 1
          this.dmg += this.level*10
          this.health += 20
          this.maxhealth = this.level*100
          if(this.health > this.maxhealth + this.armor.healthboost) {
            this.health = this.maxhealth + this.armor.healthboost
          }
        }
        if(this.armor.name === 'Brod') {
          effects['Bulk up'](this, enehit)
        } else if(this.armor.name === 'Antidote') {
          effects['Cure'](this, enehit)
        }
      }
      setstats()
    }
  }
  this.out = function() {
    var top = Number($('#player').css("top").replace('px', ''));
    var left = Number($('#player').css("left").replace('px', ''));
    if(top < 0) {
      this.godown()
    }
    if(top > sizelim) {
      this.goup()
    }
    if(left < 0) {
      this.goright()
    }
    if(left > sizelim) {
      this.goleft()
    }
  }
  this.hitchest = function() {
    if(!(chest)) {
      return
    }
    if(collided('#player', chest.chest)) {
      this.inventory.push(chest.contents.item)
      this.coins += chest.contents.Coins
      chest.chest.remove()
      chest = null
      setstats()
    }
  }
  this.hitperson = function() {
    if(!(person)) {
      return
    }
    if(collided('#player', person.person)) {
      $('#pinfo').html(person.info)
      person.person.remove()
      person = null
    }
  }
  this.hitocean = function() {
    for(var i in oceanic.ocean) {
      if(collided('#player', oceanic.ocean[i])) {
        save()
        window.location = 'battle/ocean'
      }
    }
  }
}
var player = new Player()
var chest = new Chest()
var person = null;
var oceanic = new OceanGate()
setstats()
$(document).keydown(function(e) {
  tutorial()
  if(shaqqed) {
    return
  }
  $('#pinfo').html('')
  var oppdirecs = {'Up':'Down', 'Down':'Up', 'Left':'Right', 'Right': 'Left'}
  var direct = e.key.replace('Arrow', '')
  player.move(direct)
  //Effect checks
  if(player.effects.poisoned) {
    player.effects.poisonleft -= 1
    player.health -= 10
    if(player.health <= 0) {
      player.health = 0
      player.level -= 1
      player.xp = 0
      player.inventory = []
      player.armor = new Armor(true)
      player.sword = new Sword(true)
      player.coins = 0
      alert('You died.')
      save()
    }
    if(player.effects.poisonleft === 0) {
      player.effects.poisoned = false
      $('#effectinfo').text('')
    }
  }
  if(player.effects.deathed) {
    player.effects.deathleft -= 1
    $('#effectinfo').text(`Deathed. Remaining Time: ${player.effects.deathleft} turns.`)
    if(player.effects.deathleft === 0) {
      player.effects.deathed = false
      $('#effectinfo').text('')
      player.health = Number(userstats['Health'])*50
      player.level -= 1
      player.xp = 0
      player.inventory = []
      player.armor = new Armor(true)
      player.sword = new Sword(true)
      player.coins = 0
      alert('You died.')
      save()
    }
  }
  //Other player checks
  player.hitblock(oppdirecs[direct])
  player.hitenemy(oppdirecs[direct])
  player.hitcoin(oppdirecs[direct])
  player.hitperson()
  player.hitchest()
  player.hitocean()
  player.out()
  for(var i in enemies) {
    var enemovess = ['Up', 'Down', 'Left', 'Right']
    function randlist(arr) {
      return arr[Math.floor(Math.random() * arr.length)]
    }
    var directi = randlist(enemovess)
    if(e.key.includes('Arrow') || e.key === 'o') {
      enemies[i].move(directi)
      enemies[i].hitblock(oppdirecs[directi])
      enemies[i].hitplayer(oppdirecs[directi], player)
      enemies[i].out()
    }
  }
  if(Math.floor(Math.random() * 10) === 1 && !(chest)) {
    chest = new Chest()
  }
  if(Math.floor(Math.random() * 10) && coins.length < 75) {
    coins.push(new Coin())
  }
  if(Math.floor(Math.random() * 5) === 1 && !(person)) {
    var people = ['Merchant', 'Blacksmith']
    person = new Person(people[Math.floor(Math.random() * people.length)])
  }
  if(e.key === 's') {
    $('#pinfo').text('SHAQ UP')
    $('#pxp').text('XP: SHAQ')
    $('#phealth').text('Health: SHAQ')
    $('#pinv').text('Inventory: SHAQ')
    $('#plvl').text('Level: SHAQ')
    $('pcoins').text('Coins: SHAQ')
    $('#pstats').append($('<p>SHAQ: SHAQ</p>'))
    shaqqed = true
    return
  } else if(e.key === 'h') {
    shaqqed = false
  }
  setstats()
})
} catch(err) {
  alert(err)
}