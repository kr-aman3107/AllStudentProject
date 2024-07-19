
let count=0;
document.addEventListener('DOMContentLoaded', getUser);
userCount(count);
function handleFormSubmit(event){
    event.preventDefault();
    const name=document.querySelector('#name').value;
    const email=document.querySelector('#email').value;
    const address=document.querySelector('#address').value;

    const user={
        name,
        email,
        address
    }
    postUser(user);

    
}
function postUser(user){
    axios.post("https://crudcrud.com/api/96e6a497a924494cb0bed1554ffc0fdc/addStudent",user)
    .then((res) =>{
        showUserOnScreen(res.data);
        count++;
        userCount(count);
    })
    .catch((err) =>{
        document.innerHTML=err.message;
    })
}


function getUser(){
    axios.get("https://crudcrud.com/api/96e6a497a924494cb0bed1554ffc0fdc/addStudent")
    .then((res) =>{
        count = res.data.length;
        userCount(count);
        for(let i=0;i<res.data.length;i++) {
            showUserOnScreen(res.data[i]);
            
        }
    })
    .catch((err) =>{
        document.innerHTML=err.message;
    })
}


function showUserOnScreen(user) {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    li.id = user._id;
    li.textContent = `${user.name} - ${user.email} - ${user.address} `;

    const delBtn = document.createElement('button');
    delBtn.className="btn btn-danger"
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => deleteUser(user._id);

    const editBtn = document.createElement('button');
    editBtn.className="btn btn-secondary"
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editUser(user._id,user);

    li.appendChild(delBtn);
    li.appendChild(editBtn);
    ul.appendChild(li);
}

function deleteUser(id){
    axios.delete(`https://crudcrud.com/api/96e6a497a924494cb0bed1554ffc0fdc/addStudent/${id}`)
    .then((res) =>{
        document.getElementById(id).remove();
        count--;
        userCount(count);
    })
    .catch((err) =>{
        document.innerHTML =err.message;
    })
    
}

function editUser(id,user){
    document.querySelector("#name").value = user.name;
    document.querySelector("#email").value = user.email;
    document.querySelector("#address").value = user.address;

    deleteUser(id);
    

}

  function userCount(count){
    const countUser=document.querySelector('#subHead');
    countUser.textContent=`All Students : ${count}`;
}