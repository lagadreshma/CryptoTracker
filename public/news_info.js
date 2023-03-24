var baseUrl = "https://news-api14.p.rapidapi.com/top-headlines";
//var proxyUrl = "https://cors-anywhere.herokuapp.com/";
var apiKey = "6c4c673500msh0b76af05239829cp1d12f0jsne2528cd2e856";


fetch(`${baseUrl}`, { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-My-Custom-Header': `${apiKey}`,
      "access-control-allow-credentials": "true",
      "access-control-allow-origin": "*"
    }
}).then((response) => {
    if (response.ok) {
      response.json().then((json) => {
        console.log(json.data);

        

        });
    }

  }).catch((error) => {
    console.log(error);
  });


