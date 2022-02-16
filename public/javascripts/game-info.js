window.addEventListener("load", (event)=>{
   const commentButton = document.getElementById("commentButton");
   commentButton.addEventListener('click', e => {
     e.preventDefault();
     const form = document.createElement('form')
     form.innerHTML = `
     <input type="text" name="content"></input>
     `;
     const reviewWrapper = document.getElementById('reviewWrapper');
     console.log(reviewWrapper);
     reviewWrapper.innerHTML += form; 
   });
})
