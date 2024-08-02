import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"

function App() {
      const [amount,setAmount]=useState(1)
      const [fromCurrency,setFromCurrency]=useState("USD")
      const [toCurrency,setToCurrency]=useState("EUR")
      const [convertedAmount,setConvertedAmount]=useState(null)
      const[exchangeRate,setExchnageRate]=useState(null)
      useEffect(()=>{
        const getExchangeRate=async () =>{
          try{
            let url=`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
            const  response = await axios.get(url); 
            // console.log(response)
            setExchnageRate(response.data.rates[toCurrency])
          }catch(error){
            console.error("error fetching: ", error);
          }
        }
        getExchangeRate()
      },[fromCurrency, toCurrency]);
      useEffect(()=>{
        if(exchangeRate != null){
          setConvertedAmount((amount * exchangeRate).toFixed(2))
        }

      },[amount, exchangeRate])
      const handleAmountChange=(e)=>{
        const value = parseFloat(e.target.value)
        setAmount(isNaN(value)?0:value)
      }
      const handleFromCurrency=(e)=>{
        setFromCurrency(e.target.value)
      }
      const handleToCurrency=(e)=>{
        setToCurrency(e.target.value)
      }
  return (
    <>
      <div className="currency-connverter">
        <div className="box"></div>
        <div className="data">
          <h1>Currency Converter</h1>
        </div>
        <div className="input-container">
          <label htmlFor="amt">Amount:</label>
          <input type="number"  id="amt" value={amount} onChange={handleAmountChange}/>
        </div>
        <div className="input-container">
          <label htmlFor="fromCurrency">From Currency:</label>
          <select  id="fromCurrency" value={fromCurrency} onChange={handleFromCurrency}>
            <option value='usd'>USD - united states  dollar</option>
            <option value='eur'>EUR - euro</option>
            <option value='gbp'>GBP - british pound  sterling</option>
            <option value="jpy">JPY - japanese  yen</option>
            <option value="aud">AUD - australian dollar</option>
            <option value="cad">CAD - canadian dollar</option>
            <option value="cny">CNY  - chinese yuan renminbi</option>
            <option value="inr">INR - indian rupee</option>
            <option value="brl">BRL - brazilian real</option>
            <option value="zar">ZAR - south african rand</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="toCurrency">To Currency:</label>
          <select  id="toCurrency" value={toCurrency} onChange={handleToCurrency}>
            <option value='usd'>USD - united states  dollar</option>
            <option value='eur'>EUR - euro</option>
            <option value='gbp'>GBP - british pound  sterling</option>
            <option value="jpy">JPY - japanese  yen</option>
            <option value="aud">AUD - australian dollar</option>
            <option value="cad">CAD - canadian dollar</option>
            <option value="cny">CNY  - chinese yuan renminbi</option>
            <option value="inr">INR - indian rupee</option>
            <option value="brl">BRL - brazilian real</option>
            <option value="zar">ZAR - south african rand</option>
          </select>
        </div>
        <div className="result">
          <p>{amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}</p>
        </div>
      </div>
    </>
  )
}

export default App
