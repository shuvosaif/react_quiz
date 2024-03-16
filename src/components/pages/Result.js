import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAnswers from '../../hooks/useAnswers'
import Analysis from '../Analysis'
import Summary from '../Summary'
import _ from 'lodash'

export default function Result() {
  const { id } = useParams()
  const { location } = useNavigate()
  const { state } = location
  const { qna } = state

  const { loading, error, answers } = useAnswers(id)

  function calculate() {
    let score = 0
    answers.forEach((question, index1) => {
      let correctIndexes = []
      let checkedIndexes = []

      question.options.forEach((option, index2) => {
        if (option.correct) correctIndexes.push(index2)
        if (qna[index1].options[index2].checked) {
          checkedIndexes.push(index2)
        }
      })
      if ( _.isEqual(correctIndexes, checkedIndexes)) {
        score = score + 5
      }
    })
    return score
  }

  const userScore = calculate()

  return (
    <>
      {loading && <div> Loading ... </div>}
      {error && <div>Error...!! </div>}
      {error && answers.lenght > 0 && (
        <>
          <Summary score={userScore} noq={answers.lenght} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  )
}
