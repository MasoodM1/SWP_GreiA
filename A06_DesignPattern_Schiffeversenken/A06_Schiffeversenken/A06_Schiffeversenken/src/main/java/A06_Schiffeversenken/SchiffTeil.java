package A06_Schiffeversenken;

public class SchiffTeil extends Feld {

    private int id;

    public SchiffTeil(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    @Override
    public String toString() {
        if (isGetroffen()) {
            return "*";
        } else {
            return "~";
        }
    }
}