import { easyHttp } from './easyhttp3.js';
import { ui } from './ui.js';

// DOM Loaded Eventlistners
document.addEventListener("DOMContentLoaded", getPosts);

const URLs = {
  base: "http://localhost:3000",
  getAllPosts: "/posts"
};


function getPosts() {
  easyHttp.get(`${URLs.base}${URLs.getAllPosts}`)
    .then(data => {
      ui.showPosts(data);
    })
    .catch(err => {
      console.error(err);
    })
};