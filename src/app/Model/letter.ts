import { LetterState } from "../constants";

/**
 * Letter information model
 */
export interface Letter {
    /** Letter character */
    character: string | undefined;
    /** Current state of the letter */
    state: LetterState;
}