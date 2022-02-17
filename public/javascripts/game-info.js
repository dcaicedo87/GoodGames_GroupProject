window.addEventListener("load", async (event) => {

    const grabDeleteButton = async () => {
        const deleteButtons = document.querySelectorAll(".game-info-review-delete");
        if (deleteButtons) {
            deleteButtons.forEach(deleteButton => {
                deleteButton.addEventListener('click', async (e) => {
                    const id = e.target.id;
                    const realId = id.split('w');
                    try {
                        const res = await fetch(`http://localhost:8080/reviews/${realId[1]}`, {
                            method: "DELETE",
                        });
                        const response = await res.json();
                        if (response.success) {
                            const reviewDiv = document.getElementById(id);
                            reviewDiv.remove();
                        } else {
                            throw err
                        }
                    } catch (err) {
                        console.log("Failed to delete review.");
                    };
                    grabEditButton();
                    grabDeleteButton();
                });
            });
        };
    };
    const grabEditButton = async () => {
        const editButtons = document.querySelectorAll(".game-info-review-edit");
        const deleteButtons = document.querySelectorAll(".game-info-review-delete");
        if (editButtons) {
            editButtons.forEach(editButton => {
                editButton.addEventListener('click', async (e) => {
                    const editButtons = document.querySelectorAll(".game-info-review-edit");
                    editButtons.forEach(btn => {
                        btn.style.display = "none";
                    })
                    editButton.style.display = "none";
                    deleteButtons.forEach(btn => {
                        btn.style.display = "none";
                    });
                    const id = e.target.id;
                    const realId = id.split('w');
                    const reviewDiv = document.getElementById(id);
                    const children = reviewDiv.childNodes;

                    const content = children[1];
                    const newText = document.createElement('input');
                    newText.innerText = content.innerText;

                    reviewDiv.innerHTML += `
                    <div>
                        <textarea id="review-edit-value${id}">${content.innerText}</textarea>
                        <button class="review-edit-submit-button">Submit Edit</button>
                    </div>
                    `
                    const editSubmits = document.querySelectorAll('.review-edit-submit-button');
                    editSubmits.forEach(editSubmit => {
                        editSubmit.addEventListener('click', async (e) => {
                            let newReview = document.getElementById(`review-edit-value${id}`);
                            const content = newReview.value;
                            const data = { content }
                            try {
                                const res = await fetch(`http://localhost:8080/reviews/${realId[1]}`, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type" : "application/json"
                                    },
                                    body: JSON.stringify(data)
                                });
                                const response = await res.json();
                                console.log(response);
                            } catch (err) {
                                console.log("Failed to edit review.");
                            }
                            
                            children[1].innerHTML = content;
                            newReview.remove();
                            editSubmit.remove();
                            grabEditButton();
                            grabDeleteButton();
                      });
                   });
                });
                editButton.style.display = "inline-block";
                deleteButtons.forEach(deleteButton => {
                    deleteButton.style.display = "inline-block";
                })
            });
        };
    };


    grabEditButton();
    grabDeleteButton();
    const reviewButton = document.querySelector(".game-info-review-submit");
    reviewButton.addEventListener('click', async (e) => {
        const textArea = document.getElementById("game-info-review-textarea");
        const content = textArea.value;
        const gameId = e.target.id;

        const data = { content, gameId }

        const res = await fetch("http://localhost:8080/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        const newReview = await res.json();

        const review = newReview.newReview;

        const {
            id,
            username,
            createdAt,
        } = review;

        // CREATING DIV
            const div = document.createElement("div")
            div.setAttribute("id", `review${id}`);
            console.log(div);
        // CREATING FIRST P
            const p1 = document.createElement("p")
            p1.setAttribute("class", "game-info-review-content fontClass");
            p1.innerText = username;
            console.log(p1);
        // CREATING SECOND P
            const p2 = document.createElement("p")
            p2.setAttribute("class", "game-info-review-content fontClass");
            p2.innerText = content;
            console.log(p2);
        // CREATING THIRD P
            const p3 = document.createElement("p")
            p3.setAttribute("class", "game-info-review-timestamp fontClass");
            p3.innerText = createdAt;
            console.log(p3);
        // CREATING DELETE BUTTON
            const deleteBtn = document.createElement("button")
            deleteBtn.setAttribute("class", "game-info-review-delete")
            deleteBtn.setAttribute("id", `review${id}`);
            deleteBtn.innerText = "Delete";
            console.log(deleteBtn);
        // CREATING EDIT BUTTON
            const editBtn = document.createElement("button");
            editBtn.setAttribute("class", "game-info-review-edit")
            editBtn.setAttribute("id", `review${id}`);
            editBtn.innerText = "Edit";
            console.log(editBtn);
        // CREATING UNDERLINE DIV
            const underLine = document.createElement("div")
            underLine.setAttribute("class", "game-info-review-underline");
            console.log(underLine);
            // div.appendChild(p1);
            // console.log(div);
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
    });

});
