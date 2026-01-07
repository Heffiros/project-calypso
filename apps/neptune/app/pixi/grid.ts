// game/pixi/grid.ts
import * as PIXI from 'pixi.js'

export const GRID_SIZE = 10
export const CELL_SIZE = 50
export const OFFSET = 30
export const LETTERS = 'ABCDEFGHIJ'

export function createGridContainer() {
  return new PIXI.Container()
}

export function drawGrid(container: PIXI.Container) {
  const graphics = new PIXI.Graphics()

  for (let i = 0; i <= GRID_SIZE; i++) {
    graphics
      .moveTo(OFFSET + i * CELL_SIZE, OFFSET)
      .lineTo(OFFSET + i * CELL_SIZE, OFFSET + GRID_SIZE * CELL_SIZE)

    graphics
      .moveTo(OFFSET, OFFSET + i * CELL_SIZE)
      .lineTo(OFFSET + GRID_SIZE * CELL_SIZE, OFFSET + i * CELL_SIZE)
  }

  graphics.stroke({ width: 1, color: 0xffffff })
  container.addChild(graphics)
}

export function drawColumnLabels(container: PIXI.Container) {
  for (let col = 0; col < GRID_SIZE; col++) {
    const text = new PIXI.Text({
      text: LETTERS[col],
      style: { fill: '#ffffff', fontSize: 14 }
    })

    text.anchor.set(0.5)
    text.x = OFFSET + col * CELL_SIZE + CELL_SIZE / 2
    text.y = OFFSET - 20

    container.addChild(text)
  }
}

export function drawRowLabels(container: PIXI.Container) {
  for (let row = 0; row < GRID_SIZE; row++) {
    const text = new PIXI.Text({
      text: String(row + 1),
      style: { fill: '#ffffff', fontSize: 14 }
    })

    text.anchor.set(0.5)
    text.x = OFFSET - 20
    text.y = OFFSET + row * CELL_SIZE + CELL_SIZE / 2

    container.addChild(text)
  }
}

export function pixelToGrid(x: number, y: number) {
  if (
    x < OFFSET ||
    y < OFFSET ||
    x > OFFSET + GRID_SIZE * CELL_SIZE ||
    y > OFFSET + GRID_SIZE * CELL_SIZE
  ) {
    return null
  }

  const col = Math.floor((x - OFFSET) / CELL_SIZE)
  const row = Math.floor((y - OFFSET) / CELL_SIZE)

  return {
    col,
    row,
    coord: `${LETTERS[col]}${row + 1}`
  }
}
