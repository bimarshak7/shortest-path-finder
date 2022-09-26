export function gaijatra(grid, start, end) {
	const visitedNodesInOrder = []
	start.distance = 0
	const unvisitedNodes = grid.flat()
	while (unvisitedNodes.length) {
		unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)
		const closestNode = unvisitedNodes.shift()
		if (closestNode.isWall) continue //avoid wall
		if (closestNode.distance == Infinity) return visitedNodesInOrder
		closestNode.isVisited = true
		visitedNodesInOrder.push(closestNode)
		if (closestNode === end) return visitedNodesInOrder
		updateUnvisitedNeighbors(closestNode, grid)
	}
}

function getUnvisitedNode(node, grid) {
	let neighbors = []
	const { col, row } = node
	if (row > 0) neighbors.push(grid[row - 1][col])
	if (row < grid.length - 1) neighbors.push(grid[row + 1][col])
	if (col > 0) neighbors.push(grid[row][col - 1])
	if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1])
	return neighbors.filter(neighbor => !neighbor.isVisited)
}

function updateUnvisitedNeighbors(node, grid) {
	const unvisitedNeighbors = getUnvisitedNode(node, grid)
	for (const neighbor of unvisitedNeighbors) {
		neighbor.distance = node.distance + 1 //nodes in grid array gets updated (similar to pointer links)
		neighbor.previousNode = node
	}
}

export function getNodesInShortestPathOrder(finishNode) {
	const nodesInShortestPathOrder = []
	let currentNode = finishNode
	while (currentNode !== null) {
		nodesInShortestPathOrder.unshift(currentNode)
		currentNode = currentNode.previousNode
	}
	return nodesInShortestPathOrder
}
