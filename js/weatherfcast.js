function checkInput(){
    var input = document.getElementById("cityName").value;
    if(isNaN(input)){
        $("#btn").prop("disabled",false);
    }
    else{
        $("#btn").prop("disabled",true);    
    }
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
            $("#tempvalue").html(Math.ceil((output.main.temp-273)));

        },

        error  : function (err){
            console.log('in failure scenario');
            console.log(err);
            alert(err);

        }
    });

    
})