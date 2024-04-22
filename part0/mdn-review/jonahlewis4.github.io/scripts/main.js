const myImage = document.querySelector("img");

//if the user clicks on the image of a tree, it will swap to a different tree piciture.
myImage.onclick = () => 
{
    const mySrc = myImage.getAttribute("src");
    const height = myImage.height;
    const width = myImage.width;

    if(mySrc === "images/tree.jpg")
    {
        myImage.setAttribute("src", "images/truffula-trees.webp");
    }
    else
    {
        myImage.setAttribute("src", "images/tree.jpg");
    }
    
    myImage.height = height;
    myImage.width = width;
}

//initilze variables used to change the title to a personalized message with user name
//also initialize the button variable to acces later.
let myButton = document.querySelector("button");
let myheading = document.querySelector("h1");

//function when called will prompt the user for a name. 
function setUserName()
{
    const myName = prompt("Please enter your name." );
    if(!myName)
    {
        setUserName();
    }
    else
    {
        localStorage.setItem("name", myName);
        myheading.textContent = `Enjoy this tree, ${myName}`;
    }
}

//if local browser storage does not contain the name variable, call the setUserName function
if(!localStorage.getItem("name"))
{
    setUserName();
}
//if it does contain the username, set the title to include that username
else
{
    const storedName = localStorage.getItem("name");
    myheading.textContent = `Enjoy this tree, ${storedName}`;
}

//if the button is clicked, allow the user to change their name.
{
    myButton.onclick = () => 
    {
        setUserName();
    }
}