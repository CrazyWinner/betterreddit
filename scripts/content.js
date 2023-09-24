
console.log("BetterReddit init")

const oldPosts = new Map();

let timeoutId = undefined

let uniqueId = 0;

function isVisible (el) {
    var rect = el.getBoundingClientRect();

    return (
        rect.top >= -rect.height - 500 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + rect.height + 500
    );
}

let optimise = function(){
    let posts = document.getElementsByTagName("shreddit-post")
    
    for(let i = 0; i < posts.length; ++i){
        let post = posts[i]
        if(!isVisible(post)){
            let width = post.getBoundingClientRect().width
            let height = post.getBoundingClientRect().height
            let oldId = post.getAttribute("betterreddit-unique-id");
            let id = (oldId == null) ? uniqueId.toString() : oldId;
            uniqueId++;
            post.setAttribute("betterreddit-unique-id", id);
            let newElem = `<div name=\"betterreddit-blank\" betterreddit-unique-id=\"${id}\"style=\"height:${height}px\"> </div>`
            oldPosts.set(id,post.outerHTML);
           post.outerHTML = newElem
        }
        
    }
    
    let blanks = document.getElementsByName("betterreddit-blank")
    
    for(let i = 0; i < blanks.length; ++i){
        let blank = blanks[i];
        if(isVisible(blank)){
            let id = blank.getAttribute("betterreddit-unique-id");
           blank.outerHTML = oldPosts.get(id);
        }
        
    }
    
    timeoutId = undefined
    
}

window.onscroll = function(){
    if(timeoutId != undefined)
        clearTimeout(timeoutId)
    
    timeoutId = setTimeout(optimise, 20)
    
    
}





