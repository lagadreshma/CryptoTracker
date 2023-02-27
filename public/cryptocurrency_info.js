var baseUrl = "https://api.coinranking.com/v2/coins";
//var proxyUrl = "https://cors-anywhere.herokuapp.com/";
var apiKey = "coinrankingc5b0d6fd54544716e9a7de8b8a316d778f1b76a79fccddf4";


fetch(`${baseUrl}`, { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-My-Custom-Header': `${apiKey}`,
      'Access-Control-Allow-Origin': "*"
    }
}).then((response) => {
    if (response.ok) {
      response.json().then((json) => {
        //console.log(json.data);


        let coinsData = json.data.coins;

        if (coinsData.length > 0) {
          var cryptoCoin = "";
        }
        //For Loop Starts
        coinsData.forEach((coin) => {

            cryptoCoin += `<div class="crypto">
    
            <div class="first">
                <p class="rank"> ${coin.rank}. </p>
                <p class="name"> ${coin.name} </p>
                <img src="${coin.iconUrl}" alt="" class="image">
            </div>
            <hr>
            <div class="second">
                <p class="rankSecond"> Rank : ${coin.rank} </p>
                <p class="price"> Price : $${Math.round(coin.price)} </p>
                <p class="marketCap"> MarketCap : $${coin.marketCap} </p>
                <p class="dailyChange"> Daily Change : <span> ${coin.change} </span></p>
            </div>

            </div>`;

        });
        //For Loop Ends
        document.getElementById("cryptos").innerHTML = cryptoCoin;
      });
    }

  }).catch((error) => {
    console.log(error);
  });


