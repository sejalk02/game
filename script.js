document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const holes = Array.from(document.querySelectorAll('#game-board > div'));
    const moles = Array.from(document.querySelectorAll('.mole'));
    
    let score = 0;
    let timeLeft = 15;
    let gameInterval;
    let moleInterval;

    function startGame() {
        score = 0;
        timeLeft = 15;
        updateScore();
        updateTimer();

        startButton.disabled = true;
        gameInterval = setInterval(updateTimer, 1000);
        moleInterval = setInterval(showRandomMole, 1000);
    }

    function updateScore() {
        scoreDisplay.textContent = `Score: ${score}`;
    }

    function updateTimer() {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            clearInterval(moleInterval);
            moles.forEach(mole => mole.style.display = 'none');
            startButton.disabled = false;
            alert(`Game Over! Your final score is ${score}`);
        }
    }

    function showRandomMole() {
        const randomHole = holes[Math.floor(Math.random() * holes.length)];
        moles.forEach(mole => mole.style.display = 'none');
        const randomMole = randomHole.querySelector('.mole');
        randomMole.style.display = 'block';
        
        randomHole.addEventListener('click', increaseScore);
    }

    function increaseScore(event) {
        if (event.target.classList.contains('mole')) {
            score++;
            updateScore();
            event.target.style.display = 'none';
        }
    }

    startButton.addEventListener('click', startGame);
});
