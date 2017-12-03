const UNIT_WIDTH = 101; // 单位宽
const UNIT_Height = 83; // 单位高


// 这是我们的玩家要躲避的敌人 
class Enemy {
    constructor(x, y) {
        // 要应用到每个敌人的实例的变量写在这里
        // 我们已经提供了一个来帮助你实现更多
        this.x = x;
        this.y = y;
        this.speed = Math.ceil(Math.random() * 5) * 50;
        // this.speed = 100;
        // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
        this.sprite = 'images/enemy-bug.png';
        this.leaved=false;// 是否离开画布
    }
    // 此为游戏必须的函数，用来更新敌人的位置
    // 参数: dt ，表示时间间隙
    update(dt) {
        // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
        // 都是以同样的速度运行的
        this.x >= 5*UNIT_WIDTH ? this.leaved =true : this.x += dt * this.speed;
    }
    // 此为游戏必须的函数，用来在屏幕上画出敌人，
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}


// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
class Player {
    constructor(x, y, hero) {
        this.x = x;
        this.y = y;
        this.hero = hero;
        this.collided = false;
        this.success=false;
    }

    update(dx = 0, dy = 0) {
        this.x += dx * UNIT_WIDTH;
        this.y += dy * UNIT_Height;
        // 右边界
        if (this.x > UNIT_WIDTH * 4) {
            this.x = UNIT_WIDTH * 4;
        }
        // 左边界
        if (this.x < 0) {
            this.x = 0;
        }
        // 上边界
        if (this.y < 56 - UNIT_Height) {
            this.y = 56 - UNIT_Height;
        }
        // 下边界
        if (this.y > 6 * UNIT_Height + 56) {
            this.y = 6 * UNIT_Height + 56;
        }
        if(this.y==56 - UNIT_Height){
            this.success=true;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.hero), this.x, this.y)
    }

    // 重置玩家
    reset() {
        this.x = Math.floor(Math.random() * 5) * UNIT_WIDTH;
        this.y = 56 + (5 + Math.round(Math.random())) * UNIT_Height;
    }
    // 碰撞检测
    collisions(enemyX, enemyY) {
        if (this.y == enemyY && ((this.x < enemyX + UNIT_WIDTH && this.x > enemyX)||(this.x < enemyX && this.x > enemyX - UNIT_WIDTH))) {
            this.collided=true;
            console.log('enemy: ',enemyX, enemyY);
            console.log('player: ',this.x, this.y);
            this.reset();
        }
    }
    handleInput(key) {
        switch (key) {
            case "left":
                this.update(-1, 0);
                break;
            case "up":
                this.update(0, -1);
                break;
            case "right":
                this.update(1, 0);
                break;
            case "down":
                this.update(0, 1);
                break;
            default:
                break;
        }
    }
}

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [],player,name,time=0,timeId;

setInterval(function () {
    let enemy = new Enemy(0, 56 + (Math.floor(Math.random() * 5) * 83));

    allEnemies.push(enemy);
    console.log(allEnemies.length);
}, Math.ceil(Math.random() * 2) * 1000);
// 初始化玩家
player = new Player(Math.floor(Math.random() * 5) * UNIT_WIDTH, 56 + (5 + Math.round(Math.random())) * UNIT_Height, "images/char-boy.png")


$(".player").click(function(){
    let playImg=$(this).children().attr("src");
    player = new Player(Math.floor(Math.random() * 5) * UNIT_WIDTH, 56 + (5 + Math.round(Math.random())) * UNIT_Height, playImg);
    reset();
    name=$("#playerName").val()==""?"玩家":$("#playerName").val();
    $(".start").hide();
    timeId=keeyTimeStart();
})
function keeyTimeStart(){
    return setInterval(function(){
        time++;
    },1000)
}

function playAgain(){
    $(".start").show();
    $("#suc").hide();
    $("#playerName").val("");
    time=0;
}
// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});