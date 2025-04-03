/**
 * Calcula el mejor movimiento para la Maquina utilizando el algoritmo Minimax.
 * @param squares Estado actual del tablero.
 * @returns Índice del mejor movimiento para la Maquina.
 */
export const getBestMove = (squares: Array<string | null>) => {
  const minimax = (board: Array<string | null>, depth: number, isMaximizing: boolean): number => {
    const winner = calculateWinner(board);
    if (winner === '⭕') return 10 - depth;
    if (winner === '❌') return depth - 10; 
    if (board.every((square) => square !== null)) return 0; // Empate

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = '⭕';
          const score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = '❌';
          const score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  let bestMove = null;
  let bestScore = -Infinity;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      squares[i] = '⭕';
      const score = minimax(squares, 0, false);
      squares[i] = null;
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  // Asegúrate de que la Maquina priorice ganar si tiene la oportunidad
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      squares[i] = '⭕';
      if (calculateWinner(squares) === '⭕') {
        squares[i] = null;
        return i;
      }
      squares[i] = null;
    }
  }

  return bestMove;
};

/**
 * Determina el ganador del juego o si hay un empate.
 * @param squares Estado actual del tablero.
 * @returns '❌', '❌', 'Empate' o null si el juego continúa.
 */
export const calculateWinner = (squares: Array<string | null>) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // Detecta empate si no hay ganador y no hay casillas vacías
  return squares.every((square) => square !== null) ? 'Empate' : null;
};