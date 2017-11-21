/*
 * Create a list that holds all of your cards
 */
var cards = ["fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bomb",
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bomb"
];

var seconds = 0; // 计时变量
var selectedCrads = []; // 储存翻开卡片的class值
var timeId = null; // 计时器Id
var timeStarFlag = 0;
var moveNum = 0; // 匹配次数
var successNum = 0; // 成功次数
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function deal() {
    $(".card").each(function (idx, val) {
        $(this).attr("class", "card");
        $(this).children().attr("class", cards[idx]);
    })
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

/**
 * 重置卡片
 */
function resetting() {
    resetStar();
    timeStarFlag = 0;
    $(".moves").html(0);
    moveNum = 0;
    timerEnd(timeId);
    cards = shuffle(cards);
    deal();
}
/**
 * 点击卡片事件
 */
$(".card").click(function () {

    var $timers = $(".timers").html();
    if (+$timers === 0 && timeStarFlag === 0) {
        timeStarFlag = 1;
        timeId = timerStar();
    }
    // 通过比较class属性值阻止已翻开卡片执行点击事件
    if ($(this).attr("class") && $(this).attr("class") !== "card")
        return false;
    switch (selectedCrads.length) {
        case 0:
            selectedCrads.push($(this).children().attr("class"));
            $(this).addClass("open show");
            break;
        case 1:
            selectedCrads.push($(this).children().attr("class"));
            $(this).addClass("open show");
            match(selectedCrads);
            break;
        case 2:
            return false;
            break;
        default:
            break;
    }

});

/**
 * 匹配
 * @param {*翻开卡片集} arr 
 */
function match(arr) {
    arr[0] === arr[1] ? matchSuccess(arr[0]) : matchFailure(arr);
}

/**
 * 匹配成功
 * @param {*当前卡片class值} classname 
 */
function matchSuccess(classname) {
    $(".card").each(function () {
        var $childClass = $(this).children().attr("class");
        if ($childClass === classname) {
            $(this).attr("class", "card match");
            $(this).animateCss("bounceOut");
        }
    })
    selectedCrads = [];
    $(".moves").html(++moveNum);
    successNum++;
    if (successNum === 8) {
        complete();
    }
}

/**
 * 匹配失败
 * @param {*翻开卡片集} arr 
 */
function matchFailure(arr) {
    $(".card").each(function () {
        var $me = $(this);
        if ($(this).hasClass("open")) {
            $(this).addClass("fail");
            $(this).animateCss("shake");
        }
    })
    setTimeout(function () {

        $(".card").each(function () {
            var $childClass = $(this).children().attr("class");
            if ($childClass === arr[0]) {
                $(this).attr("class", "card")
            }
            if ($childClass === arr[1]) {
                $(this).attr("class", "card")
            }
        })
        selectedCrads = [];
    }, 1000)
    $(".moves").html(++moveNum);

}

/**
 * 开始计时
 */
function timerStar() {
    return setInterval(function () {
        seconds++;
        if (seconds === 30 || seconds === 45 || seconds === 60) {
            removeStar();
        }
        $(".timers").html(seconds);
    }, 1000);
}

/**
 * 结束计时
 * @param {计时器Id} id 
 */
function timerEnd(id) {
    seconds = 0;
    clearInterval(id);
    $(".timers").html(0);
}

function complete() {
    $(".pass").show();
    clearInterval(timeId);
    var congratulation = moveNum + " moves," + seconds + " seconds,Congratulations!"
    $("#sucess-star").animateCss("fadeInDown")
    $(".congratulate").html(congratulation);
    $(".congratulate").animateCss("bounceIn");
}

function tryAgain() {
    resetting()
    $(".pass").hide();
}

/**
 * 移除星星
 */
function removeStar() {
    $(".stars li:first").remove();
    $(".stars li:last").remove();
}

/**
 * 重置星星
 */
function resetStar() {
    $(".stars").empty();
    $(".stars").append("<li><i class=\"fa fa-star\"></i></li><li><i class=\"fa fa-star\"></i></li><li><i class=\"fa fa-star\"></i></li>")
}
/**
 * TODO:
 * 1、增加CSS动画(已解决)
 * 2、得分等级(已解决)
 * 3、全部匹配后的模态框提示(已解决)
 * 4、卡片存储问题(已解决)
 */