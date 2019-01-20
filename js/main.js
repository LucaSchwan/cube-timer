var timer = document.getElementById('timer');
var toggleBtn = document.getElementById('toggle');
var resetBtn = document.getElementById('reset');
var resetTimesBtn = document.getElementById('resetTimes');
var getTimesBtn = document.getElementById('getTimes');
var isDark = document.getElementById('dark');
var hasReseted = true;
var startTime;
var durationAfterSolve = 0;
var pressed = false;
var ready = false;
var time;
var times = [];
var Ao5 = [];
var Ao12 = [];
var SessAvg = [];
var watch = new Stopwatch(timer);
var updateTimes = new updateTimes();


resetBtn.addEventListener('click', function() {
    watch.reset();
    Ao5 = [];
    Ao12 = [];
    SessAvg = [];
    hasReseted = true
});

resetTimesBtn.addEventListener('click', function() {
    times = [];
    Ao5 = [];
    text = [];
    Ao5Text = [];
    updateTimes.reset();
});

getTimesBtn.addEventListener('click', function() {
    getTimes(times);
});

window.addEventListener("keydown", function (key) {
    if(key.keyCode == "32") {
        if(watch.isOn) {
            watch.stop();
            timeStopped();
            ready = false;
            durationAfterSolve = Date.now();
        }
        if(!watch.isOn  && !pressed) {
            startTime = Date.now();
            pressed = true; 
        }
        if(!watch.isOn && pressed) {
            if(Date.now() - durationAfterSolve > 10){
                document.getElementById('timer').style.color = 'red';
            }
            if(Date.now() - startTime > 500) {
                watch.reset();
                ready = true;
                document.getElementById('timer').style.color = 'green';
            }
        }
    }
}, false);

window.addEventListener("keyup", function (key) {
    if(key.keyCode == "32") {
        if(!watch.isOn && ready){
            if(isDark.checked != true) {
                document.getElementById('timer').style.color = 'black';
            } 
            else {
                document.getElementById('timer').style.color = 'white';
            }
            watch.start();
        }
        if(isDark.checked != true) {
            document.getElementById('timer').style.color = 'black';
        } 
        else {
            document.getElementById('timer').style.color = 'white';
        }
        pressed = false;
        startTime = 0;
    }
}, false);

function timeStopped() {
    time = watch.timeOut();
    times.push(time);
    if(times.length >= 5) {
        Ao5.push(averageOf5());
    }
    if(times.length >= 12) {
        Ao12.push(averageOf12());
    }
    if(times.length >= 3) {
        SessAvg.push(sessAvgCal());
    }
    updateTimes.update(times, Ao5, Ao12, SessAvg);
}

function averageOf5() {
    var a = [];
    var b = 0;
    for(var i = 0; i < 5; i++){
        a[i] = times[times.length - i - 1];
    }
    a.splice(a.indexOf(Math.min(...a)), 1);
    a.splice(a.indexOf(Math.max(...a)), 1);
    for(var i = 0; i < 3; i++){
        b += a[i];
    }
    return Math.round(b / 3);
}

function averageOf12() {
    var a = [];
    var b = 0;
    for(var i = 0; i < 12; i++){
        a[i] = times[times.length - i - 1];
    }
    a.splice(a.indexOf(Math.min(...a)), 1);
    a.splice(a.indexOf(Math.max(...a)), 1);
    for(var i = 0; i < 10; i++){
        b += a[i];
    }
    return Math.round(b / 10);
}

function sessAvgCal() {
    var a = [];
    var b = 0;
    for(var i = 0; i < times.length; i++){
        a[i] = times[times.length - i - 1];
    } 
    a.splice(a.indexOf(Math.min(...a)), 1);
    a.splice(a.indexOf(Math.max(...a)), 1);
    for(var i = 0; i < times.length - 2; i++){
        b += a[i];
    }
    return Math.round(b / (times.length - 2));
}

function dark() {
    if(isDark.checked == true){
        document.body.style.backgroundColor = '#131313';
        document.body.style.color = '#ffffff';
        timer.style.color = '#ffffff';
    }
    else {
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#000000';
        timer.style.color = '#000000';
    };
}

function getTimes(times) {
    var formattedTimes = [];

    for(var i = 0; i < times.length; i++) {
        formattedTimes.push(timeFormatter(times[i]));
    }

    var blob = new Blob([formattedTimes], {type: "text/plain/charset=utf8"});

    saveAs(blob, "times.txt");
}