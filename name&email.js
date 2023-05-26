let myForm = document.getElementById('myForm');
let ul = document.getElementById('users');

//event listener
myForm.addEventListener('submit',onSubmit);

//empty array for storing arrays
// let listUsers = [];
let ipname = document.getElementById('name');
    let ipmail = document.getElementById('email');
    
    let myObj = {
        fname: ipname.value,
        fmail: ipmail.value
    };

//action event function
function onSubmit(e){
    e.preventDefault();
    //adding data to localStroage
    
// localStorage.setItem('users', JSON.stringify(myObj));
// displayData();
myObj.fname= ipname.value;
myObj.fmail= ipmail.value
axios
.post("https://crudcrud.com/api/e6c2dbb071404d7fa7bef042f3cf712e/appointmentData", myObj)
.then(response => {
    displayData(response.data);
}).catch(err => {
    console.log(err);
})


//adding data to website
document.myForm.reset();
}



function displayData(obj){
    let li = document.createElement('li');
li.innerHTML = obj.fname + ' ' + obj.fmail;
let butt = document.createElement('input');
butt.type = 'button';
butt.value = 'delete';
butt.className = btn;
butt.id = 'delete';
let edit = document.createElement('input');
edit.type = 'button';
edit.value = 'edit';
edit.className = btn;
edit.id = 'edit';
li.appendChild(butt);
li.appendChild(edit);
ul.appendChild(li);
butt.onclick = function(){
    ul.removeChild(li);
    axios.delete(`https://crudcrud.com/api/e6c2dbb071404d7fa7bef042f3cf712e/appointmentData/${obj._id}`)
    .then(response => {
        console.log("User deleted successfully");
    }).catch( err => {
        console.log(err)    
    })
    // localStorage.removeItem('users');
};
edit.onclick = function(){
    ul.removeChild(li);
    axios.delete(`https://crudcrud.com/api/e6c2dbb071404d7fa7bef042f3cf712e/appointmentData/${obj._id}`)
    .then(response => {
        console.log("Kindly make the changes in the input feilds and submit the form");
    }).catch( err => {
        console.log(err)    
    })
    ipname.value = obj.fname;
    ipmail.value = obj.fmail;
};
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/e6c2dbb071404d7fa7bef042f3cf712e/appointmentData")
    .then(response => {
        for(var i=0; i<response.data.length; i++){
            displayData(response.data[i]);
        }
    }).catch(err => {
        console.log(err);
    })
})

