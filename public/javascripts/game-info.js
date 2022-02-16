window.addEventListener("load", async (event)=>{
//    const reviewButton = document.getElementById("game-info-review-button");
   const reviewButton = document.querySelector(".game-info-review-submit")
   reviewButton.addEventListener('click', async e => {
       const textArea = document.getElementById("game-info-review-textarea");
       const content = textArea.value;
       const gameId = e.path[0].id;
       const data = { content, gameId }

       const res = await fetch("http://localhost:8080/reviews", {
           method: "POST",
           headers: {
               "Content-Type" : "application/json"
           },
           body: JSON.stringify(data)
       });
    //    const newData = await res.json();
    //    console.log(newData);
   });
});
