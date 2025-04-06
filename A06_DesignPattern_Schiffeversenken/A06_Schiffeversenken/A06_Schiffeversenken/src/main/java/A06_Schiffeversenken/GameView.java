import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.VBox;
import javafx.scene.control.Label;
import javafx.stage.Stage;

public class GameView extends Application {
    private static final int BOARD_SIZE = 10; // 10x10 grid
    private Button[][] buttons = new Button[BOARD_SIZE][BOARD_SIZE];
    private Label remainingShipsLabel;
    private int remainingShips = 10; // Example initial value

    @Override
    public void start(Stage primaryStage) {
        primaryStage.setTitle("Battleship Game");

        VBox vbox = new VBox(10);
        remainingShipsLabel = new Label("Remaining Ships: " + remainingShips);
        GridPane gameBoard = new GridPane();

        for (int row = 0; row < BOARD_SIZE; row++) {
            for (int col = 0; col < BOARD_SIZE; col++) {
                buttons[row][col] = new Button();
                buttons[row][col].setStyle("-fx-background-color: lightblue;");
                buttons[row][col].setMinSize(50, 50);
                final int r = row;
                final int c = col;
                buttons[row][col].setOnAction(event -> handleFieldClick(r, c));
                gameBoard.add(buttons[row][col], col, row);
            }
        }

        vbox.getChildren().addAll(remainingShipsLabel, gameBoard);
        Scene scene = new Scene(vbox, 600, 600);
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    private void handleFieldClick(int row, int col) {
        // Logic to determine hit or miss
        boolean isHit = Math.random() < 0.5; // Randomly determine hit/miss for demonstration
        if (isHit) {
            buttons[row][col].setStyle("-fx-background-color: red;"); // Hit
            remainingShips--;
        } else {
            buttons[row][col].setStyle("-fx-background-color: gray;"); // Miss
        }
        updateRemainingShipsLabel();
    }

    private void updateRemainingShipsLabel() {
        remainingShipsLabel.setText("Remaining Ships: " + remainingShips);
    }

    public static void main(String[] args) {
        launch(args);
    }
}