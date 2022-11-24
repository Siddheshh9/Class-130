rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
song_status = "";
song2_status = "";
scoreleftWrist = 0;
scorerightWrist = 0;
song = "";
song2 = "";

function preload() {
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(425, 425);
    canvas.position(490, 200);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("POSENET IS INITIALIZED");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scorerightWrist = results[0].pose.keypoints[10].score;
        scoreleftWrist = results[0].pose.keypoints[9].score;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWrist Y = " + rightWristY + "RightWrist X = " + rightWristX);
        leftWristY = results[0].pose.leftWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
        console.log("LeftWrist Y= " + leftWristY + "LeftWrist X = " + leftWristX);
    }

}

function draw() {
    image(video, 0, 0, 425, 425);
    song_status = song.isPlaying();
    song2_status = song.isPlaying();
    fill('red');
    stroke('red');

    if (scoreleftWrist > 0.2) {
        circle(leftWristX, lefttWristY, 20);
        song.stop();
        if (song2_status == false) {
            song2.play();
            document.getElementById("Song").innerHTML = "Song Name : " + "Guitar";
        }
    }
    if  (scorerightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if (song_status == false) {
            song.play();
            document.getElementById("Song").innerHTML = "Song Name : " + "Harry Potter";
        }
    }

}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
