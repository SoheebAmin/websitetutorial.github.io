// These are the scripts needed for the JS page.


function scramble()
{
  //grabs the input from the form, and gives error if none.
  let text_to_scramble = document.querySelector('#scramble_text').value;
  if (text_to_scramble === '')
  {
    alert('You have to type something in for me to scramble it!');
    return;
  }

  function getRandomInt(n) 
  {
    return Math.floor(Math.random() * n);
  }
  
  function shuffle(s) 
  {
    // Convert String to array
    var arr = s.split('');           
    
     // Length of the array
    var n = arr.length;             
    
    for(var i=0 ; i<n-1 ; ++i) 
    {
      // Get random of [0, n-1]
      var j = getRandomInt(n);   

      // Swap arr[i] and arr[j]
      var temp = arr[i];             
      arr[i] = arr[j];
      arr[j] = temp;
    }
    
    // Convert Array to string and return results
    s = arr.join('');               
    return s;
  }

  //calls function above to scamble text
  scrambled_text = shuffle(text_to_scramble);

  // Alert to display
  alert('Scambled Text: ' + scrambled_text);
}

// function to toggle greying out of the submit button for the scramble function.
function toggle_input()
{ 
  // disables the submit buton if text is empty upon the toggle being pressed.
  if (document.querySelector("#scramble_text").value === "" & document.querySelector('#input_checkbox').checked)
  {
    document.querySelector("#scramble_submit").disabled = true;
  }
  else
  {
    document.querySelector("#scramble_submit").disabled = false;
  }

  // disables/re-enables when toggle is on.
  document.querySelector("#scramble_text").onkeyup = function ()
  {
    if (document.querySelector("#scramble_text").value === "" & document.querySelector('#input_checkbox').checked)
    {
      document.querySelector("#scramble_submit").disabled = true;
    }
    else
    {
      document.querySelector("#scramble_submit").disabled = false;
    }
  }
}


// helper function to check if a string is a browser-supported color that CSS can recognize
function isColor(strColor){
  var s = new Option().style;
  s.color = strColor;
  return s.color == strColor;
}

// updates the font color based on user input
function color_change(id_of_input)
{
  
  // checks if color exists using the helper function
  var fetched_color = document.querySelector(id_of_input).value;
  if (isColor(fetched_color) == false)
  {
    alert(fetched_color + " is not a browser-recognized color!")
  }
  
  var style = document.createElement('style');
  
  // if input id is "bg_color", changes the color of the background
  if (id_of_input === "#bg_color")
  {
    // removes a w3 class that creates a a grey bg for a div
    document.querySelector('#has_grey_class').classList.remove("w3-light-grey");
    //adds new style based on input color
    style.innerHTML = `
    * {
    background-color: ` + fetched_color + ` !important;
    }
    `;
    document.head.appendChild(style);
  }
  
  // if input id is "font_color," changing the font color with the input. 
  else
  {
    style.innerHTML = `
    * {
    color: ` + fetched_color + ` !important;
    }
    `;
    document.head.appendChild(style);

    style = document.createElement('style');
    // Reassigns the default W3-grey font to the input color, since it is not overridden with the previous style.
    style.innerHTML = `
    .w3-text-grey {
    color: ` + fetched_color + ` !important;
    }
    `;
    document.head.appendChild(style);
  }
}


// changes font size based on user input
function font_size_change()
{
  var fetched_size = document.querySelector('#font_size').value;
  var style = document.createElement('style');
  style.innerHTML = `
  * {
  font-size: ` + fetched_size + `px !important;
  }
  `;
  document.head.appendChild(style);
}

// functions for mouse hover color causing font style change.
document.querySelector("#hover_demo").addEventListener("mouseover", mouseOver);
document.querySelector("#hover_demo").addEventListener("mouseout", mouseOut);

function mouseOver() {
  var randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
  document.querySelector("#hover_demo").style.color = randomColor;
}

function mouseOut() {
  document.querySelector("#hover_demo").style.color = "black";
}


// function for mouse click causing font size change.
document.querySelector('#click_demo').addEventListener("click", click)

var size_percent = 110
function click() {
  document.querySelector("#click_demo").style = "font-size:" + size_percent + "%";
  size_percent += 10;
}