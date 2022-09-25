import React, { useState } from "react"
import { Node } from "./Node/node"
import { initGrid } from "../utils/utils"
import { gaijatra, getNodesInShortestPathOrder } from "../utils/algo"
import "./visualize.css"

const Visualize = () => {
	const [endP, setEndP] = useState({
		SR: 10,
		SC: 15,
		ER: 2,
		EC: 12,
	})
	const [grid, setGrid] = useState(initGrid())
	const addWall = (e, row, col) => {
		let newGrid = [...grid]
		newGrid[row][col].isWall = true
		setGrid(newGrid)
	}

	const solve = () => {
		const startNode = grid[endP.SR][endP.SC]
		const endNode = grid[endP.ER][endP.EC]
		const visitedNodesInOrder = gaijatra(grid, startNode, endNode)
		const pathOrder = getNodesInShortestPathOrder(endNode)
		let newGrid = [...grid]
		for (const node of pathOrder) {
			newGrid[node.row][node.col].isPath = true
			setGrid(newGrid)
		}
	}

	const resetGrid = () => {
		setGrid(initGrid())
	}
	return (
		<div>
			<h1>Path Visualizer</h1>
			<div className="toolbar">
				<button>Start Point</button>
				<button>End Point</button>
				<button>Wall</button>
				<button onClick={solve}>Visualize</button>
				<button onClick={resetGrid}>Reset Grid</button>
			</div>
			<div className="grid">
				{grid.map((Row, rowIdx) => (
					<div key={rowIdx} className="row">
						{Row.map((el, idx) => (
							<Node
								isStart={endP.SR == el.row && endP.SC == el.col}
								isEnd={endP.ER == el.row && endP.EC == el.col}
								key={idx}
								col={el.col}
								row={el.row}
								onClick={addWall}
								isWall={el.isWall}
								isPath={el.isPath}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	)
}

export default Visualize
