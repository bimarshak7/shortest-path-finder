import React, { useState } from "react"
import "./node.css"

const Node = ({
	col,
	isEnd,
	isStart,
	isWall,
	isPath,
	onMouseDown,
	onClick,
	onMouseUp,
	row,
}) => {
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
					: ""
			}`}
			onClick={e => onClick(e, row, col)}
		>
			{isStart ? (
				<span className="symbol">&#9739;</span>
			) : isEnd ? (
				<span className="symbol">&#9738;</span>
			) : (
				""
			)}
		</div>
	)
}

export { Node }
