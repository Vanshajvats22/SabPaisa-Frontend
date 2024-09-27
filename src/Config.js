const ENV_PROD = false;
let url;

if(ENV_PROD){


}
else{
url = "https://stage-merchant-report.sabpaisa.in";
}

const API_LIVE = {
TRANSACTION_TOTAL_REPORTS:`${url}/api/transaction/`,
LOGIN:`${url}/api/login/`


}
const API_URL = API_LIVE;

export default API_URL