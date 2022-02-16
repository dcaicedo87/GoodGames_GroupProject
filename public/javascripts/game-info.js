window.addEventListener("load", async (event)=>{
//    const reviewButton = document.getElementById("game-info-review-button");
   const reviewButton = document.querySelector(".game-info-review-submit")
   reviewButton.addEventListener('click', async (e) => {
       const textArea = document.getElementById("game-info-review-textarea");
       const content = textArea.value;
       const gameId = e.target.id

       const data = { content, gameId }

       const res = await fetch("http://localhost:8080/reviews", {
           method: "POST",
           headers: {
               "Content-Type" : "application/json",
           },
           body: JSON.stringify(data)
       });

       const newReview = await res.json();

       const review = newReview.newReview;

       const {
        username,
        createdAt,
       } = review

       console.log(content, username, createdAt);
    //    console.log(createdAt);
    //    const newHTML = `
    //    <p class="game-info-review-username fontClass">${username}: </p>
    //    <p class="game-info-review-content fontClass">${content} </p>
    //    <p class="game-info-review-timestamp fontClass"> #
    //     .game-info-review-underline
    //    `;

   });
});
