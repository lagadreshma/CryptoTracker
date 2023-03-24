var baseUrl = "news api url";
var apiKey = "api key";


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


