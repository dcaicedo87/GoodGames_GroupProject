window.addEventListener("load", async (event) => {
  const grabDeleteButton = async () => {
    const deleteButtons = document.querySelectorAll(".game-info-review-delete");
    if (deleteButtons) {
      deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener("click", async (e) => {
          const id = e.target.id;
          const realId = id.split("w");
          try {
            const res = await fetch(`/reviews/${realId[1]}`, {
              mode: "cors",
              method: "DELETE",
            });
            const response = await res.json();
            if (response.success) {
              const reviewDiv = document.getElementById(id);
              reviewDiv.remove();
            } else {
              throw err;
            }
          } catch (err) {
            console.log("Failed to delete review.");
          }
          grabEditButton();
          grabDeleteButton();
        });
      });
    }
  };

  const grabEditButton = () => {
    editButtons = document.querySelectorAll(".game-info-review-edit");
    if (editButtons) {
      editButtons.forEach((editButton) => {
        editButton.addEventListener("click", async (e) => {
          // Make edit buttons disappear upon clicking edit
          const editButtons = document.querySelectorAll(
            ".game-info-review-edit"
          );
          const deleteButtons = document.querySelectorAll(
            ".game-info-review-delete"
          );
          editButtons.forEach((btn) => {
            btn.style.display = "none";
          });
          // Make delete buttons disappear upon clicking edit
          deleteButtons.forEach((btn) => {
            btn.style.display = "none";
          });

          const id = e.target.id;
          const realId = id.split("w");
          const reviewDiv = document.getElementById(id);
          const children = reviewDiv.childNodes;
          const content = children[1];
          console.log(children);
          // CREATING EDIT DIV
          const editDiv = document.createElement("div");
          editDiv.setAttribute("class", "editDiv");
          // CREATING INPUT AREA
          const newText = document.createElement("textarea");
          newText.setAttribute("id", `review-edit-value${id}`);
          newText.innerText = content.innerText;
          // CREATING EDIT SUBMIT BUTTON
          const edtBtn = document.createElement("button");
          edtBtn.setAttribute("class", "review-edit-submit-button");
          edtBtn.innerText = "Submit Edit";
          // APPENDING CHILDREN TO DIV
          editDiv.appendChild(newText);
          editDiv.appendChild(edtBtn);
          console.log(editDiv);
          if (children.length === 6) {
            reviewDiv.appendChild(editDiv);
          }

          const editSubmits = document.querySelector(
            ".review-edit-submit-button"
          );
          editSubmits.addEventListener("click", async (e) => {
            let newReview = document.getElementById(`review-edit-value${id}`);
            const content = newReview.value;
            const data = { content };
            try {
              const res = await fetch(`/reviews/${realId[1]}`, {
                method: "PUT",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });
              const response = await res.json();
              console.log(response);
            } catch (err) {
              console.log("Failed to edit review.");
            }
            children[1].innerHTML = content;
            editDiv.remove();
            // grabEditButton();

            // Make edit buttons disappear upon clicking edit
            const editButtons = document.querySelectorAll(
              ".game-info-review-edit"
            );
            editButtons.forEach((btn) => {
              btn.style.display = "inline-block";
            });
            // Make delete buttons disappear upon clicking edit
            deleteButtons.forEach((btn) => {
              btn.style.display = "inline-block";
            });
          });
        });
      });
    }
  };

  grabEditButton();
  grabDeleteButton();
  const reviewButton = document.querySelector(".game-info-review-submit");
  reviewButton.addEventListener("click", async (e) => {
    const textArea = document.getElementById("game-info-review-textarea");
    const content = textArea.value;
    const gameId = e.target.id;

    const data = { content, gameId };
    try {
      const res = await fetch("/reviews", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const newReview = await res.json();
      const review = newReview.newReview;
      const { id, username, createdAt } = review;
      // CREATING DIV
      const div = document.createElement("div");
      div.setAttribute("id", `review${id}`);
      // CREATING FIRST P
      const p1 = document.createElement("p");
      p1.setAttribute("class", "game-info-review-content fontClass");
      p1.innerText = username;
      // CREATING SECOND P
      const p2 = document.createElement("p");
      p2.setAttribute("class", "game-info-review-content fontClass");
      p2.innerText = content;
      // CREATING THIRD P
      const p3 = document.createElement("p");
      p3.setAttribute("class", "game-info-review-timestamp fontClass");
      p3.innerText = createdAt;
      // CREATING DELETE BUTTON
      const deleteBtn = document.createElement("button");
      deleteBtn.setAttribute("class", "game-info-review-delete");
      deleteBtn.setAttribute("id", `review${id}`);
      deleteBtn.innerText = "Delete";
      // CREATING EDIT BUTTON
      const editBtn = document.createElement("button");
      editBtn.setAttribute("class", "game-info-review-edit");
      editBtn.setAttribute("id", `review${id}`);
      editBtn.innerText = "Edit";
      // CREATING UNDERLINE DIV
      const underLine = document.createElement("div");
      underLine.setAttribute("class", "game-info-review-underline");
      // APPENDING ALL ELEMENTS TO DIV CONTAINER
      div.appendChild(p1);
      div.appendChild(p2);
      div.appendChild(p3);
      div.appendChild(deleteBtn);
      div.appendChild(editBtn);
      div.appendChild(underLine);

      const reviewWrapper = document.getElementById("reviewWrapper");
      reviewWrapper.appendChild(div);
      textArea.value = "";
      grabDeleteButton();
      grabEditButton();
    } catch (err) {
      console.log("failed to fetch");
    }
  });
});
