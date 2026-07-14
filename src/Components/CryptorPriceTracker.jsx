import React, { useEffect, useState } from "react";
import "./CryptorPriceTracker.css";
import axios from 'axios'
const CryptorPriceTracker = () => {
  const [crypto, setCrypto] = useState("")
  const [price,setPrice]=useState([])

  const handleChang = (e) => {
    setCrypto(e.target.value);
    console.log(crypto);
  };

const apikey=import.meta.env.VITE_API_KEY;
useEffect(()=>{
  axios.get('https://api.coinstats.app/v1/coins',{headers:{'X-API-KEY':apikey}})
  .then(res =>setPrice(res.data.result))
  .catch(err=>console.log(err)
  )
},[])


  return (
    <>
      <div className="Container">
        <div className="title">
          <h1>Live Crypto Price Tracker</h1>
          <h4>By Vishal_Vee</h4>
        </div>
        <input
          type="text"
          placeholder="Search Crypto"
          value={crypto}
          onChange={handleChang}
        />

        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Symbol</th>
                <th>MarketCap</th>
                <th>Price</th>
                <th>Available Supply</th>
                <th>Volume(24hr)</th>
              </tr>
            </thead>

            <tbody>
          {
            price.filter((val)=>{
              return val.name.toLowerCase().includes(crypto.toLowerCase())
            }).map((val,index)=>{
              return (
              <tr key={index}>
                <td>{val.rank}</td>
                <td><a href={val.websiteUrl}>
                    <img src={val.icon} alt="" />
                  </a>
                  <p>{val.name}</p>
                </td>
                <td>{val.symbol}</td>
                <td>${val.marketCap}</td>
                <td>{val.price.toFixed(2)}</td>
                <td>{val.availableSupply}</td>
                <td>{val.volume.toFixed(0)}</td>
              </tr>)
            })
          }
          </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CryptorPriceTracker;
