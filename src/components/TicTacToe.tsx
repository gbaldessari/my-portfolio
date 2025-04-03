import { useState, useEffect } from 'react';
import './ticTacToe.css';
import { getBestMove, calculateWinner } from './TicTacToeLogic';

/**
 * Componente TicTacToe
 * Representa el juego del tres en raya con lógica para jugar contra la Maquina.
 */
function TicTacToe() {
  // Estado del tablero
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  // Marca del Jugador (❌ u ⭕)
  const [playerMark, setPlayerMark] = useState<'❌' | '⭕'>('❌');
  // Marca de la Maquina (❌ u ⭕)
  const [aiMark, setAiMark] = useState<'❌' | '⭕'>('⭕');
  // Indica si es el turno del Jugador
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  // Indica si el juego ha comenzado
  const [gameStarted, setGameStarted] = useState(false);

  // Efecto para que la Maquina haga su movimiento cuando sea su turno
  useEffect(() => {
    if (!isPlayerTurn && gameStarted && !calculateWinner(board)) {
      setTimeout(() => {
        const bestMove = getBestMove(board);
        if (bestMove !== null) {
          handleClick(bestMove, aiMark);
        }
      }, 500); // Agrega un retraso de 500ms
    }
  }, [isPlayerTurn, gameStarted]);

  /**
   * Maneja el clic en una casilla del tablero.
   * @param index Índice de la casilla seleccionada.
   * @param mark Marca que se colocará en la casilla (❌ u ⭕).
   */
  const handleClick = (index: number, mark: '❌' | '⭕') => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = mark;
    setBoard(newBoard);
    setIsPlayerTurn(!isPlayerTurn);
  };

  /**
   * Reinicia el juego a su estado inicial.
   */
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayerMark('❌');
    setAiMark('⭕');
    setIsPlayerTurn(true);
    setGameStarted(false);
  };

  /**
   * Inicia el juego con la elección del Jugador.
   * @param playerStartsWithX Indica si el Jugador comienza con ❌.
   */
  const startGame = (playerStartsWithX: boolean) => {
    setPlayerMark(playerStartsWithX ? '❌' : '⭕');
    setAiMark(playerStartsWithX ? '⭕' : '❌');
    setIsPlayerTurn(playerStartsWithX);
    setGameStarted(true);

    // Si el Jugador elige '⭕', la Maquina hace el primer movimiento
    if (!playerStartsWithX) {
      const bestMove = getBestMove(Array(9).fill(null));
      if (bestMove !== null) {
        const newBoard = Array(9).fill(null);
        newBoard[bestMove] = '❌';
        setBoard(newBoard);
        setIsPlayerTurn(true);
      }
    }
  };

  // Determina el estado del juego (ganador, empate o siguiente Jugador)
  const winner = calculateWinner(board);
  const status = winner
    ? winner === 'Empate'
      ? 'El juego terminó en empate'
      : `Ganador: ${winner === playerMark ? 'Tú' : 'Máquina'}`
    : `Siguiente Jugador: ${isPlayerTurn ? 'Tú' : 'Máquina'}`;

  // Renderiza la pantalla de selección de Jugador si el juego no ha comenzado
  if (!gameStarted) {
    return (
      <div className='tic-tac-toe'>
        <div className='choose-player'>
          <p>Elige con qué Jugador quieres empezar</p>
          <div>
            <button onClick={() => startGame(true)}>❌</button>
            <button onClick={() => startGame(false)}>⭕</button>
          </div>
        </div>
      </div>
    );
  }

  // Renderiza el tablero del juego
  return (
    <div className='tic-tac-toe'>
      <div className='status'>{status}</div>
      <div className='board'>
        {board.map((value, index) => (
          <button
            key={index}
            className={`square ${value ? 'filled' : ''}`}
            onClick={() => isPlayerTurn && handleClick(index, playerMark)}
          >
            {value}
          </button>
        ))}
      </div>
      <button className='reset-button' onClick={resetGame}>
        <p>
          Reiniciar Juego
        </p>
      </button>
    </div>
  );
}

export default TicTacToe;
