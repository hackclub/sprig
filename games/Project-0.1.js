import javax.swing.*;
import java.awt.*;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

public class TwoPlayerFightingGame extends JPanel implements KeyListener {

    private int player1X = 50, player1Y = 200, player1Health = 100;
    private int player2X = 700, player2Y = 200, player2Health = 100;
    private boolean player1Punch = false, player2Punch = false;

    public TwoPlayerFightingGame() {
        JFrame frame = new JFrame("2D Fighting Game");
        frame.setSize(800, 400);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.add(this);
        frame.addKeyListener(this);
        frame.setVisible(true);
    }

    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);

        // Background
        g.setColor(Color.LIGHT_GRAY);
        g.fillRect(0, 0, getWidth(), getHeight());

        // Player 1 (Blue)
        g.setColor(Color.BLUE);
        g.fillRect(player1X, player1Y, 50, 50);
        if (player1Punch) {
            g.setColor(Color.RED);
            g.fillRect(player1X + 50, player1Y + 20, 20, 10);
        }

        // Player 2 (Red)
        g.setColor(Color.RED);
        g.fillRect(player2X, player2Y, 50, 50);
        if (player2Punch) {
            g.setColor(Color.BLUE);
            g.fillRect(player2X - 20, player2Y + 20, 20, 10);
        }

        // Health Bars
        g.setColor(Color.GREEN);
        g.fillRect(20, 20, player1Health * 2, 20); // Player 1 health bar
        g.fillRect(760 - player2Health * 2, 20, player2Health * 2, 20); // Player 2 health bar
    }

    @Override
    public void keyPressed(KeyEvent e) {
        int key = e.getKeyCode();

        // Player 1 Controls
        if (key == KeyEvent.VK_W) player1Y -= 10; // Move up
        if (key == KeyEvent.VK_S) player1Y += 10; // Move down
        if (key == KeyEvent.VK_A) player1X -= 10; // Move left
        if (key == KeyEvent.VK_D) player1X += 10; // Move right
        if (key == KeyEvent.VK_SPACE) { // Punch
            player1Punch = true;
            if (player1X + 70 > player2X && player1Y < player2Y + 50 && player1Y + 50 > player2Y) {
                player2Health -= 10;
            }
        }

        // Player 2 Controls
        if (key == KeyEvent.VK_UP) player2Y -= 10; // Move up
        if (key == KeyEvent.VK_DOWN) player2Y += 10; // Move down
        if (key == KeyEvent.VK_LEFT) player2X -= 10; // Move left
        if (key == KeyEvent.VK_RIGHT) player2X += 10; // Move right
        if (key == KeyEvent.VK_ENTER) { // Punch
            player2Punch = true;
            if (player2X - 20 < player1X + 50 && player2Y < player1Y + 50 && player2Y + 50 > player1Y) {
                player1Health -= 10;
            }
        }

        repaint();
        checkGameOver();
    }

    @Override
    public void keyReleased(KeyEvent e) {
        int key = e.getKeyCode();

        if (key == KeyEvent.VK_SPACE) player1Punch = false;
        if (key == KeyEvent.VK_ENTER) player2Punch = false;
    }

    @Override
    public void keyTyped(KeyEvent e) {}

    private void checkGameOver() {
        if (player1Health <= 0 || player2Health <= 0) {
            String winner = player1Health > 0 ? "Player 1" : "Player 2";
            JOptionPane.showMessageDialog(this, winner + " Wins!", "Game Over", JOptionPane.INFORMATION_MESSAGE);
            System.exit(0);
        }
    }

    public static void main(String[] args) {
        new TwoPlayerFightingGame();
    }
}


