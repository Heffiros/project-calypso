import * as PIXI from 'pixi.js'
import { pixelToGrid } from './grid'

export function registerGridInteractions(
  app: PIXI.Application
) {
  app.stage.eventMode = 'static'
  app.stage.hitArea = app.screen

  app.stage.on('pointerdown', (event) => {
    const pos = pixelToGrid(
      event.global.x,
      event.global.y,
    )

    if (!pos) return
    console.log(pos.coord)
  })
}
