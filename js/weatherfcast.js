
var value,newvalue,windspd,values;

function checkInput(){

    var a=document.getElementById("cityName").value;
    isNaN(a)?$("#btn").prop("disabled",!1):$("#btn").prop("disabled",!0)

}

function convertC(){
    newval = Math.ceil((newvalue -32) * 0.5556) ;
    $("#tempvalue").html(newval);
}


function convertF(){
    newvalue = Math.ceil(value * 1.8 +32) ;
    $("#tempvalue").html(newvalue);
    console.log(windspd);
}

$("#btn").click(function ()
{
        $("div").removeClass("hide-contents");
        
        var city = $("#cityName").val();
        var cityLetter = city;
        titleCase(cityLetter);
        function titleCase(letter){
          $("#cityid").html(letter.charAt(0).toUpperCase() + letter.slice(1));
        }
        var tmpdes;
        $.ajax({

        type:"GET",
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=ef0107f6f8d7d8932a3c0d617ef9b1ec`,
        success : function(output){
            console.log('in success scenario');
           console.log(output);
            console.log(moment(output.dt).format('dddd, h:mm a'));
            tmpdes = output.weather[0].description;
             $("#weather_description").html(output.weather[0].description);
             var iconId = output.weather[0].icon;
            var icon =  "http://openweathermap.org/img/w/" + iconId + ".png";
            $('img').attr('src', icon);
            value = Math.ceil((output.main.temp-273));
            $("#tempvalue").html(Math.ceil((output.main.temp-273)));
            humidity = output.main.humidity+"%";
            console.log(humidity);
            windspeed =  output.wind.speed+"km/h";
            $("#timestamp").html(moment(output.dt * 1000).format('dddd, h:mm a'));
            console.log(windspeed);
            $("#wind").html("Windspeed :"+windspeed);
            $("#humidity").html("Humididty :"+humidity);


            /* LAST DIVISION VALUES*/


            $("#1").html(moment(output.dt * 1000).format('dddd'));
            $("#6").attr('src',icon);
            values = $("#11").html(Math.ceil((output.main.temp-273)));

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
                currentDate = output.list.map((ele) => moment(ele.dt * 1000).format('dddd, h a'));
                console.log(currentDate);
                today = currentDate[0];
                currentTemperature = output.list.map(ele => Math.round(ele.main.temp - 273));
                currentTemp =currentTemperature.slice(0,10);
                console.log(currentTemp);

                var iconId1 = output.list[5].weather[0].icon;
                var icon1 =  "http://openweathermap.org/img/w/" + iconId1 + ".png";
                
                
                $("#2").html(moment(output.list[5].dt * 1000).format('dddd'));
                $("#7").attr('src',icon1);
                $("#12").html(Math.ceil((output.list[5].main.temp-273)));
                var iconId1 = output.list[12].weather[0].icon;
                var icon1 =  "http://openweathermap.org/img/w/" + iconId1 + ".png";
                $("#3").html(moment(output.list[12].dt * 1000).format('dddd'));
                $("#8").attr('src',icon1);
                $("#13").html(Math.ceil((output.list[12].main.temp-273)));
                var iconId1 = output.list[20].weather[0].icon;
                var icon1 =  "http://openweathermap.org/img/w/" + iconId1 + ".png";
                $("#4").html(moment(output.list[20].dt * 1000).format('dddd'));
                $("#9").attr('src',icon1);
                $("#14").html(Math.ceil((output.list[20].main.temp-273)));

                var iconId1 = output.list[28].weather[0].icon;
                var icon1 =  "http://openweathermap.org/img/w/" + iconId1 + ".png";
                $("#5").html(moment(output.list[28].dt * 1000).format('dddd'));
                $("#10").attr('src',icon1);
                $("#15").html(Math.ceil((output.list[28].main.temp-273)));


                plotChart(currentTemp, currentDate);

            },
            error : (output)=>{
                console.log(output);
            }
        });

        const plotChart = (tempArr, datesArr) => {
            Highcharts.chart('chart-container', {
                chart: {
                    type: 'area',
                    height : 200
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: datesArr
                },
               yAxis: {
                    title: {
                        text: 'Temperature(in degree centigrade)'
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
                    area: {
                        dataLabels: {
                          enabled: true
                        },
                        series: {
                            allowPointSelect: true
                        },
                  
                    }
                },
                series: [{
                    name: city,
                    color: Highcharts.getOptions().colors[6],
                    marker: {
                        symbol: 'square'
                    },
                    data: tempArr
                }]
            });
        }
    })
    // wind charts display

    $("#wind1").click(()=>{
     
        const city = $("#cityName").val();
        $.ajax({

            type:"GET",
            url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=ef0107f6f8d7d8932a3c0d617ef9b1ec`,
            success : (output)=>{
                
                console.log(output);
                currentDate = output.list.map((ele) => moment(ele.dt * 1000).format('h a'));
                console.log(currentDate);
                console.log(output.list[0].wind.speed);
                var winds = new Array(38);
                for(var y=0;y<36;y++){
                    winds[y]=(output.list[y].wind.speed);
                   
                }

                var degrees = new Array(38);
                for(var y=0;y<36;y++){
                    degrees[y]=output.list[y].wind.deg;
                   
                }

                currentdeg = degrees.slice(0,10);
                /*for(var i=0;i<37;i++){
                   console.log( winds[i]);
                }*/
                current = winds.slice(0,10);
                plotChart(current,currentdeg, currentDate);
            },
            error : (output)=>{
                console.log(output);
            }
        });

        const plotChart = (windArr,degArr, datesArr) => {
            Highcharts.chart('chart-container', {
                chart: {
                    type: 'windbarb',
                    height:200
                },
                title: {
                    text: ''
                },
                xAxis: {
                    categories: datesArr
                },
                yAxis: {
                    title: {
                        text: 'WindSpeed (in m/s)'
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
                    area: {
                        dataLabels: {
                          enabled: true
                        },
                        series: {
                            allowPointSelect: true
                        },
                  
                    }
                },
                series: [{
                    name: city,
                    data: windArr,

                    name: 'Windspeed',
                    color: Highcharts.getOptions().colors[1],
                    showInLegend: false,
                    tooltip: {
                        valueSuffix: ' m/s'
                    }
                }, {
                    type: 'area',
                    keys: ['y', 'rotation'], // rotation is not used here
                    data: windArr,
                    color: Highcharts.getOptions().colors[0],
                    fillColor: {
                        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [
                                1,
                                Highcharts.color(Highcharts.getOptions().colors[0])
                                    .setOpacity(0.25).get()
                            ]
                        ]
                    },
                    name: 'Wind speed',
                    tooltip: {
                        valueSuffix: ' m/s'
                    }
                }]
            });
        }
    })    
})