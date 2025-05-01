function buyitem(itemtobuy, cost) {
  if(cost > player.coins) {
    return
  }
  player.addtoinventory(itemtobuy)
  setstats()
}
function forgearmor(player) {
  if(player.coins < 100) {
    return
  }
  player.armor = new Armor()
  player.coins -= 100
  setstats()
}
function forgesword(player) {
  if(player.coins < 90) {
    return
  }
  player.sword = new Sword()
  player.coins -= 90
  setstats()
}