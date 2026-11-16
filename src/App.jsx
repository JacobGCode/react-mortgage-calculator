import './App.css'
import { useState } from 'react'

function App() {
  const [balance, setBalance] = useState('')
  const [rate, setRate] = useState('')
  const [term, setTerm] = useState('15')
  const [output, setOutput] = useState('')
  
  function calculate(balance, rate, term) {
  const principal = Number(balance)
  const monthlyInterestRate = Number(rate) / 100 / 12
  const numberOfPayments = Number(term) * 12

  if (balance === '' || rate === '' || principal <= 0 || Number(rate) < 0) {
    setOutput('Please enter a valid balance and interest rate.')
    return
  }

  let monthlyPayment

  if (monthlyInterestRate === 0) {
    monthlyPayment = principal / numberOfPayments
  } else {
    const growth = (1 + monthlyInterestRate) ** numberOfPayments

    monthlyPayment =
      principal * (monthlyInterestRate * growth) / (growth - 1)
  }

  setOutput(`$${monthlyPayment.toFixed(2)} is your payment`)
}
  return (
    <>
      <h1>Mortgage Calculator</h1>

      <div className="fields">
        <div className="field">
          <label htmlFor="balance">Loan Balance ($)</label>
          <input id="balance" data-testid="balance" type="number" value={balance}
          onChange={(event) => setBalance(event.target.value)}/>
        </div>

        <div className="field">
          <label htmlFor="rate">Interest Rate (%)</label>
          <input
            id="rate"
            data-testid="rate"
            type="number"
            step="0.01"
            value={rate}
            onChange={(event) => setRate(event.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="term">Loan Term (years)</label>
          <select
            id="term"
            data-testid="term"
            value={term}
            onChange={(event) => setTerm(event.target.value)}
          >
          <option value="15">15</option>
          <option value="30">30</option>
          </select>
        </div>
        </div>

      <button 
        data-testid="submit"
        onClick={() => calculate(balance, rate, term)}
      >
        Calculate
      </button>

      <div id="output" data-testid="output">{output}</div>
    </>
  )
}

export default App