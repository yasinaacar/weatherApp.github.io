const body=document.getElementById('body');
const input=document.querySelector('.input-area');
const search=document.querySelector('.search-btn');
const city=document.querySelector('.city-name');
const country=document.querySelector('.country-name');
const weatherImg=document.querySelector('.weather-image img');
const degree=document.querySelector('.weather-degree');
const weatherStatue=document.querySelector('.weather-text');
const minMax=document.querySelector('.min-max');
const humidity=document.querySelector('.humidity')




window.addEventListener('load', ()=>{ //sayfa her yüklendiğinde gösterilecek blok
    setBackground();
    setDefaulWeather();
    
})


search.addEventListener('click', ()=>{  //arama butonuna tıklandığında çalışacak blok
    sendReq();
    input.value=''
})


function setDefaulWeather(){ //sayfa ilk açıldığında gösterilecek bilgileri oluşturulduğu fonksiyon
    fetch(defaultWeather). //defaultWeeather adlı değişkeni sunucuya gönder
    then(response=>response.json()) //gelen bilgiyi stringten json modeline çevir
    .then(result=>{
        displayWeather(result)//json modelinden çektiğimiz bilgileri HTML'e döndürecek fonksiyonun çalıştırıldığı alan
    }).catch(err)
}


function setBackground(){//cihazın saat bilgisine göre arka plan işlemlerini gerçekleştirdiğimiz blok

    const time=new Date();
    let presentTime=time.getHours();

    if((presentTime>=18)){
        body.style.backgroundImage=`url(img/night-bg.jpeg)`
    }


    else if((presentTime>=6)){
        body.style.backgroundImage=`url(img/morning-bg.jpg)`
    }

    else if(presentTime>=0){
        body.style.backgroundImage=`url(img/night-bg.jpeg)`
    }
}

function displayWeather(result){//sunucudan gelen bilgileri HTML'e yerleştirdiğimiz blok
    
    const icon=result.weather[0].icon;


    city.innerHTML= result.name;
    country.innerHTML=result.sys.country;
    degree.innerHTML=Math.round((result.main.temp));
    weatherStatue.innerHTML=result.weather[0].description;
    setWeatherIcon(icon);
    minMax.textContent=`${Math.floor(result.main.temp_min)} °C  /  ${Math.ceil(result.main.temp_max)}  °C`
    humidity.textContent=`${result.main.humidity}`;
    
}


function setWeatherIcon(icon){ //apiden çektimiz hava durumu icon bilgilerine göre kendi oluşturduğumuz resimleri yerleştirdiğimiz alan
    if(icon==='01d'){
        weatherImg.src=`img/sunny-icon.png`
    }
    else if(icon==='01n'){
        weatherImg.src=`img/sun-ng.png`
    }
    else if((icon==='02d') || (icon==='04d')){
        weatherImg.src=`img/partly-cloudly.png`
    }
    else if((icon==='02n') || (icon==='04n')){
        weatherImg.src=`img/partly-cloudly-ng.png`
    }
    else if((icon==='03d') || (icon==='03n')){
        weatherImg.src=`img/cloudly-icon.png`
    }
    else if((icon==='09d') || (icon==='10d')){
        weatherImg.src=`img/rainy.png`
    }
    else if((icon==='09n') || (icon==='10n')){
        weatherImg.src=`img/rainy-ng.png`
    }
    else if((icon==='11d') || (icon==='11n')){
        weatherImg.src=`img/thunder.png`
    }
    else if((icon==='13d') || (icon==='13n')){
        weatherImg.src=`img/snowy.png`
    }
    else if((icon==='50d') || (icon==='50n')){
        weatherImg.src=`img/mist.png`
    }
    else{
        weatherImg.src=`img/cloudly-icon.png`
    }
}

function err(){//eğer sunucudan hata alırsak çalıştırılacak blok
    window.alert('Lütfen Geçerli Bir Şehir Adı Girin');
    input.value=''
}



