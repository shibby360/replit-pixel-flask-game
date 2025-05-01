effects = {
  'Poison':function(player, enemy) {
    player.effects.poisoned = true
    player.effects.poisonleft = 5
    $('#effectinfo').text('Poisoned!')
    $('#effectinfo').css('color', 'green')
    $('#biggy').css('border-color', 'green')
  },
  'Death':function(player, enemy) {
    player.effects.deathed = true
    player.effects.deathleft = 25
    $('#effectinfo').text(`Deathed. Remaining Time: ${player.effects.deathleft} turns.`)
    $('#effectinfo').css('color', 'purple')
    $('#biggy').css('border-color', 'purple')
  },
  'Bulk up':function(player, enemy) {
    player.health += enemy.dmg
    x = enemy.dmg/2
    x = Math.round(x)
    x = Math.floor(x / 5) * 5;
    player.health -= x
  },
  'Cure':function(player, enemy) {
    player.effects.poisoned = false
    player.effects.deathed = false
    $('#effectinfo').text('')
    $('#biggy').css('border-color', 'darkblue')
  },
}