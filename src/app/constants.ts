export const Constants = {
    APP_NAME: 'WORDLE',
    WORD_SIZE: 5,
    TOTAL_WORDS: 6,
};

/**
 * Possible states of the Wordle letter.
 */
export enum LetterState {
    /** State is not defined */
    White,
    /** Letter is at right location */
    Green,
    /** Letter is available, but not at right location */
    Yellow,
    /** Letter is not available */
    Grey,
}

/**
 * Possible states of the Game.
 */
export enum GameState {
    /** Default state at launch. Game not concluded */
    Playing,
    /** Player won */
    Win,
    /** Player ran out of moves */
    Out,
}