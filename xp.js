let user = null;
let token = null;

if(user == null && token == null){
    console.log("Not login");
}
else if(user && token === ''){
    console.log("user exist & token none");
}
else{
    console.log("Not login else");
}