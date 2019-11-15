import Vue from 'vue';

function initAuthorization() {
    authorizationConstruct(); 
}

function authorizationConstruct(){
    new Vue({
      el: '#authorizationForm',
      data: {
        arr: {
          "Client_ID": "ceaa304c-ef21-11e9-a2fa-0050569bbc88",
          "SortOrder": "from_new_to_old",
          "Page_Number": 0,
          "Number_Of_Result_Per_Page": 10
        },
      }, 
      methods: {
        sendSMSWithPass: function sendSMSWithPass() {
          var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://top.lombard1.com.ua/l1_TOP/hs/ocredit/clienthistory/getClientHistory",
            "method": "POST",
            "headers": {
  
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Allow-Credentials": true,
  
              "Content-Type": "application/json",
              "Authorization": "Basic aHR0cHNydnVzcjpMZGY7bHNMZGY0",
              "Accept": "*/*",
              "Cache-Control": "no-cache",
              "cache-control": "no-cache"
            },
            "processData": false,
            "data": "{\r\n          \"Client_ID\": \"ceaa304c-ef21-11e9-a2fa-0050569bbc88\",\r\n          \"SortOrder\": \"from_new_to_old\",\r\n          \"Page_Number\": 0,\r\n          \"Number_Of_Result_Per_Page\": 10\r\n        }"
          }
          
          $.ajax(settings).done(function (response) {
            console.log(response);
          });  
        }
      },
      components: {
        delimiters: ['${', '}'],
      }
    });
  }  
document.addEventListener('DOMContentLoaded', initAuthorization);