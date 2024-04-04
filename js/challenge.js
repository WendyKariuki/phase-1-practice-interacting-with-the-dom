// load DOM and accesss elements
document.addEventListener('DOMContentLoaded', function() {
    const counterElement = document.getElementById('counter');
    const minusButton = document.getElementById('minus');
    const plusButton = document.getElementById('plus');
    const likeButton = document.getElementById('heart');
    const pauseButton = document.getElementById('pause');
    const likesList = document.querySelector('.likes');
    let counterValue = parseInt(counterElement.textContent);
    const likes = {};
    let isPaused = false;
    let timer;

    // Function to update the counter display
    function updateCounter() {
        counterElement.textContent = counterValue;
    }

    // Function to start the counter
    function startCounter() {
        timer = setInterval(function() {
            if (!isPaused) {
                counterValue++;
                updateCounter();
            }
        }, 1000);
    }

    // Function to pause the counter
    function pauseCounter() {
        clearInterval(timer);
        isPaused = true;
        pauseButton.textContent = 'Resume';
        minusButton.disabled = true;
        plusButton.disabled = true;
        likeButton.disabled = true;
    }

    // Function to resume the counter
    function resumeCounter() {
        isPaused = false;
        pauseButton.textContent = 'Pause';
        minusButton.disabled = false;
        plusButton.disabled = false;
        likeButton.disabled = false;
        startCounter();
    }

    // Function to handle like button click
    likeButton.addEventListener('click', function() {
        if (!likes[counterValue]) {
            likes[counterValue] = 1;
        } else {
            likes[counterValue]++;
        }
        renderLikes();
    });

    // Function to render likes
    function renderLikes() {
        likesList.innerHTML = '';
        for (const [number, count] of Object.entries(likes)) {
            const li = document.createElement('li');
            li.textContent = `${number}: ${count} like${count !== 1 ? 's' : ''}`;
            likesList.appendChild(li);
        }
    }

    // Function to handle pause button click
    pauseButton.addEventListener('click', function() {
        if (isPaused) {
            resumeCounter();
        } else {
            pauseCounter();
        }
    });

    // Function to handle minus button click
    minusButton.addEventListener('click', function() {
        counterValue--;
        updateCounter();
    });

    // Function to handle plus button click
    plusButton.addEventListener('click', function() {
        counterValue++;
        updateCounter();
    });

    // Start the counter initially
    startCounter();
});
