import { Player, greetPlayer } from '../../../packages/thalassa/src/index'

// Backend Atlantide - API Server
console.log('🏛️ Atlantide Backend Server starting...')

const testPlayer: Player = {
  id: 'atlantide-001',
  username: 'Atlantis Admin',
  score: 0
}

greetPlayer(testPlayer)

console.log('✨ Atlantide ready on port 3001')

// Placeholder pour le serveur HTTP
export default {
  port: 3001,
  name: 'Atlantide Backend'
}