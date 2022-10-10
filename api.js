const url='https://api.openweathermap.org/data/2.5/';
const key='de4257d1b843baac5253e157ac10923f';
const defaultWeather=`${url}weather?q=istanbul&appid=${key}&units=metric&lang=tr`;//sayfa yüklendiğinde gösterilecek şehir için oluşturduğumuz değişken


function sendReq(){
    fetch(`${url}weather?q=${input.value}&appid=${key}&units=metric&lang=tr`)
    .then(response=> response.json())
    .then(result=>{
        displayWeather(result);
    }).catch(err)
}
 
