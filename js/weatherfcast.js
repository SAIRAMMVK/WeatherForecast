function checkInput(){
    var input = document.getElementById("cityName").value;
    if(isNaN(input)){
        $("#btn").prop("disabled",false);
    }
    else{
        $("#btn").prop("disabled",true);    
    }
}
var value,newvalue;
function convertC(){
    
    newval = Math.ceil((newvalue -32) * 0.5556) ;
    $("#tempvalue").html(newval);

}
function convertF(){
    newvalue = Math.ceil(value * 1.8 +32) ;
    //alert(value);
    $("#tempvalue").html(newvalue);
}

$("#btn").click(function ()

    {
        var city = $("#cityName").val();
        $("#cityid").html(city);
        var tmpdes;
        $.ajax({

        type:"GET",
        url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=ef0107f6f8d7d8932a3c0d617ef9b1ec',
        success : function(output){
            console.log('in success scenario');
            console.log(output);
            // Timestamp = output.list.map ((ele) => moment(ele.dt * 1000).format('dddd, h:mm a'));
            // console.log(Timestamp);
             $("#timestamp").html("getting temperatrue");
            tmpdes = output.weather[0].description;
             $("#weather_description").html(output.weather[0].description);
             if(tmpdes==="haze"){
                console.log("in loop");
                    $("#icon").attr("src","images/haze.png");
            }
            value = Math.ceil((output.main.temp-273));
            $("#tempvalue").html(Math.ceil((output.main.temp-273)));
            humidity = output.main.humidity+"%";
            console.log(humidity);
            windspeed =  output.wind.speed+"km/h";
            console.log(windspeed);
            $("#wind").append(windspeed);
            $("#humidity").append(humidity);

        },

        error  : function (err){
            console.log('in failure scenario');
            console.log(err);
            alert(err);

        }
    });

    $("#temp1").click(()=>{
        const city = $("#cityName").val();
        $.ajax({

            type:"GET",
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=ef0107f6f8d7d8932a3c0d617ef9b1ec`,
            success : (output)=>{
                
                console.log(output);
                currentDate = output.list.map((ele) => moment(ele.dt * 1000).format('h:mm a'));
                console.log(currentDate);
                currentTemperature = output.list.map(ele => Math.round(ele.main.temp - 273));
                console.log(currentTemperature);
                plotChart(currentTemperature, currentDate);
            },
            error : (output)=>{
                console.log(output);
            }
        });

        const plotChart = (tempArr, datesArr) => {
            Highcharts.chart('chart-container', {
                chart: {
                    type: 'spline'
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: datesArr
                },
                yAxis: {
                    title: {
                        text: 'Temperature'
                    },
                    labels: {
                        formatter: function () { return this.value + '°'; }
                    }
                },
                tooltip: {
                    crosshairs: true,
                    shared: true
                },
                plotOptions: {
                    spline: {
                        marker: {
                            radius: 4,
                            lineColor: '#666666',
                            lineWidth: 1
                        }
                    }
                },
                series: [{
                    name: cityName,
                    marker: {
                        symbol: 'square'
                    },
                    data: tempArr
    
                }]
            });
        }





    })

    
})