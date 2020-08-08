// The functions for the font selection portion of the page became quite legnthy, so they've been factored out into their own page.


// List of all CSS supported fonts. The list needs to be cut down to the ones that can actually show for the user, using the below code.
var possible_supported_fonts = ['Abadi MT Condensed Light', 'Aharoni', 'Aharoni Bold', 'Aldhabi', 'AlternateGothic2 BT', 'Andale Mono', 'Andalus', 'Angsana New', 'AngsanaUPC', 'Aparajita', 'Apple Chancery', 'Arabic Typesetting', 'Arial', 'Arial Black', 'Arial narrow', 'Arial Nova', 'Arial Rounded MT Bold', 'Arnoldboecklin', 'Avanta Garde', 'Bahnschrift', 'Bahnschrift Light', 'Bahnschrift SemiBold', 'Bahnschrift SemiLight', 'Baskerville', 'Batang', 'BatangChe', 'Big Caslon', 'BIZ UDGothic', 'BIZ UDMincho Medium', 'Blippo', 'Bodoni MT', 'Book Antiqua', 'Bookman', 'Bradley Hand', 'Browallia New', 'BrowalliaUPC', 'Brush Script MT', 'Brush Script Std', 'Brushstroke', 'Calibri', 'Calibri Light', 'Calisto MT', 'Cambodian', 'Cambria', 'Cambria Math', 'Candara', 'Century Gothic', 'Chalkduster', 'Cherokee', 'Comic Sans', 'Comic Sans MS', 'Consolas', 'Constantia', 'Copperplate', 'Copperplate Gothic Light', 'Copperplate Gothic Bold', 'Corbel', 'Cordia New', 'CordiaUPC', 'Coronet script', 'Courier', 'Courier New', 'DaunPenh', 'David', 'DengXian', 'DFKai-SB', 'Didot', 'DilleniaUPC', 'DokChampa', 'Dotum', 'DotumChe', 'Ebrima', 'Estrangelo Edessa', 'EucrosiaUPC', 'Euphemia', 'FangSong', 'Florence', 'Franklin Gothic Medium', 'FrankRuehl', 'FressiaUPC', 'Futara', 'Gabriola', 'Garamond', 'Gautami', 'Geneva', 'Georgia', 'Georgia Pro', 'Gill Sans', 'Gill Sans Nova', 'Gisha', 'Goudy Old Style', 'Gulim', 'GulimChe', 'Gungsuh', 'GungsuhChe', 'Hebrew', 'Helvetica', 'Hoefler Text', 'HoloLens MDL2 Assets', 'Impact', 'Ink Free', 'IrisUPC', 'Iskoola Pota', 'Japanese', 'JasmineUPC', 'Javanese Text', 'Jazz LET', 'KaiTi', 'Kalinga', 'Kartika', 'Khmer UI', 'KodchiangUPC', 'Kokila', 'Korean', 'Lao', 'Lao UI', 'Latha', 'Leelawadee', 'Leelawadee UI', 'Leelawadee UI Semilight', 'Levenim MT', 'LilyUPC', 'Lucida Bright', 'Lucida Console', 'Lucida Handwriting', 'Lucida Sans', 'Lucida Sans Typewriter', 'Lucida Sans Unicode', 'Lucidatypewriter', 'soft YaHei UI', 'Microsoft Yi Baiti', 'MingLiU', 'MingLiU_HKSCS', 'MingLiU_HKSCS-ExtB', 'MingLiU-ExtB', 'Miriam', 'Monaco', 'Mongolian Baiti', 'MoolBoran', 'MS Gothic', 'MS Mincho', 'MS PGothic', 'MS PMincho', 'MS UI Gothic', 'MV Boli', 'Myanmar Text', 'Narkisim', 'Neue Haas Grotesk Text Pro', 'New Century Schoolbook', 'News Gothic MT', 'Nirmala UI', 'Noto', 'NSimSun', 'Nyala', 'Oldtown', 'Optima', 'Palatino', 'Palatino Linotype', 'papyrus', 'Parkavenue', 'Perpetua', 'Plantagenet Cherokee', 'PMingLiU', 'Raavi', 'Rockwell', 'Rockwell Extra Bold', 'Rockwell Nova', 'Rockwell Nova Cond', 'Rockwell Nova Extra Bold', 'Rod', 'Sakkal Majalla', 'Sanskrit Text', 'segoeMDL2Assets', 'Segoe Print', 'Segoe Script', 'Segoe UI', 'Segoe UI Emoji', 'Segoe UI Historic', 'Segoe UI Symbol', 'Shonar Bangla', 'Shruti', 'SimHei', 'SimKai', 'Simplified Arabic', 'Simplified Chinese', 'SimSun', 'SimSun-ExtB', 'Sitka', 'Snell Roundhan', 'Stencil Std', 'Sylfaen', 'Symbol', 'Tahoma', 'Thai', 'Times New Roman', 'Traditional Arabic', 'Traditional Chinese', 'Trattatello', 'Trebuchet MS', 'UD Digi Kyokasho', 'UD Digi Kyokasho NK-R', 'UD Digi Kyokasho NP-R', 'UD Digi Kyokasho N-R', 'Urdu Typesetting', 'URW Chancery', 'Utsaah', 'Vani', 'Verdana', 'Verdana Pro', 'Vijaya', 'Vrinda', 'Webdings', 'Westminster', 'Wingdings', 'Yu Gothic', 'Yu Gothic UI', 'Yu Mincho', 'Zapf Chancery']


// Helper function to see if font is valid for the user. There is no simple way to do this except to literally test each font for the user.
// Usage: d = new Detector();
// d.detect('font name');
//Source: https://gist.github.com/szepeviktor/d28dfcfc889fe61763f3

var Detector = function() {
    // a font will be compared against all the three default fonts.
    // and if it doesn't match all 3 then that font is not available.
    var baseFonts = ['monospace', 'sans-serif', 'serif'];
 
    //we use m or w because these two characters take up the maximum width.
    // And we use a LLi so that the same matching fonts can get separated
    var testString = "mmmmmmmmmmlli";
 
    //we test using 72px font size, we may use any size. I guess larger the better.
    var testSize = '72px';
 
    var h = document.getElementsByTagName("body")[0];
 
    // create a SPAN in the document to get the width of the text we use to test
    var s = document.createElement("span");
    s.style.fontSize = testSize;
    s.innerHTML = testString;
    var defaultWidth = {};
    var defaultHeight = {};
    for (var index in baseFonts) {
        //get the default width for the three base fonts
        s.style.fontFamily = baseFonts[index];
        h.appendChild(s);
        defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font
        defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
        h.removeChild(s);
    }
 
    function detect(font) {
        var detected = false;
        for (var index in baseFonts) {
            s.style.fontFamily = font + ',' + baseFonts[index]; // name of the font along with the base font for fallback.
            h.appendChild(s);
            var matched = (s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]]);
            h.removeChild(s);
            detected = detected || matched;
        }
        return detected;
    }
    this.detect = detect;
 };


// function to change font style based on user input
function font_style_change()
{
  // checks if selection is valid by running font detection code on input.
  var fetched_font = document.querySelector('#font_style').value;
  d = new Detector();
  if (d.detect(fetched_font) == false)
  {
    alert(fetched_font + " is not a valid font. You didn't select from the list!")
    return 1;
  }
  // remove previous font if one was already set.
  if (document.querySelector("#appended_style") != null)
  {
    var elem = document.getElementById("appended_style");
    elem.parentNode.removeChild(elem);
  }
  // Injects the fetched font onto the relevant font styles on the page.
  else
  {
  var style = document.createElement('style');
  style.setAttribute('id', 'appended_style');
  style.innerHTML = `
  body,h1,h2,h3,h4,h5,h6,.w3-bar,h1,button {
  font-family: ` + fetched_font + `;
  }
  `;
  document.head.appendChild(style);
  }
}

// The code for the autocomplete box, taken mostly from W3 schools

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");


          // My addition: This changes every matching item to the font it represents.
          b.style = "font-family: " + arr[i];


          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

// My addition: iterate over possible_supported_fonts and apply font checker function and create new list for supported fonts.
var compatible_fonts = []
d = new Detector();
for (i = 0; i < possible_supported_fonts.length; i++)
{
  if (d.detect(possible_supported_fonts[i]) == true)
  {
    compatible_fonts.push(possible_supported_fonts[i]);
  }
}

/* initiate the autocomplete function, and pass along the supported fonts array as possible autocomplete values:*/
autocomplete(document.querySelector("#font_style"), compatible_fonts);


// function to auto-update the font of the text in the third grid of the page.
function font_update() {
  var random_font = compatible_fonts[Math.floor(Math.random() * compatible_fonts.length)];
  document.querySelector("#update_demo").style = "font-family: " + random_font;
}

window.setInterval(font_update, 3000);