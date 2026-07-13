document
.getElementById("loginBtn")
.onclick=async()=>{

const username=
document.getElementById("username").value;

const password=
document.getElementById("password").value;

const result=
await api({

action:"login",

username,

password

});

if(result.success){

localStorage.setItem(

"token",

result.token

);

window.location="dashboard.html";

}

else{

document.getElementById("error").innerText=
result.message;

}

};
