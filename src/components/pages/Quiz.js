import { getDatabase, ref, set } from 'firebase/database'
import _ from 'lodash'
import { useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import useQuestions from '../../hooks/useQuestions'
import Answers from '../Answers'
import MiniPlayer from '../MiniPlayer'
import ProgressBar from '../ProgressBar'

const initialState = null
const reducer = (state, action) => {
  switch ((action, state)) {
    case 'questions':
      action.value.forEach((question) => {
        question.options.foreach((option) => {
          option.checked = false
        })
      })
      return action.value
    case 'answer':
      const questions = _.cloneDeep(state)
      questions[action.questionID].options[action.optionIndex].checked =
        action.value

      return questions
    default:
      return state
  }
}

export default function Quiz() {
  const { id } = useParams()
  const { loading, error, questions } = useQuestions(id)
  const [currentQuestion, setCurrentQuestions] = useState(0)

  const [qna, dispatch] = useReducer(reducer, initialState)
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch({
      type: 'questions',
      value: questions,
    })
  }, [questions])

  function handleAnswerChange(e, index) {
    dispatch({
      type: 'answer',
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    })
  }

  function nextQuestion() {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestions((prevCurrent) => prevCurrent + 1)
    }
  }
  function prevQuestion() {
    if (currentQuestion >= 1 && currentQuestion <= questions.length) {
      setCurrentQuestions((prevCurrent) => prevCurrent + 1)
    }
  }

  async function submit() {
    const { uid } = currentUser

    const db = getDatabase()
    const resultRef = ref(db, `result/${uid}`)

    await set(resultRef, {
      [id]: qna,
    })

    navigate({
      pathname: `/result/${id}`,
      state: {
        qna,
      },
    })
  }

  const percentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0

  return (
    <>
      {loading && <div>Loading .. </div>}
      {error && <div>There was an Error.. </div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            input
            options={qna[currentQuestion].options}
            handleChange={handleAnswerChange}
          />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            submit={submit}
            progress={percentage}
          />
          <MiniPlayer id={id} title={qna[currentQuestion].title} />
        </>
      )}
    </>
  )
}
