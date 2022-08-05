import { Chess, ChessInstance, Square } from 'chess.js';
import {
    action,
    computed,
    makeAutoObservable,
    makeObservable,
    observable,
} from 'mobx';

class ChessStore {
    game: ChessInstance;
    setPosition!: (fen: string) => void;

    constructor() {
        makeAutoObservable(this);
        this.game = new Chess();
    }

    initializeSetPosition = (setPosition: (fen: string) => void) => {
        this.setPosition = setPosition;
    };

    updatePosition = () => {
        console.log('updating', this.game.fen());
        this.setPosition(this.game.fen());
    };

    makeRandomMove = () => {
        let possibleMoves = this.game.moves();

        if (this.game.game_over()) return;

        let randomIndex = Math.floor(Math.random() * possibleMoves.length);

        this.game.move(possibleMoves[randomIndex]);

        console.log('made random move: ', possibleMoves);
    };

    move = (move: string) => {
        this.game.move(move);
    };

    remove = (square: Square) => {
        this.game.remove(square);
    };

    get get() {
        return this.game;
    }

    get fen() {
        return this.game.fen();
    }

    reset = () => {
        this.game = new Chess();
    };
}

export default ChessStore;
