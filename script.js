const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: '1)Which tag is used for to hold a text?',
    answers: [
      { text: '<b>This text is bold</b>', correct: true },
      { text: '<b>This text is bold</b>', correct: false }
    ]
  },
  {
    question: 'Which tag form is correct',
    answers: [
      { text: '<!DOCTYPE HTML>', correct: true },
      { text: '<!doctype html>', correct: false },
      { text: '<!DOCKERTYPE HTML>', correct: false },
      { text: '<!dockeytype html>', correct: false }
    ]
  },
  {
    question: 'which is full form of html?',
    answers: [
      { text: 'HYPER TEXT MARKDOWN LANGUAGE', correct: false },
      { text: 'HYPER TEXT MARKUP LANGUAGE', correct: true },
      { text: 'HYPER STYLE MARKUP LANGUAGE', correct: false },
      { text: 'NONE OF THE ABOVE', correct: false }
    ]
  },
  {
    question: 'What is correct?',
    answers: [
      { text: '<p><b><i>lol</p></b></i>', correct: false },
      { text: '<p><b><i>lol</i></b></p>', correct: true }
    ]
  }
]
