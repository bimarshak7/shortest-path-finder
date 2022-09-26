import React, { useState } from "react"
import "./node.css"

const Node = ({
	col,
	isEnd,
	isStart,
	isWall,
	isPath,
	isTraced,
	addWall,
	onClick,
	clikHandler,
	row,
	tool,
}) => {
	const mClick = e => {
		if (tool == "wall") {
			onClick(true)
			addWall(e, row, col, true)
		}
	}
	return (
		<div
			className={`node ${
				isStart
					? "node-start"
					: isEnd
					? "node-end"
					: isWall
					? "node-wall"
					: isPath
					? "node-path"
					: isTraced
					? "node-traced"
					: ""
			}`}
			onMouseDown={e => mClick(e)}
			onMouseEnter={e => addWall(e, row, col)}
			onMouseUp={e => onClick(false)}
			onClick={e => clikHandler(e, row, col)}
		>
			{isStart ? <span>&#9739;</span> : isEnd ? <span>&#9738;</span> : ""}
		</div>
	)
}

export { Node }
