import { ref } from 'vue'
import type { Room } from 'colyseus.js'

export const useGameStore = defineStore('game', {
  state: () => ({
    room: null as Room | null
  }),

  actions: {
    setRoom(r: Room) {
      this.room = r
    }
  }
})
