
var myQuestions = [
    {
      title: "Which of the following methods can be used to display data in some form using Javascript?",
      choices: ["document.write()","console.log()","window.alert()","All of the above"],
      answer: "All of the above"
    },
    {
      title: "What will be the output of the following code snippet?<br> <code>a = 5 + '9';<br>document.write(a);</code>",
      choices: ["Compilation Error","14","Runtime Error","59"],
      answer: "59"
    },
    {
      title: "What does the ‘toLocateString()’ method do in JS?",
      choices: ["Returns a localised object representation.","Returns a parsed string","Returns a localised string representation of an object","Bananas &#x1F34C"],
      answer: "Returns a localised string representation of an object"
    },
    {
      title: "When an operator’s value is NULL, the typeof returned by the unary operator is:",
      choices: ["Boolean","Undefined","Object","Integer"],
      answer: "Object"
    },
    {
      title: "Which function is used to serialize an object into a JSON string in Javascript?",
      choices: ["stringify()","parse()","convert()","None of the above"],
      answer: "stringify()"
    },
    {
      title: "Which of the following is not a Javascript framework?",
      choices: ["Node","Vue","React","Tesseract"],
      answer: "Tesseract"
    },
    {
      title: "Which of the following are closures in Javascript?",
      choices: ["Variables","Functions","Objects","All of the above"],
      answer: "All of the above"
    },
    {
      title: "In JavaScript, what is a series of instructions, also known as statements, that a computer can follow one by one?",
      choices: ["A comment", "A method", "A script", "A function"],
      answer: "A script"
    },
    {
      title: "In JavaScript, what do you write to explain what your code does?",
      choices: ["Objects", "Comments", "Loops", "Strings"],
      answer: "Comments"
    },
    {
      title: "In JavaScript, what temporarily stores bits of information the program needs to do its job?",
      choices: ["Variables", "Methods", "Scripts", "Expressions"],
      answer: "Variables"
    },
    {
      title:
        "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["commas", "curly brackets", "quotes", "parentheses"],
      answer: "quotes"
    },
    {
      title:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
      answer: "console.log"
    },
    {
      title:
        "Which of the following is not a valid JavaScript variable name?",
      choices: ["2names", "_first_and_last_names", "FirstAndLast", "None of the above"],
      answer: "2names"
    },
    {
      title:
        "What is the correct JavaScript syntax to write 'Hello World'?",
      choices: ["System.out.println(Hello World)", "println (Hello World)", "document.write(Hello World)"," response.write(Hello World)"],
      answer: "document.write(Hello World)"
    },
    {
      title:
        "Which of the following best describes JavaScript?",
      choices: ["a low-level programming language.", " a scripting language precompiled in the browser.", "a compiled scripting language.", "an object-oriented scripting language."],
      answer: "an object-oriented scripting language."
    }
  ];
  // randomely selects a question from array as a starting point
  var currentQuestionIndex = 0;
  var time = myQuestions.length * 5;
 
  var score = 0;


  //the time is the score, calculate 20 seconds per question, penalty 20 seconds for getting wrong.  reward 10 sec for correct.

  
  // variables to reference DOM elements
  var questionsEl = document.getElementById("questions");
  var timerEl = document.getElementById("time");
  var choicesEl = document.getElementById("choices");
  var submitBtn = document.getElementById("submit");
  var startBtn = document.getElementById("start");
  var initialsEl = document.getElementById("initials");
  var feedbackEl = document.getElementById("feedback");
  var scoreEl = document.getElementById("score");
  var wrongSound = document.getElementById("wrongSound");
  var rightSound = document.getElementById("correctSound");
  var usedQuestions = [];



  scoreEl.textContent = score;
  
  function playWrong () {
    wrongSound.play();
  }

  function playRight() {
    rightSound.play();
  }
  function start() {
    //hide start screen
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");
    
    //display questions by removing the hide class
    questionsEl.removeAttribute("class");
    //start timer and display time
    timerId = setInterval(startTime, 1000);
    timerEl.textContent = time;
    getQuestion();
  }
  
  function getQuestion() {
    // get current question object from array
    var currentQuestion = myQuestions[currentQuestionIndex];
  
    // update title with current question
    var titleEl = document.getElementById("question-title");
    titleEl.innerHTML = currentQuestion.title;
  
    // clear out any old question choices
    choicesEl.innerHTML = "";
  
    // loop over choices and creates new buttons for each choice
    currentQuestion.choices.forEach(function (choice) {
      var choiceNode = document.createElement("button");
      choiceNode.setAttribute("class", "choice");
      choiceNode.setAttribute("value", choice);
      choiceNode.innerHTML =  choice;
  
      // attach click event listener to each choice
      choiceNode.onclick = questionClick;
  
      // display on the page
      choicesEl.appendChild(choiceNode);
    });
  }



  
  function questionClick(event) {
    // check if user guessed wrong
    var value = event.target.value
    console.log(value)
    if (value !== myQuestions[currentQuestionIndex].answer) {
      // penalize time
      time -= 2;
  
      if (time < 0) {
        time = 0;
      }
  
      // display new time on page
      timerEl.textContent = time;
      
  
  
      feedbackEl.style.color = "red";
      feedbackEl.innerHTML = "Incorrect! &#x1F4A9 "  + myQuestions[currentQuestionIndex].answer +"  was the correct answer"
      playWrong();
    } else {

      score ++;
      time += 2;
      feedbackEl.innerHTML = "Correct! &#x1F4AA;";
      feedbackEl.style.color = "green";
      scoreEl.textContent = score;
      playRight();
      
      
      
    }
  currentQuestionIndex++;
    // flash right/wrong feedback on page for half a second
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function () {
      feedbackEl.setAttribute("class", "hide");
    }, 2000);
  
    
    
  
   
    if (currentQuestionIndex === myQuestions.length) {
      end();
    } else {
      getQuestion();
    }
  }
  
  function startTime() {
    time--;
    timerEl.textContent = time;
  
    if (time <= 0) {
      end();
    }
  }
  
  function submitScore() {
    var highScoreInitials = initialsEl.value;
    //var highScore = time;
    var scoreEntry = { highScore: score, highScoreInitials: highScoreInitials };
  
    //get previous scores
    if (highScoreInitials !== "") {
      var highScoreArray =
        JSON.parse(localStorage.getItem('highScoreArray')) || [];
    }
  
  
    //push score entry into high score array
    highScoreArray.push(scoreEntry);
  
    //write back into local storage
    localStorage.setItem('highScoreArray', JSON.stringify(highScoreArray));
  
    //redirect to high scores page
    window.location.href = "score.html";
  }
  
  function end() {
    // stop timer
    clearInterval(timerId);
    timerEl.setAttribute("class", "hide")
  
    // show end screen
    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class",);
  
    // show final score
    var finalScoreEl = document.getElementById("final-score");
    
    if (score === 15) {
      finalScoreEl.innerHTML =  "<h2>"+ score +" ! </h2>" + "  <BR><h2>WOW! You are the Javascript <strong>G.O.A.T!</strong></h2><h1>&#x1F410<h1>";
    }
    if (score >= 10 && score < 15) {
    finalScoreEl.innerHTML =  "<h2>"+ score +" ! "  + "<br>  Excellent! You know your stuff!</h2><h1> &#x1F31F</h1>";
    }
    if (score < 10 && score >= 5) {
    finalScoreEl.innerHTML =  "<h2>"+ score +"" + "<br>  You did....okay...</h2> <h1>&#x1F643</h1>";
    }
    if (score < 5) {
      finalScoreEl.innerHTML = "<h2>"+ score +" :(" + "<br>Here's a cookie for your effort </h2><h1>&#x1F36A</h1>";
      }
    // hide questions section
    questionsEl.setAttribute("class", "hide");
  }
  
  
  //click to start quiz
  startBtn.onclick = start;
  //click to submit initials
  submitBtn.onclick = submitScore;
  
  initialsEl.onkeyup = function checkforEnter(event) {
    if (event.key === "Enter") {
      submitScore();
    }
  }