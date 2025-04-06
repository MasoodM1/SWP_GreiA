package A06_Schiffeversenken;

import javafx.scene.control.Button;
import javafx.scene.layout.GridPane;
import model.BattleshipGame;

public class GameController {
    private BattleshipGame game;
    private GridPane gameBoard;

    public GameController(GridPane gameBoard) {
        this.gameBoard = gameBoard;
        this.game = new BattleshipGame();
        initializeGameBoard();
    }

    private void initializeGameBoard() {
        for (int row = 0; row < 10; row++) {
            for (int col = 0; col < 10; col++) {
                Button button = new Button();
                button.setStyle("-fx-background-color: lightblue;");
                button.setPrefSize(50, 50);
                final int r = row;
                final int c = col;
                button.setOnAction(e -> handleFieldClick(r, c, button));
                gameBoard.add(button, col, row);
            }
        }
    }

    private void handleFieldClick(int row, int col, Button button) {
        boolean hit = game.makeGuess(row, col);
        if (hit) {
            button.setStyle("-fx-background-color: red;"); // Hit
        } else {
            button.setStyle("-fx-background-color: white;"); // Miss
        }
    }
}