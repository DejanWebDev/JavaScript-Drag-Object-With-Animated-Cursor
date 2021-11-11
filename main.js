let mouseCursor = document.querySelector(".cursor");
const buttonClick = document.querySelector(".button");
const textInBox = document.querySelector(".h1");

let isResizing = false;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//cursor style

window.addEventListener("mousemove", cursor);


function cursor(e) //function with event access
{
    mouseCursor.style.top = e.pageY + 'px'; //getting cursor location
    mouseCursor.style.left = e.pageX + 'px';
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//moving div

buttonClick.addEventListener("mousedown", mouseDown);

function mouseDown(e)
{
    mouseCursor.style.transform = 'rotate3d(2 , 0, 0, -30deg)'; //cursor click animation
    textInBox.style.visibility = "hidden";

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);

    let prevX = e.clientX; //cursor X axis
    let prevY = e.clientY; //cursor Y axis

    function mouseMove(e) //calculating new position of the cursor
    {
        if(!isResizing)
        {
            let newX = prevX - e.clientX;
            let newY = prevY - e.clientY;

            const rectangle = buttonClick.getBoundingClientRect(); //rectangles that calculate top and left distance

            buttonClick.style.left = rectangle.left - newX + "px"; //moving the div to new position of cursor
            buttonClick.style.top = rectangle.top - newY + "px";

            prevX = e.clientX;
            prevY = e.clientY;
        }
    }

    function mouseUp()
    {
        mouseCursor.style.transform = 'none'; //cursor gets back to original state
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", mouseUp);
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//resize

const resizer = document.querySelector(".resizer");

resizer.addEventListener("mousedown", mousedown);
let currentResizer;

resizer.addEventListener("mouseover", () => {
    mouseCursor.style.visibility = "hidden";
});
resizer.addEventListener("mouseout", () => {
    mouseCursor.style.visibility = "visible";
});

function mousedown(e)
{
    //currentResizer = e.target; //target of the event, if we had more resizers
    isResizing = true;

    let prevX;
    let prevY;
    
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);
    

    function mousemove(e)
    {
        if(isResizing == true)
        {
            mouseCursor.style.visibility = "hidden";
        }

        const rect = buttonClick.getBoundingClientRect();
        
        buttonClick.style.width = (e.clientX - rect.left) + "px"; //resizing to new position of the cursor
        buttonClick.style.height = (e.clientY - rect.top) + "px";

        prevX = e.clientX;
        prevY = e.clientY;
    }

    function mouseup()
    {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
        isResizing = false;
        mouseCursor.style.visibility = "visible";
    }
}