function knightMoves(start, end) {
    // Define all possible moves of a knight
    const moves = [[2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1]];

    // Helper function to check if a position is valid on the board
    function isValid(x, y) {
        return x >= 0 && x < 8 && y >= 0 && y < 8;
    }

    // Perform BFS to find the shortest path
    const queue = [[start, [start]]];
    const visited = new Set();
    
    while (queue.length > 0) {
        const [currentPos, path] = queue.shift();
        if (currentPos[0] === end[0] && currentPos[1] === end[1]) {
            return path;
        }
        visited.add(`${currentPos[0]},${currentPos[1]}`);
        const [x, y] = currentPos;
        for (const [dx, dy] of moves) {
            const nextX = x + dx;
            const nextY = y + dy;
            if (isValid(nextX, nextY) && !visited.has(`${nextX},${nextY}`)) {
                queue.push([[nextX, nextY], [...path, [nextX, nextY]]]);
            }
        }
    }

    // If no path found
    return null;
}

const start = [0, 0];
const end = [7, 7];
const shortestPath = knightMoves(start, end);
if (shortestPath) {
    console.log(`You made it in ${shortestPath.length - 1} moves! Here's your path:`);
    shortestPath.forEach(position => console.log(position));
} else {
    console.log("No valid path found.");
}
