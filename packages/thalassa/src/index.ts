export type Player = {
  id: string
  username: string
  score: number
}

export const greetPlayer = (player: Player) => {
  console.log(`Welcome ${player.username}!`)
}
