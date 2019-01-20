function updateTimes() {
    var timesDisp = [];
    for(var i = 1; i <=12; i++){
        timesDisp.push(document.getElementById('time' + i));
    }
    var Ao5Disp = [];
    for(var i = 1; i <=12; i++){
        Ao5Disp.push(document.getElementById('Ao5.' + i));
    }
    var Ao12Disp = [];
    for(var i = 1; i <=12; i++){
        Ao12Disp.push(document.getElementById('Ao12.' + i));
    }
    var SessAvgDisp = [];
    for(var i = 1; i <=12; i++){
        SessAvgDisp.push(document.getElementById('SessionAvg.' + i));
    }

    this.update = function (times, Ao5, Ao12, SessAvg){
        for(var i = 0; i < 12; i++) {
            if(typeof times[i] === 'undefined'){}
            else {
                timesDisp[i].innerHTML = timeFormatter(times[i]);
            }
        }

        for(var i = 0; i < 12; i++) {
            if(typeof Ao5[i] === 'undefined'){}
            else {
                var formattedTime = new Date(Ao5[Ao5.length - i -1]); 
                Ao5Disp[i].innerHTML =  timeFormatter(times[i]);
            }
        }

        for(var i = 0; i < 12; i++) {
            if(typeof Ao12[i] === 'undefined'){}
            else {
                var formattedTime = new Date(Ao12[Ao12.length - i -1]); 
                Ao12Disp[i].innerHTML =  timeFormatter(times[i]);
            }
        }

        for(var i = 0; i < 12; i++) {
            if(typeof SessAvg[i] === 'undefined'){}
            else {
                var formattedTime = new Date(SessAvg[SessAvg.length - i -1]); 
            SessAvgDisp[i].innerHTML =  timeFormatter(times[i]);
        }
        }
    };

    this.reset = function () {
        for(var i = 0; i < timesDisp.length; i++) {
            timesDisp[i].innerHTML = '';
        }

        for(var i = 0; i < Ao5Disp.length; i++) {
            Ao5Disp[i].innerHTML = '';
        }

        for(var i = 0; i < Ao12Disp.length; i++) {
            Ao12Disp[i].innerHTML = '';
        }

        for(var i = 0; i < SessAvgDisp.length; i++) {
            SessAvgDisp[i].innerHTML = '';
        }
    };
}

function timeFormatter(timeInMilliseconds) {
    var time = new Date(timeInMilliseconds);
    var minutes = time.getMinutes().toString();
    var seconds = time.getSeconds().toString();
    var milliseconds = time.getMilliseconds().toString();

    if(minutes.length < 2) {
        minutes = '0' + minutes;
    }
    if(seconds.length < 2) {
        seconds = '0' + seconds;
    }
    if(milliseconds.length < 3) {
        milliseconds = '0' + milliseconds;
    }
    if(milliseconds.length < 3) {
        milliseconds = '0' + milliseconds;
    }

    return minutes + ':' + seconds + '.' + milliseconds;

}