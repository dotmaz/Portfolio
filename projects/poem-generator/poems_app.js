var firebaseConfig = {
    apiKey: "AIzaSyBRbdO2-yYLRLeas0rEekLQSqEgvKo4lO0",
    authDomain: "gsvlabs-mad-libs.firebaseapp.com",
    databaseURL: "https://gsvlabs-mad-libs.firebaseio.com",
    projectId: "gsvlabs-mad-libs",
    storageBucket: "gsvlabs-mad-libs.appspot.com",
    messagingSenderId: "421286409508",
    appId: "1:421286409508:web:1337a848a22f933c6a2fb1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

var cardComponent = `<div class="cardTrigger">
                        <div class="card">
                            <div class="cardTitle"></div>
                            <div class="cardDate"></div>
                            <div class="cardContent"></div>
                            <div class="cardContentBlur"></div>
                        </div>
                     </div>`;

$(document).ready(function() {
    pullCards();
    
    $('body').on('click', '.cardTrigger', function(event) {
        $('#cardPreviewTitle').text($(this).children('.card').children('.cardTitle').text());
        $('#cardPreviewDate').text($(this).children('.card').children('.cardDate').text());
        $('#cardPreviewContent').text($(this).children('.card').children('.cardContent').text());
        
        $('#cardPreview').css({
            'display': 'flex'
        });
        
        $('#cardView').css({
            'filter': 'blur(3px)',
            'pointer-events': 'none'
        });
        
        $('#controlView').css({
            'filter': 'blur(3px)',
            'pointer-events': 'none'
        });
        
        $('#cardPreview').animate({
            'opacity': '1'
        });
    });
});

function closeCardPreview(){
    $('#cardPreview').removeAttr('style');
    $('#cardView').removeAttr('style');
    $('#controlView').removeAttr('style');
}

function pullCards(){
    firebase.database().ref('/poems/').once('value').then(function(snapshot) {
        if(snapshot.numChildren() == 0){
            $("#emptyView").css({
                'display': 'flex'
            });
            $("#emptyView").animate({
                'opacity': '1'
            }, 200);
        }else{
            $("#emptyView").removeAttr('style');
        }
        
        snapshot.forEach(function(childSnapshot){
            var cur = $(cardComponent).appendTo("#cardView");
            cur.children(".card").children(".cardTitle").text(childSnapshot.key);
            cur.children(".card").children(".cardDate").text(childSnapshot.child("date").val());
            cur.children(".card").children(".cardContent").text(childSnapshot.child("poem").val());
        });
    });
}

function newPoem(){
    
    $("#controlView").css({
        'filter': 'blur(10px)',
        'pointer-events': 'none'
    });
    $("#cardView").css({
        'filter': 'blur(10px)',
        'pointer-events': 'none'
    });
    $("#createView").css({
        'display': 'inline'
    });
    $("#cancelCreateTrigger").css({
        'display': 'inline'
    });
    
    $("#createView").animate({
        'opacity': '1'
    }, 200);
    
    $("#cancelCreateTrigger").animate({
        'opacity': '1'
    }, 200);
    
    $("#pl1").addClass("previewAnimIn");
}

function deletePoems(){
    $(".card").animate({
        'opacity': '0',
        'transform': 'scale(.8)'
    }, 200, function(){
        $(".cardTrigger").remove();
        firebase.database().ref('poems/').set({});
        pullCards();
    });
    
}

function testPoem(){
    $("#emptyView").removeAttr('style');
    var curDate = new Date();
    var month = months[curDate.getMonth()];
    var date = curDate.getDate();
    var year = curDate.getFullYear();
    
    var hourlabel = "pm";
    var hour;
    if(curDate.getHours() < 12){
        hourlabel = "am";
    }
    if(curDate.getHours() == 0){
        hour = 12;
    }else{
        hour = (curDate.getHours()%12);
    }
    var minute = curDate.getMinutes();
    if(minute < 10){
        minute = "0" + minute.toString(10);
    }
    
    var testTitle = "Test Poem " + (999 + Math.floor(Math.random()*9000)).toString(10);
    var testDate = month + " " + date.toString(10) + ", " + year.toString(10) + " at " + hour.toString(10) + ":" + minute.toString(10) + hourlabel;
    var testPoem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;
    database.ref('poems/' + testTitle).set({
        poem: testPoem,
        date: testDate,
    });
    var cur = $(cardComponent).appendTo("#cardView");
    cur.children(".card").children(".cardTitle").text(testTitle);
    cur.children(".card").children(".cardDate").text(testDate);
    cur.children(".card").children(".cardContent").text(testPoem);
}

function showPoem(){
    $("#showPoemView").css({
        'display': 'inline'
    });
    $("#showPoemView").animate({
        'opacity': '1'
    }, 100);
    
    $("#controlView").css({
        'filter': 'blur(10px)',
        'pointer-events': 'none'
    });
    $("#cardView").css({
        'filter': 'blur(10px)',
        'pointer-events': 'none'
    });
}