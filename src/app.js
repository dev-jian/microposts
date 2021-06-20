import { easyHttp } from './easyhttp3.js';
import { ui } from './ui.js';

const URLs = {
  base: "http://localhost:3000",
  posts: "/posts"
};

// DOM Loaded Eventlistners
document.addEventListener("DOMContentLoaded", getPosts);

// Listen for add post
document.querySelector(".post-submit").addEventListener("click", submitPost);

// Listen for delete
document.querySelector("#posts").addEventListener("click", deletePost);

// Listen for edit state
document.querySelector("#posts").addEventListener("click", enableEdit);

// Listen for cancel edit state
document.querySelector(".card").addEventListener("click", cancelEdit);

// get Posts
function getPosts() {
  easyHttp.get(`${URLs.base}${URLs.posts}`)
    .then(data => {
      ui.showPosts(data);
    })
    .catch(err => {
      console.log(err);
    });
};

// delete post
function deletePost(e) {
  e.preventDefault();

  if (e.target.parentElement.classList.contains("delete")) {
    if (confirm("Are you sure to delete this post?")) {
      const id = parseInt(e.target.parentElement.dataset.id);
    
      easyHttp.delete(`${URLs.base}${URLs.posts}/${id}`)
        .then(data => {
          ui.showAlert("Post Deleted!", "alert alert-danger");
          getPosts();
        })
        .catch(err => console.log(err));
    }
  }
}

// Cancel Edit State 
function cancelEdit(e) {
  e.preventDefault();

  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState("add");
  }
}

// Enable Edit State
function enableEdit(e) {
  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;
    
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    
    const body = e.target.parentElement.previousElementSibling.textContent;
    
    const dataToSend = {
      id,
      title,
      body
    };

    ui.fillForm(dataToSend);
  }
}

// Submit Post
function submitPost(e) {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;

  // validate input
  if (title !== "" && body !== "") {
    const dataToSend = {
      title,
      body
    };

    // check state
    if (document.querySelector("#id").value === "") {
      easyHttp.post(`${URLs.base}${URLs.posts}`, dataToSend)
        .then(data => {
          ui.showAlert("Post Added!", "alert alert-info");
          ui.clearFields();
          getPosts();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      dataToSend.id = parseInt(document.querySelector("#id").value);

      easyHttp.put(`${URLs.base}${URLs.posts}/${dataToSend.id}`, dataToSend)
        .then(data => {
          ui.showAlert("Post Edited!", "alert alert-info");
          ui.changeFormState("add");
          getPosts();
        })
        .catch(err => {
          console.log(err);
        });
    }
  } else {
    ui.showAlert("Please fill form", "alert alert-warning");
  }
}