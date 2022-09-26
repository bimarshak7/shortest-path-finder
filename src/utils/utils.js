const ROW_NO = 20
const COL_NO = 50

function initGrid() {
	const grid = []
	for (let row = 0; row < ROW_NO; row++) {
		const currentRow = []
		for (let col = 0; col < COL_NO; col++) {
			currentRow.push(createNode(col, row))
		}
		grid.push(currentRow)
	}
	return grid
}

const createNode = (col, row) => {
	return {
		col,
		row,
		distance: Infinity,
		isVisited: false,
		isWall: false,
		previousNode: null,
		isPath: false,
	}
}

export { initGrid }
