package A06_Schiffeversenken;

import java.util.ArrayList;

public class SpielFeld {
    private Feld[][] felder = new Feld[10][10];
    private int wasserGetroffen;
    private int schiffeGetroffen;
    private int schiffeInsgesamt;

    public SpielFeld() {
        init();
    }

    public Feld[][] getFelder() {
        return felder;
    }

    public int getWasserGetroffen() {
        return wasserGetroffen;
    }

    public int getSchiffeInsgesamt() {
        return schiffeInsgesamt;
    }

    public int getSchiffeGetroffen() {
        return schiffeGetroffen;
    }

    public void init() {
        felder = new Feld[10][10];
        for (int i = 0; i < felder.length; i++) {
            for (int j = 0; j < felder[i].length; j++) {
                felder[i][j] = new Feld();
            }
        }
        schiffeInsgesamt = 10; // Example number of ships
        // Call method to place ships on the board
        schiffSetzen(5, 0);
        schiffSetzen(4, 1);
        schiffSetzen(4, 2);
        schiffSetzen(3, 3);
        schiffSetzen(3, 4);
        schiffSetzen(3, 5);
        schiffSetzen(2, 6);
        schiffSetzen(2, 7);
        schiffSetzen(2, 8);
        schiffSetzen(2, 9);
    }

    private void schiffSetzen(int laenge, int id) {
        // Logic to place ships on the board
        // This method should randomly place ships of given length and id
    }

    public void schuss(Position p) {
        felder[p.getX()][p.getY()].setGetroffen(true);
        if (felder[p.getX()][p.getY()] instanceof SchiffTeil) {
            schiffeGetroffen++;
        } else {
            wasserGetroffen++;
        }
    }

    public boolean fertig() {
        for (int i = 0; i < felder.length; i++) {
            for (int j = 0; j < felder[i].length; j++) {
                if (felder[i][j] instanceof SchiffTeil && !felder[i][j].isGetroffen()) {
                    return false;
                }
            }
        }
        return true;
    }

    public int getAnzahlSchiffe() {
        int anzahl = 0;
        for (int i = 0; i < felder.length; i++) {
            for (int j = 0; j < felder[i].length; j++) {
                if (felder[i][j] instanceof SchiffTeil) {
                    anzahl++;
                }
            }
        }
        return anzahl - schiffeGetroffen;
    }

    @Override
    public String toString() {
        StringBuilder str = new StringBuilder();
        for (Feld[] row : felder) {
            for (Feld field : row) {
                str.append(field.toString()).append(" ");
            }
            str.append("\n");
        }
        return str.toString();
    }
}
