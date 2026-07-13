const API_URL =
"https://script.google.com/macros/s/AKfycbzmVlKTYZGo3WPJIfQOeW89ZaO5Ps6an7y8U5BXAtbCtltk6iqWT_-zp2szIt1L8zP3/exec";

async function api(data){

const response=await fetch(API_URL,{

method:"POST",

body:JSON.stringify(data)

});

return await response.json();

}
