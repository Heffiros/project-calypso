import { Room, Client } from "@colyseus/core";
import { MyRoomState } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {
  state = new MyRoomState();

  onCreate(options: any) {
    console.log("MyRoom created!", options)
    console.log("Initial player count:", this.state.playerCount)
  }

  onJoin() {
    console.log("A player joined the room.")
    this.state.playerCount++

    if (this.state.playerCount >= this.state.maxPlayers) {
      this.state.isFull = true
    }
  }

  onLeave(client: Client, consented: boolean) {
    this.state.playerCount--
    this.state.isFull = false
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...")
  }

}
