//for canvas drawing used code from here: https://github.com/zealerww/digits_recognition/blob/master/digits_recognition/static/draw.js
var drawing = false;
var context;
var offset_left = 0;
var offset_top = 0;

function start_canvas () {
    var canvas = document.getElementById ("the_stage");
    context = canvas.getContext ("2d");
    canvas.onmousedown = function (event) {mousedown(event)};
    canvas.onmousemove = function (event) {mousemove(event)};
    canvas.onmouseup   = function (event) {mouseup(event)};
    for (var o = canvas; o ; o = o.offsetParent) {
    offset_left += (o.offsetLeft - o.scrollLeft);
    offset_top  += (o.offsetTop - o.scrollTop);
    }
    draw();
}

function getPosition(evt) {
    evt = (evt) ?  evt : ((event) ? event : null);
    var left = 0;
    var top = 0;
    var canvas = document.getElementById("the_stage");

    if (evt.pageX) {
    left = evt.pageX;
    top  = evt.pageY;
    } else if (document.documentElement.scrollLeft) {
    left = evt.clientX + document.documentElement.scrollLeft;
    top  = evt.clientY + document.documentElement.scrollTop;
    } else  {
    left = evt.clientX + document.body.scrollLeft;
    top  = evt.clientY + document.body.scrollTop;
    }
    left -= offset_left;
    top -= offset_top;

    return {x : left, y : top}; 
}

function
mousedown(event) {
    drawing = true;
    var location = getPosition(event);
    context.lineWidth = 8.0;
    context.strokeStyle="#000000";
    context.beginPath();
    context.moveTo(location.x,location.y);
}

function
mousemove(event) {
    if (!drawing) 
        return;
    var location = getPosition(event);
    context.lineTo(location.x,location.y);
    context.stroke();
}



function
mouseup(event) {
    if (!drawing) 
        return;
    mousemove(event);
	context.closePath();
    drawing = false;
}

function draw() {
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, 200, 200);
}

function clearCanvas() {
    context.clearRect (0, 0, 200, 200);
    draw();
    document.getElementById("rec_result").innerHTML = "";
}

function saveImg()
{
	document.getElementById("rec_result").innerHTML = "connecting...";
	var canvas = document.getElementById("the_stage");
	var dataURL = canvas.toDataURL('image/jpg');
	var dig = document.querySelector('input[name="action"]:checked').value;
	$.ajax({
	  type: "POST",
	  url: "/hook",
	  data:{
		imageBase64: dataURL,
		digit: dig
		}
	}).done(function(response) {
	  console.log(response)
	  document.getElementById("rec_result").innerHTML = response
	});
	
}


onload = start_canvas;