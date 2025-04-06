package A06_Schiffeversenken;

public class Feld {
    private boolean getroffen;

    public Feld() {
        this.getroffen = false;
    }

    public boolean isGetroffen() {
        return getroffen;
    }

    public void setGetroffen(boolean getroffen) {
        this.getroffen = getroffen;
    }

    @Override
    public String toString() {
        if (getroffen) {
            return "Hit";
        } else {
            return "Miss";
        }
    }
}