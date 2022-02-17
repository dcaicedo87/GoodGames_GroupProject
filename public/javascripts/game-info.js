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
                });
            });
        };
    };

    const grabEditButton = async () => {
        const editButtons = document.querySelectorAll(".game-info-review-edit");
        if (editButtons) {
            editButtons.forEach(editButton => {
                editButton.addEventListener('click', async (e) => {
                    const id = e.target.id;
                    const realId = id.split('w');
                });
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
        <p class="game-info-review-content fontClass">${content} </p>
        <p class="game-info-review-timestamp fontClass">${createdAt} </p>
        <button class="game-info-review-delete" id=review${id}>Delete</button>
        <button class="game-info-review-edit">Edit</button>
        <div class="game-info-review-underline"></div>
       </div>
       `;
        const reviewWrapper = document.getElementById("reviewWrapper");
        reviewWrapper.innerHTML += newHTML;
        // ADD another query selector
        textArea.value = "";
        grabDeleteButton();
    });

    const editButtons = document.querySelectorAll(".game-info-review-edit");
    if (editButtons) {
        editButtons.forEach(editButton => {
            editButton.addEventListener('click', e => {
                // TODO Add fetch to edit from database and display on page
                const id = e.target.id;

            });
        });
    }
});
