// ==UserScript==
// @name         01-SELFI TZ
// @namespace    http://tampermonkey.net/
// @version      2024-09-01
// @description  try to take over the world!
// @author       You
// @match        https://algeria.blsspainglobal.com/*/appointment/livenessrequest
// @match        https://www.blsspainmorocco.net/*/*/livenessrequest
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    var io;
    if (document.body.innerText.includes("Forbidden") || document.body.innerText.includes("403 Forbidden") || document.body.innerText.includes("429 Too Many Requests")) {
    document.body.innerHTML = '';
    const jqueryScript = document.createElement('script');
    jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    document.head.append(jqueryScript);
    ///////////////////////////////////////a//////////////////////////////////////////////////////////////////
    var container = document.createElement('div');
    container.style.cssText = 'display: flex; height: 100%; flex-direction: column; justify-content: center; align-items: center';
    document.body.appendChild(container);
        var AA = document.createElement('h1');
    AA.textContent = 'OZ-SELFY V0.1';
    container.appendChild(AA);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    var select = document.createElement('select');
    select.id = 'stselect';
    select.style.cssText = 'width: 300px; border-radius: 5px; padding: 10px;';
    const option = document.createElement('option');
        option.text = 'CHOSE ONE';
        option.value = '0';
        select.add(option);
    select.addEventListener("change", () => {inputField.value = select.value})
     container.appendChild(select);
        var displayButton1 = document.createElement('button');
    displayButton1.textContent = 'Get-Client';
    displayButton1.className = 'btn btn-primary mb-3';
    displayButton1.style.cssText = `display:inline; margin-top: 10px;display: inline-block;padding: 10px 20px;font-size: 16px;text-align: center;text-decoration: none;color: #ffff; background-color: #122e54; border: 2px solid #000000;  border-radius: 5px;transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;`;
    displayButton1.addEventListener('click', function() {
    document.getElementById("stselect").innerHTML = "";
        const option = document.createElement('option');
        option.text = 'CHOSE ONE';
        option.value = '0';
        select.add(option);
        GETMAILDATA()
    })
        container.appendChild(displayButton1);
     /////////////////////////////////////////////////////////////////////////////////////////////////////////
    var inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.id = 'userInput';
    inputField.style.cssText = 'margin-top: 20px;width: 300px; border-radius: 5px; padding: 10px;';
    inputField.className = 'form-control';
    inputField.placeholder = 'Enter something...';
    inputField.style.width = '300px';
    container.appendChild(inputField);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    var displayButton = document.createElement('button');
    displayButton.textContent = 'Start Selfie';
    displayButton.className = 'btn btn-primary mb-3';
    displayButton.style.cssText = `margin-top: 10px;display: inline-block;padding: 10px 20px;font-size: 16px;text-align: center;text-decoration: none;color: #ffff; background-color: #06400c; border: 2px solid #000000;  border-radius: 5px;transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;`;
    container.appendChild(displayButton);
    var displayText = document.createElement('h2');
    displayText.id = 'displayText';
    displayText.className = 'text-center';
    container.appendChild(displayText);
    var bootstrapJS = document.createElement('script');
    bootstrapJS.src = 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js';
    document.head.appendChild(bootstrapJS);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    displayButton.addEventListener('click', function() {
   const l = document.getElementById('userInput').value;
   if (!l) { return;}
   const [E, b,c] = l.split(',', 3);
   function ru(){
   var script = document.createElement('script');
   script.src = 'https://web-sdk.spain.prod.ozforensics.com/blsinternational/plugin_liveness.php';
   script.onload = async function() {openLivenessCheck(E, b, c)};
   document.head.appendChild(script);
   }
   if(io !== 1) {ru()}else{openLivenessCheck(E, b, c)};
   /////////////////////////////////////////////////////////////////////////////////////////////////////////
         function openLivenessCheck(userId, transactionId) {
             const metadata = {user_id: userId,transaction_id: transactionId, };
             OzLiveness.open({
                 lang: 'en',meta: metadata,
                 overlay_options: false,
                 action: ['video_selfie_blank'],
                 on_complete: function (response) {
                 console.log(response);
                 if (response.analyses.quality.resolution === 'declined') {
                 alert('ECHEK SELFI 3AWED!!!');
                 openLivenessCheck(userId, transactionId);
                 return;
                 }
                 else {
                 setif(c,response.event_session_id)
                  }
                                 }
             })
         io = 1
         }
    })

    async function setif(ml,sdf){
         const response = await fetch('https://tizivisa15.com/bls_on_off/TZSELFI.php?action=LIVID&Email='+ ml +'&LivnesID=' + sdf)
         if (response.ok) {
         const jsonData = await response.json();
         if(jsonData.status == 'ok'){
         document.getElementById('displayText').textContent = ml+": " + sdf
         }
         }else {
          console.log('Network response was not ok.');
        }

    }
       async function GETMAILDATA() {
        const response = await fetch("https://tizivisa15.com/bls_on_off/TZSELFI.php?action=GETMAILDATA")
        if (response.ok) {
        const jsonData = await response.json();
         jsonData.data.forEach(item => {
        const option = document.createElement('option');
        option.text = item.ST;
        option.value = `${item.USER_ID},${item.Transaction_ID},${item.ST}`;
        select.add(option);
        });
        }else {
          console.log('Network response was not ok.');
        }
};GETMAILDATA()
        }
})()
