// Scripts that allow the the cycling between CSS, HTML, and JS background pages, stylesheets, and scripts.


// HTML BUTTON (although CSS is actually used. We are just simulating pre-HTML5 behavior)
var html_counter = 0;
var html_max = 5;

function changeStyleHTML()
{
  // removes any canvas animation (undo of the CSS + Javascript Button) 
  if (js_counter != 0 & document.querySelector('#allow_mixing:checked') == null)
  {
    localStorage.setItem('page_refresh','html');
    location.reload(); 
    return 0;
  }

  // removes css stylesheet, and resets the CSS count.
  if (style_counter != 0 & document.querySelector('#allow_mixing:checked') == null)
  {
    document.getElementById('stylesheet').href = "static/for_bg_page_cycles/css_bgs/stylesheet0.css";
    style_counter = 0;
  }

  // cycles through a counter to 5 for the different choices
  if (html_counter != html_max)
  {
    html_counter++;
  }
  else
  {
    html_counter = 0;
  }

  // uses the counter's value to select a text and bg color/style and applies it via JQuery
  if (html_counter == 0)
  {
    document.querySelector('body').style = "background-color: white";
    document.querySelector('#bg_text').style = "color: black";
    document.querySelector('#toggle_text').style = "color: black";
  }
  if (html_counter == 1)
  {
    document.querySelector('body').style = "background-color: silver";
    document.querySelector('#bg_text').style = "color: red";
    document.querySelector('#toggle_text').style = "color: red";
  }
  if (html_counter == 2)
  {
    document.querySelector('body').style = "background-image: url('static/media/winter.jpg')";
    document.querySelector('#bg_text').style = "color: gold";
    document.querySelector('#toggle_text').style = "color: gold";
  }
  if (html_counter == 3)
  {
    document.querySelector('body').style = "background-color: maroon";
    document.querySelector('#bg_text').style = "color: white";
    document.querySelector('#toggle_text').style = "color: white";
  }
  if (html_counter == 4)
  {
    document.querySelector('body').style = "background-image: url('static/media/stars_stock.png')";
    document.querySelector('#bg_text').style = "color: white";
    document.querySelector('#toggle_text').style = "color: white";
  }
  if (html_counter == 5)
  {
    document.querySelector('body').style = "background-image: url('static/media/abstract.jpg')";
    document.querySelector('#bg_text').style = "color: white";
    document.querySelector('#toggle_text').style = "color: white";
  }
}

// CSS BUTTON
var style_counter = 0;
var stylesheets_max = 5;

function changeStyleCSS()
{
  // removes any canvas animation (undo of the CSS + Javascript Button)
  if (js_counter != 0 & document.querySelector('#allow_mixing:checked') == null)
  {
    localStorage.setItem('page_refresh','css');
    location.reload(); 
    return 0;
  }
  if (style_counter != stylesheets_max)
  {
    style_counter++;
  }
  else
  {
    style_counter = 0;
  }

  // removes any selections made from the HTML button, and resets html counter.
  if (html_counter != 0 & document.querySelector('#allow_mixing:checked') == null)
  {
    document.getElementsByTagName("body")[0].removeAttribute("style"); 
    document.getElementById('bg_text').style.removeProperty("color");
    document.getElementById('toggle_text').style.removeProperty("color");
    html_counter = 0;
  }

  // inject html based on the stylesheet to load using JQuery
  $(function()
  {
    $("#inject_html").load("static/for_bg_page_cycles/css_bgs/html_for_" + style_counter + ".html");
  });

  // sets the new stylesheet
  document.querySelector('#stylesheet').href = "static/for_bg_page_cycles/css_bgs/stylesheet" + style_counter + ".css";
}


// CSS + JAVASCRIPT BUTTON
var js_counter = 0;
var js_max = 5;

function add_script()
{
  if (js_counter != js_max)
  {
    js_counter++;
  }
  // reloads the page after last animation, clearing JS cache.
  else
  {
    location.reload(); 
  }
  if (html_counter != 0 & document.querySelector('#allow_mixing:checked') == null)
  {
    document.getElementsByTagName("body")[0].removeAttribute("style");
    document.getElementById('bg_text').style.removeProperty("color");
    document.getElementById('toggle_text').style.removeProperty("color");
    html_counter = 0;
  }

  // sets the new stylesheet (Setting it before the JS script matters! Otherwise I've seen funky behavior!)
  document.querySelector('#stylesheet').href = "static/for_bg_page_cycles/js_bgs/stylesheet" + js_counter + ".css";

  // adds new Javascript source
  var myScript = document.createElement('script');
  myScript.setAttribute('src', 'static/for_bg_page_cycles/js_bgs/script' + js_counter + '.js');
  myScript.setAttribute('id', 'script');
  document.head.appendChild(myScript);
}


// Checks cache to see if the first HTML or first CSS button was pressed while a Javascript background was active and loads it.
// (This was tricky, since a refresh is needed to clear Javascript, so localstorage was used to prompt to load the first choice.)
if (localStorage.getItem('page_refresh') == 'css' & js_counter == 0)
{
  localStorage.clear();
  changeStyleCSS();
}

if (localStorage.getItem('page_refresh') == 'html' & js_counter == 0)
{
  localStorage.clear();
  changeStyleHTML();
}
