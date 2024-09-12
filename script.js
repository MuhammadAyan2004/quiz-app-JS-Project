const questionElem = document.getElementById("question");
const answerBtn = document.getElementById("answer-button");
const nextbtn = document.querySelector(".btn-main");

let currentQuestionIndex = 0;
let score = 0;

const questions = [
    {question: "which is the largest animal in the world?",
     answers:[{text:"shark",correct:false},{text:"Blue whale",correct:true},{text:"Elephant",correct:false},{text:"Giraffe",correct:false},]},
    {question: "which is the smallest country in the world?",
    answers:[{text:"Vitican city", correct:true},{text:"Sri lanka", correct:false},{text:"Bhutan", correct:false},{text:"Nepal", correct:false},]},
    {question: "which is the largest desert in the world?",
    answers:[{text:"Kalhari", correct:false},{text:"Gobi", correct:false},{text:"Sahara", correct:false},{text:"Antartica", correct:true},]},
    {question: "which is the smallest continent in the world?",
    answers:[{text:"Africa", correct:false},{text:"Asia", correct:false},{text:"Australia", correct:true},{text:"America", correct:false},]},
];
function startQuiz(){
    currentQuestionIndex = 0;
    score=0;
    nextbtn.innerHTML="next";
    showQuestion();
};
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElem.innerHTML = questionNo+ ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerText=answer.text;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    });
};
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct=== "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach(button=>{
        if(button.dataset.correct=== "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    })
    nextbtn.style.display="block"
};
function resetState(){
    nextbtn.style.display="none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }
};
nextbtn.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextQuestion();
    }else{
        startQuiz();
    }
});
function handleNextQuestion(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
function showScore(){
    resetState();
    questionElem.innerHTML=`you scored ${score} out of ${questions.length}`;
    questionElem.style.color="white";
    nextbtn.innerHTML="Play Again";
    nextbtn.style.display="block"
};
startQuiz();