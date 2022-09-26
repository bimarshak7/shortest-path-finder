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
	const [isClicked, setClick] = useState(false)
	const [tool, setTool] = useState("wall")

	const addWall = (e, row, col, singleCLick) => {
		if ((isClicked || singleCLick) && tool == "wall") {
			let newGrid = [...grid]
			newGrid[row][col].isWall = true
			setGrid(newGrid)
		}
	}
	const clikHandler = (e, row, col) => {
		if (tool == "Start Point") {
			setEndP({ ...endP, SR: row, SC: col })
		}
		if (tool == "End Point") {
			setEndP({ ...endP, ER: row, EC: col })
		}
	}
	const solve = () => {
		const startNode = grid[endP.SR][endP.SC]
		const endNode = grid[endP.ER][endP.EC]
		const visitedNodesInOrder = gaijatra(grid, startNode, endNode)
		const pathOrder = getNodesInShortestPathOrder(endNode)
		animateGaijatra(visitedNodesInOrder, pathOrder)
	}

	const animateGaijatra = (visitedNodesInOrder, pathOrder) => {
		for (let i = 0; i <= visitedNodesInOrder.length; i++) {
			if (i === visitedNodesInOrder.length) {
				setTimeout(() => {
					animatePath(pathOrder)
				}, 5 * i)
				return
			}
			setTimeout(() => {
				const newGrid = [...grid]
				const node = visitedNodesInOrder[i]
				newGrid[node.row][node.col].isTraced = true
				setGrid(newGrid)
			}, 5 * i)
		}
	}

	const animatePath = pathOrder => {
		for (let i = 0; i < pathOrder.length; i++) {
			setTimeout(() => {
				const newGrid = [...grid]
				const node = pathOrder[i]
				newGrid[node.row][node.col].isPath = true
				setGrid(newGrid)
			}, 40 * i)
		}
	}

	const resetGrid = () => {
		setGrid(initGrid())
		setTool("wall")
	}

	return (
		<div>
			<h1>Path Visualizer</h1>
			<div className="toolbar">
				<button onClick={e => setTool("Start Point")}>
					Start Point <span className="node-start">&#9739;</span>
				</button>
				<button onClick={e => setTool("End Point")}>
					End Point <span className="node-end icon">&#9738;</span>
				</button>
				<button onClick={e => setTool("wall")}>Wall</button>
				<button onClick={solve}>Visualize</button>
				<button onClick={resetGrid}>Reset Grid</button>
			</div>
			<div className="message">Select the grid position for {tool}.</div>
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
								onClick={setClick}
								clikHandler={clikHandler}
								addWall={addWall}
								isWall={el.isWall}
								isPath={el.isPath}
								isTraced={el.isTraced}
								tool={tool}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	)
}

export default Visualize
