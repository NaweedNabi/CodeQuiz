// localStorage.getItem(JSON.parse(highScoreArray))

//sort the array by score so the high scores are on the top

//append the scores to the HTML so they show on the screen

//when you click on clear high scores call localstorage.clear
//localstorage.removeItem.highscoreArray

function printScores() {
    var storedScores = JSON.parse(window.localStorage.getItem('highScoreArray')) || [];
    
    storedScores.sort(function(a, b) {
        return b.highScore-a.highScore;
    });

    storedScores.forEach(function(highScore) {
        var listItem = document.createElement("li");
        listItem.textContent = highScore.highScoreInitials + " - " + highScore.highScore;

        var orderedList = document.getElementById('highscores');
        orderedList.appendChild(listItem);
    });
};

function clearScores() {
    window.localStorage.removeItem('highScoreArray');
    window.location.reload();
};

document.getElementById("clear").onclick = clearScores;

printScores();