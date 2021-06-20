import { easyHttp } from './easyhttp3.js';
import { ui } from './ui.js';

const URLs = {
  base: "http://121.186.41.180:3000",
  getAllPosts: "/posts",
  addPost: "/posts"
};

// DOM Loaded Eventlistners
document.addEventListener("DOMContentLoaded", getPosts);

// Listen for add post
document.querySelector(".post-submit").addEventListener("click", submitPost);

// get Posts
function getPosts() {
  easyHttp.get(`${URLs.base}${URLs.getAllPosts}`)
    .then(data => {
      ui.showPosts(data);
    })
    .catch(err => {
      console.log(err);
    })
};

// Submit Post
function submitPost(e) {
  console.log(e.type);
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;

  if (title !== "" && body !== "") {
    const dataToSend = {
      title,
      body
    };
  
    easyHttp.post(`${URLs.base}${URLs.addPost}`, dataToSend)
      .then(data => {
        ui.showAlert("Post Added!", "alert alert-info");
        ui.clearFields();
        getPosts();
      })
      .catch(err => {
        console.log(err);
      });
  }
}