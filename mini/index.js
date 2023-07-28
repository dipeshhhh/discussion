let commentContainer = document.getElementById("comment-container");


createInputBox = ()=>{

    let div = document.createElement("div");
    div.setAttribute("class", "comment-details");

    div.innerHTML += `
    <input type="text" placeholder="add text here" class="input" />
    <button class="btn submit">Submit</button>`;
  return div;
   
}

addReply = (text) =>{

    let div = document.createElement("div");
    div.setAttribute("class", "all-comment");
  
    div.innerHTML += `
      <div class="card">
        <span class="text">${text}</span>
        <span id="reply" class="reply">
          Add Reply
        </span>
      </div>`;
  
    return div;
}

commentContainer.addEventListener('click', (e)=>{
    let replyClicked = e.target.classList.contains("reply");
    let submitClicked = e.target.classList.contains("submit");
    let closestCard = e.target.closest(".all-comment");

    if (replyClicked) {
        closestCard.appendChild(createInputBox());
      }

    if(submitClicked)
    {
        const comment = e.target.closest('.comment-details');

        if(comment.children[0].value)
        {
                closestCard.appendChild(addReply(comment.children[0].value))
                comment.remove()
            
        }

        
    }  
    


})