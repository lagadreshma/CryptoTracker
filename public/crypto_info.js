var baseUrl = "WebsiteURL";
var apiKey = "API Key";


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

        let totalData = json.data.stats;

        
        let totalCoins =  totalData.totalCoins;
        let totalMarkets =  totalData.totalMarkets;
        let totalExchanges = totalData.totalExchanges;
        let totalMarketCaps = totalData.totalMarketCap;
        let total24hVolume = totalData.total24hVolume;

        document.getElementById('totalCoins').innerHTML = totalCoins;
        document.getElementById('totalMarkets').innerHTML = totalMarkets;
        document.getElementById('totalExchanges').innerHTML = totalExchanges;
        document.getElementById('totalMarketCaps').innerHTML = totalMarketCaps;
        document.getElementById('total24hVolume').innerHTML = total24hVolume;


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


