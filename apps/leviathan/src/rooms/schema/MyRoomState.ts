import { Schema, type } from "@colyseus/schema";

export class MyRoomState extends Schema {

  @type("number")
  playerCount = 0

  @type("number")
  maxPlayers = 2

  @type("boolean")
  isFull = false

  @type("string")
  token = ""

}
