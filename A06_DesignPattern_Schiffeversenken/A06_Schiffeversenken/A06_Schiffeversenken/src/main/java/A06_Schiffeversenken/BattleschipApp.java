package A06_Schiffeversenken;

import java.util.Random;

public class BattleshipGame {
    private final int boardSize = 10;
    private final boolean[][] board;
    private final boolean[][] hits;
    private final boolean[][] misses;
    private int remainingShips;

    public BattleshipGame() {
        board = new boolean[boardSize][boardSize];
        hits = new boolean[boardSize][boardSize];
        misses = new boolean[boardSize][boardSize];
        remainingShips = 5; // Example: starting with 5 ships
        initializeGame();
    }

    private void initializeGame() {
        Random random = new Random();
        for (int i = 0; i < remainingShips; i++) {
            int x, y;
            do {
                x = random.nextInt(boardSize);
                y = random.nextInt(boardSize);
            } while (board[x][y]); // Ensure no overlapping ships
            board[x][y] = true; // Place a ship
        }
    }

    public boolean makeGuess(int x, int y) {
        if (hits[x][y] || misses[x][y]) {
            return false; // Already guessed this field
        }

        if (board[x][y]) {
            hits[x][y] = true;
            remainingShips--;
            return true; // Hit
        } else {
            misses[x][y] = true;
            return false; // Miss
        }
    }

    public boolean isGameOver() {
        return remainingShips <= 0;
    }

    public int getRemainingShips() {
        return remainingShips;
    }

    public boolean isHit(int x, int y) {
        return hits[x][y];
    }

    public boolean isMiss(int x, int y) {
        return misses[x][y];
    }
}