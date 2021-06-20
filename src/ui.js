class UI {
  constructor () {
    this.postsContainer = document.querySelector(".postsContainer");
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.forState = "add";
  }

  showPosts(posts) {
    let output = "";

    posts.forEach(post => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fas fa-pencil-alt"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fas fa-trash-alt"></i>
            </a>
          </div>
        </div>
      `;
    });

    this.post.innerHTML = output;
  }

  clearAlert() {
    const currentAlert = document.querySelector("div.alert");

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  showAlert(msg, className) {
    this.clearAlert();

    const div = document.createElement("div");
    div.className = className;
    div.appendChild(document.createTextNode(msg));
    document.querySelector(".container").insertBefore(div, this.postsContainer);

    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearFields() {
    this.idInput.value = "";
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }

  fillForm(dataToSend) {
    document.querySelector("#id").value = dataToSend.id;
    document.querySelector("#title").value = dataToSend.title;
    document.querySelector("#body").value = dataToSend.body;

    this.changeFormState("edit");
  }

  changeFormState(type) {
    if (this.forState === "add" && type === "edit") {
      this.postSubmit.textContent = "Update Post";
      this.postSubmit.className = "post-submit btn btn-warning mb-2";

      const button = document.createElement("button");
      button.setAttribute("type", "button");
      button.className = "post-cancel btn btn-secondary";
      button.textContent = "Cancel Edit";

      document.querySelector(".card").insertBefore(button, document.querySelector(".form-end"));
      this.forState = "edit";
    } else if (this.forState === "edit" && type === "add"){
      this.clearFields();

      this.postSubmit.textContent = "Post It";
      this.postSubmit.className = "post-submit btn btn-success mb-2";

      const postCancelBtn = document.querySelector(".post-cancel");

      if (postCancelBtn) {
        postCancelBtn.remove();
      }

      this.forState = "add";
    }
  }
}

export const ui = new UI();