import { game, updateWindow } from "../view/home_page.js";
import { GameState, marking } from "../model/tictactoe_game.js";
import { currentUser } from "./firebase_auth.js";
import { addTicTacToeGameRecord } from "./firestore_controller.js";

export async function onClickBoardButton(e) {
    const pos = parseInt(e.currentTarget.value[3])
    game.play(pos);
    game.setWinner();
    if (game.winner != null) {
        game.gameState = GameState.DONE;
        await savePlayRecord();
    } else {
        game.changeTurn();
    }
    updateWindow();
}

async function savePlayRecord() {
const email = currentUser.email;
const moves = game.moves;
let winner = game.winner;
if (winner == marking.U){
    winner = 'Draw';
}
const timestamp = Date.now();
const playRecord = {email, moves, winner, timestamp};

const div = document.createElement('div');
div.classList.add('text-white', 'bg-primary');
div.textContent = 'Saving to Firestore ...';
document.getElementById('message').appendChild(div);

 try{
    await addTicTacToeGameRecord(playRecord);
 } catch (e) {
    if (DEV) console.log('failed to save play record', e);
    alert(` Failed to save: ${JSON.stringify(e)}`);
 }
 div.remove();
}

export function onClickNewGame(e) {
    game.reset();
    game.gameState = GameState.PLAYING;
    updateWindow();

}