window.addEventListener("load", async (event) => {
    //    const reviewButton = document.getElementById("game-info-review-button");

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
        if (editButtons) {
            editButtons.forEach(editButton => {
                editButton.addEventListener('click', async (e) => {
                    editButton.style.display = "none";
                    const id = e.target.id;
                    const realId = id.split('w');
                    const reviewDiv = document.getElementById(id);
                    const children = reviewDiv.childNodes;
                    let content;
                    if (children.length === 7) {
                        content = children[3];
                    } else {
                        content = children[1];
                    }
                    // const content = children[1];
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
                            if (children.length === 9) {
                                children[3].innerHTML = content;
                            } else {
                                children[1].innerHTML = content;
                            }
                            newReview.remove();
                            editSubmit.remove();
                            grabEditButton();
                            grabDeleteButton();
                      });
                   });
                });
                editButton.style.display = "inline-block";
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

        const newHTML = `
       <div id=review${id}>
        <p class="game-info-review-username fontClass">${username}: </p>
        <p class="game-info-review-content fontClass">${content}
        <p class="game-info-review-timestamp fontClass">${createdAt}
        <button class="game-info-review-delete" id=review${id}>Delete</button>
        <button class="game-info-review-edit" id=review${id}>Edit</button>
        <div class="game-info-review-underline"></div>
       </div>
       `;
        const reviewWrapper = document.getElementById("reviewWrapper");
        reviewWrapper.innerHTML += newHTML;
        textArea.value = "";
        grabDeleteButton();
        grabEditButton();
    });

});
