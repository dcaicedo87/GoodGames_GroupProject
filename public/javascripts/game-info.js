window.addEventListener("load", async (event) => {
    //    const reviewButton = document.getElementById("game-info-review-button");

    const grabDeleteButton = () => {
        const deleteButtons = document.querySelectorAll(".game-info-review-delete");
        if (deleteButtons) {
            deleteButtons.forEach(deleteButton => {
                deleteButton.addEventListener('click', async (e) => {
                    // TODO Add fetch to delete from database and display on page
                    const id = e.target.id;
                    console.log(id);
                    try {
                        // const res = await
                        const reviewDiv = document.getElementById(id);
                        reviewDiv.remove();
                    } catch {

                    }
                });
            })
        }
    };
    grabDeleteButton();
    const reviewButton = document.querySelector(".game-info-review-submit");
    reviewButton.addEventListener('click', async (e) => {
        const textArea = document.getElementById("game-info-review-textarea");
        const content = textArea.value;
        const gameId = e.target.id

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
        } = review

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

    //    const deleteButtons = document.querySelectorAll(".game-info-review-delete");
    //    if (deleteButtons) {
    //        deleteButtons.forEach(deleteButton => {
    //            deleteButton.addEventListener('click', async (e) => {
    //                // TODO Add fetch to delete from database and display on page
    //                 const id = e.target.id;
    //                 const reviewDiv = document.getElementById(id);
    //                 console.log(reviewDiv);
    //                 reviewDiv.remove();
    //            });
    //        })
    //    }

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
