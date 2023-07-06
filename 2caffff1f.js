if ((window.location.href).indexOf("RegisteredLogin") > -1) {
var lyes_tz = $(".submitbtn"),
attempts = 0
login();

/*-Load-Captcha-*/

function onCaptchaLoaded(img) {

    $("#balance").html('CONVERTING..');$("#balance").fadeOut('slow').fadeIn("slow");$("#balance").css({background : "#CC6600"})
    convertImgToBase64(img, function(dataURL) {
        var base64 = dataURL.split(",")[1],
            xhr = new XMLHttpRequest();

        xhr.open("POST","https://2captcha.com/in.php",true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send("method=base64&key=" + captchaKey + "&regsense=1&phrase=0&numeric=3&calc=0&language=2&min_len=4&max_len=4&header_acao=1&body=" + encodeURIComponent(base64));
        xhr.onreadystatechange=function() {
            if (xhr.readyState==4 && xhr.status==200) {
                if (xhr.responseText.indexOf('OK') === 0) {
                    setTimeout(function() {
                        pollCaptcha(xhr.responseText.split('|')[1]);
                        $("#balance").html('SOLVING..');$("#balance").fadeOut('slow').fadeIn("slow");$("#balance").css({background : "#eb2121"})
                    },2000);
                } else {
                    $("#balance").html('ERROR');$("#balance").fadeOut('slow').fadeIn("slow");$("#balance").css({background : "#eb2121"})
                }
            }
        }
    });
}

/*-SEND-Captcha-*/

function pollCaptcha(id) {
let count = 0
var url1 = "https://2captcha.com/res.php?key=" + captchaKey + "&action=get&id=" + id


   GM_xmlhttpRequest({
                            method: "GET",
                            url: url1,
                            headers: { "contrn-type": "text/xml" },
                            onload: function(response2) {
                                let text2 = response2.responseText
                                if(text2.indexOf("ERROR")>-1){
                                    console.log("ERROR:res.phpERROR:"+text2)
                                    return;
                                }
                                if(text2.indexOf("OK")>-1){
                                    $('#CaptchaInputText').trigger('focus');
                                    var input = document.querySelector('#CaptchaInputText')
                                    input.value = text2.split('|')[1];
                                    $("#balance").html('SOLVED');$("#balance").fadeOut('slow').fadeIn("slow");$("#balance").css({background : "#208738"})
                                     setTimeout(function() {
                                    getbalance()
                                         document.getElementById('formulaire1').click();
                                         setTimeout(function() {
                                    lyes_tz.click()
                                         }, 2000);
                                         }, 2000);
                                }else {
                                 setTimeout(function() {
                    pollCaptcha(id);
                    $("#balance").html('NOT-READY..');$("#balance").fadeOut('slow').fadeIn("slow");$("#balance").css({background : "#A9196B"})
                }, 2000);
                                    return;
                                }}})
}
    /*-balance-Captcha-*/

function getbalance() {
    var url1 = "https://2captcha.com/res.php?key=" + captchaKey + "&action=getbalance&json=1"
    GM_xmlhttpRequest({
                            method: "GET",
                            url: url1,
                            headers: { "contrn-type": "text/xml" },
                            onload: function(response2) {
                                let text2 = response2.responseText
                                var rp = text2.split('"')[5]
                                $("#balance").html(rp+'$');$("#balance").fadeOut('slow').fadeIn("slow");$("#balance").css({background : "#208738"})
                                }})
}
     /*-SOLVER+CONVERTER-Captcha-*/

function convertImgToBase64(img, callback, outputFormat){
    var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        dataURL;
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback.call(this, dataURL);
    canvas = null;
}

 function login(){
var conect = setTimeout(function() {
var Name = ["FORM"];
var data1 = function() {

 /*-BTN-LOGIN-*/

document.getElementById('EmailId').value = MAIL;document.getElementById('Password').value = PASS;}

var j = 1;
var i;
for (i = 0; i <= 0; i++){
var button = document.createElement('input');
button.value = 'data name' +j;
button.id = 'formulaire' +j;
//button.onclick = data2;
document.getElementById('result').parentNode.insertBefore(button, document.getElementById('result').nextsibling);
document.getElementById('formulaire' +j).style="cursor: pointer; border:4px solid #C79633;float: center; font:Bold 13px Arial;background:#2750BF;color:#fff; padding: 3px; width: 55px; margin-bottom: 4px;background: 2750BF"


//button.addEventListener('click', 'data' +j);
document.getElementById('formulaire' +j).value = Name[i];
j++;
}
document.getElementById('formulaire1').onclick = data1;

    }, 100);

    var TZ_lyes = setTimeout(function() {
document.getElementById('formulaire1').click();
    }, 500);
}
setTimeout(function (){
    document.body.insertAdjacentHTML("beforeend","<div id='balance' style='position:fixed;z-index:20000;top:0%;right:0;background-color:#615959;color:#FFF;border:3px solid #171616;padding:1px;font-size:16px;font-family: Arial, Helvetica, sans-serif;text-align:center;'>balance</div>");

    /*-LANCE -DOLVER-*/

    var captcha_img = document.getElementById("CaptchaImage");

    if (captcha_img) {
        if (location.hash.indexOf('nocaptcha') == -1) {
            if (captcha_img.complete) {
                onCaptchaLoaded(captcha_img);
            } else {
                captcha_img.onload = function() {
                    onCaptchaLoaded(captcha_img);
                }
            }
        }
    }//
},5000)
}
