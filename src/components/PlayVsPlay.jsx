import { useEffect, useState, useRef } from 'react';
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard';

import axiosConfig from '../service/axiosConfig';

export default function PlayVsPlay({ boardWidth }) {
  const chessboardRef = useRef();
  const [game, setGame] = useState(new Chess());

  useEffect(() => {

    const fetchBoardState = async () => {
      const url = "api/board-state";
      await axiosConfig.get(url)
            .then(resp => {
                // console.log(resp);
            })
            .catch(ex => {
                console.log(ex);
            });
    }

    fetchBoardState();
  }, []);

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function onDrop(sourceSquare, targetSquare) {
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // always promote to a queen for example simplicity
    });
    setGame(gameCopy);

    if (move) {
      updateBackendHistory(move);

      return move;
    }
  }

  const updateBackendHistory = (move) => {
    let data = {
      color: move.color,
      flags: move.flags,
      from: move.from,
      piece: move.piece,
      san: move.san,
      to: move.to,
    }

    const url = "api/move";
    axiosConfig.post(url, data)
            .then(resp => {
                // console.log(resp);
            })
            .catch(ex => {
                console.log(ex);
            });
  }

  const createNewGame = () => {
    let data = {
      white: "0xWhite",
      black: "0xBlack",
    }

    const url = `api/create-game?white=${data.white}&black=${data.black}`;
    axiosConfig.post(url, data)
            .then(resp => {
                // console.log(resp);
            })
            .catch(ex => {
                console.log(ex);
            });
  }


  return (
    <div>
      <Chessboard
        id="PlayVsPlay"
        animationDuration={200}
        boardWidth={boardWidth}
        position={game.fen()}
        onPieceDrop={onDrop}
        showBoardNotation={true}
        customBoardStyle={{
          borderRadius: '4px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
        }}
        ref={chessboardRef}
      />

      <button
        className="rc-button"
        onClick={() => {
          safeGameMutate((game) => {
            game.reset();
          });
          chessboardRef.current.clearPremoves();
        }}
      >
        reset
      </button>

      <button
        className="rc-button"
        onClick={() => {
          safeGameMutate((game) => {
            game.undo();
          });
          chessboardRef.current.clearPremoves();
        }}
      >
        undo
      </button>

      <button
        className="rc-button"
        onClick={() => createNewGame()}
      >
        Create new game
      </button>
    </div>
  );
}