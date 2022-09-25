function initGrid() {
	const grid = []
	for (let row = 0; row < 20; row++) {
		const currentRow = []
		for (let col = 0; col < 40; col++) {
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
