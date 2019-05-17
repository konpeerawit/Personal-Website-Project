var adjust=0
var zone="Thailand"
myOffset=210   //setting this to your offset will start with your current time
var PST=480
var EST=300
var TK=-540
var HW=600
var LD=0
var MX=360
var HK=-480
var FJ=-720
var ND=-330


function checkPST(){
    clearTimeout(checkDateTime)
    myOffset=eval(PST+adjust)
    zone="Pacific"
    checkDateTime()
}

function checkEST(){
    clearTimeout(checkDateTime)
    myOffset=EST+adjust
    zone="Eastern"
    checkDateTime()
}

function checkTK(){
    clearTimeout(checkDateTime)
    myOffset=TK+adjust
    zone="Tokyo"
    checkDateTime()
}

function checkHW(){
    clearTimeout(checkDateTime)
    myOffset=HW+adjust
    zone="Hawaii"
    checkDateTime()
}

function checkLD(){
    clearTimeout(checkDateTime)
    myOffset=LD+adjust
    zone="London"
    checkDateTime()
}

function checkHK(){
    clearTimeout(checkDateTime)
    myOffset=HK+adjust
    zone="Hong Kong"
    checkDateTime()
}

function checkFJ(){
    clearTimeout(checkDateTime)
    myOffset=FJ+adjust
    zone="Aukland"
    checkDateTime()
}

function checkMX(){
    clearTimeout(checkDateTime)
    myOffset=MX+adjust
    zone="Mexico City"
    checkDateTime()
}

function checkND(){
    clearTimeout(checkDateTime)
    myOffset=ND+adjust
    zone="New Deli"
    checkDateTime()
}




function checkDateTime () {
adjust=0

var today = new Date();
var year = today.getYear() + 1900;
var month = today.getMonth()+1;
var date = today.getDate();
var day = today.getDay();
var hour = today.getHours();
var minute = today.getMinutes();
var second = today.getSeconds();

//this next tidbit gets the last saturday in the month, for daylight savings times purposes
var lastSat
lastSat=date-(day+1)
while (lastSat<32){
	lastSat+=7
}
if (lastSat>31) lastSat+=-7

var firstSat
firstSat=date-(day+1)
while (firstSat>0){
	firstSat+=-7
}
if (firstSat<1) firstSat+=7

//adjust for windows95 daylight savings time changes

if ((((month==4) && (date>=firstSat)) || month>4)  && (month<11 || ((month==10) && day<=lastSat))){
		adjust+=60}
yourOffset=(new Date()).getTimezoneOffset();
yourOffset = yourOffset+adjust


//************ NOTE: the next section fixes a Navigator 4 bug, remove it if necessary
var xx = navigator.appName
var xy = navigator.appVersion;
xy = xy.substring(0,1);
if ((xy==4) && (xx=="Netscape")) yourOffset = yourOffset+adjust;
if ((((month==4) && (date>20)) || month>4)  && (month<11 || ((month==10) && day<30))){
		adjust-=60}
//************ this is the end of the Navigator 4 bug,


ourDifference=eval(myOffset-yourOffset);
var half=eval(ourDifference%60);
ourDifference=Math.round(ourDifference/60);
hour=eval(hour-ourDifference);
var m = new Array ("mm","Jan.","Feb.","Mar.","Apr.","May","Jun.","Jul.","Aug.","Sept.","Oct.","Nov.","Dec.");
var leap=eval(year%4);

if ((half==-30) || (half==30)) minute+=30;
if (minute>59) minute-=60, hour++;
if (minute<0) minute+=60, hour--;
if (hour>23) hour-=24, date+=1;
if (((month==4) || (month==6) || (month==9) || (month==11)) && (date==31)) date=1, month+=1;
if (((month==2) && (date>28)) && (leap!=0)) date=1, month+=1;
if ((month==2) && (date>29)) date=1, month+=1;


if (hour<0) hour+=24, date-=1;
if ((date==32) && (month==12)) month=m[1], date=1, year+=1
if (date==32) date=1, month+=1;
if ((date<1) && (month==1)) month=m[12], date=31, year-=1
if (date<1) date=31, month-=1;
if (((month==4) || (month==6) || (month==9) || (month==11)) && (date==31)) date=30;
if ((month==2) && (date>28)) date=29;
if (((month==2) && (date>28)) && (leap!=0)) date=28;
for (i=1;i<13;i++){
if (month==i) {month=m[i];
break;
}
}


// i have disabled the 12 hour clock in favour of the 24 hour clock
//var dateTime = "" + ((hour >12) ? hour -12 :hour)
var dateTime = hour;
dateTime = ((dateTime <10)? "0":"") + dateTime;
dateTime = "    " + dateTime;
dateTime += ((minute < 10) ? ":0" : ":") + minute;
dateTime += ((second < 10) ? ":0" : ":") + second;
//dateTime += (hour >= 12) ? " pm," : " am, ";
dateTime += "  " + month + " " + date + ", " + year;
document.clock.face.value = dateTime;
document.clock.locationx.value = zone;
setTimeout("checkDateTime()",900);

}

// End -->