status = "";
objects = [];
object_name = "";

function preload()
{

}

function setup()
{
    canvas = createCanvas(480,380);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();

}

function draw()
{
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        objectDetector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "STATUS : OBJECTS DETECTED";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + " %", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == object_name)
            {
                video.stop();
                objectDetector.detect(gotResults);
                document.getElementById("object_status").innerHTML = object_name + "object found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterThis);
            }
            else
            {
                document.getElementById("object_status").innerHTML = object_name + "object not found";
            }
        }
    }
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function start()
{
    document.getElementById("status").innerHTML = "STATUS : DETECTING OBJECTS";
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    object_name = document.getElementById("area_tell").value;
}

function modelLoaded()
{
    console.log("MODEL LOADED!");
    status = true;
}