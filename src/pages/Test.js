
// testing out Chase API

const url= 'https://apidemo.chase.com/api/aggregator-oauth/v1/authorize?response_type=code&client_id=SUNSHINE_WALLET&redirect_uri=showcaseApp/payment-settlement/eligible-accounts&state=apigeeapp&scope=agreegator';
/*ES5*/
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  console.log("this.status: ", this.status)
};
xhttp.open('GET', url, true);
xhttp.setRequestHeader('Content-Type', 'application/json');
xhttp.send();

/*ES6*/
fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}).then(response => {console.log("response.status: ", response.status)})
  .then(data => console.log("data: ", data))
  .catch(error => console.log(error));
