import React, { useEffect, useState } from 'react'
import Drop from './currencyDrop'
import { IoIosSwap } from "react-icons/io";


const Counter = () => {
  
  const [currencies,setcurrencies] = useState([])
  const [amount,setAmount] = useState(1)
  
  
  const[fromCurrency,setfromCurrency]=useState("USD")
  const[toCurrency,settoCurrency]=useState("INR")
  const [convertedAmount,setConvertedAmount]=useState(null)
  const [converting,setConverting]=useState(false)
  const [favourite,setFavourite] = useState(JSON.parse(localStorage.getItem("favourites")) || [ "EUR"]);
  
  /// https://api.frankfurter.app/currencies 
  const fetchCurencies=async()=>{
    try{
      const res = await fetch("https://api.frankfurter.app/currencies ")
      const data= await res.json();
      
      setcurrencies(Object.keys(data))
    }catch(error){
      console.log("Error",error);    
    }
    
  }
  useEffect(()=>{
    fetchCurencies();
  },[])
  console.log(currencies)
  
  
  /// https://api.frankfurter.app/latest?amount=1&from=USD&to=INR
  
  const currencyConvert=async()=>{
       if(!amount)return;
        setConverting(true)
    try{
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
      const data= await res.json();
      
      setConvertedAmount(data.rates[toCurrency] +  " " + toCurrency )
    }catch(error){
      console.log("Error",error);    
    }finally {setConverting(false)}
    console.log(convertedAmount)
    
  }
  



  
  
  const handleFavourite=(currency)=>{
    
     }


     const swapCurrency=()=>{
      setfromCurrency(toCurrency)
        settoCurrency(fromCurrency)
     }



    

  return (
    <>
     <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-800">
        Currency Converter
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
       <Drop currencies={currencies} 
       favourite={favourite}
       title="From:"
       currency={fromCurrency}
       setCurrency= {setfromCurrency}
       handleFavourite={handleFavourite}
       />
       {/* swap button */}
       <div className="flex justify-center -mb-5">

         <button onClick={swapCurrency}
          className='p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 '>
         <IoIosSwap className='text-xl text-gray-700' />

         </button>
       </div>




        <Drop currencies={currencies}
        favourite={favourite}
         title="To:"
         currency={toCurrency}
         setCurrency= {settoCurrency}
          handleFavourite={handleFavourite}/>


       </div>
       <div className="mt-12">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount:
        </label>
        <input
          onChange={(e) => setAmount(e.target.value)}
          value = {amount}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="number"
        />
      </div>
            
      <div className="justify-end mt-6 flex">
        <button
          onClick={currencyConvert} 
          className={`px-5 py-2 bg-indigo-600 text-white rounded-md focus:outline-none focus:ring-2
           focus:ring-indigo-900 focus:ring-offset-2 hover:bg-indigo-800 focus:ring-opacity-50
        ${converting?"animal-pulse":""}`}>
          Convert
        </button>
      </div>

        <div className="mt-4 text-lg font-medium text-right text-green-600">Converted Amount:{convertedAmount}</div>
                  </div>


         
    </>
  )

}

export default Counter

