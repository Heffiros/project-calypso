import { Player, greetPlayer } from '../../../packages/thalassa/src/index'

// Game Server Leviathan - Colyseus
console.log('🐉 Leviathan Game Server starting...')

const gamePlayer: Player = {
  id: 'leviathan-001',
  username: 'Game Master',
  score: 0
}

greetPlayer(gamePlayer)

console.log('⚡ Leviathan Game Server ready on port 2567')

// Placeholder pour Colyseus
export default {
  port: 2567,
  name: 'Leviathan Game Server'
}