//使用自调用函数，创建一个局部作用域
(function () {
    var that;  //记录游戏对象
    function Game(map) {
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;
    }

    Game.prototype.start = function () {
        //1、把蛇跟食物渲染到地图上
        this.food.render(this.map);
        this.snake.render(this.map);
        //开始游戏的逻辑
        //2.1 让蛇移动起来
        runSnake();
        //2.2 通过方向键来控制移动的方向
        bindKey();
        //2.3 当蛇遇到食物的时候

    };

    function bindKey() {
        // document.onkeydown()
        document.addEventListener("keydown",function (e) {
            // console.log(e.keyCode);
            //37-left  38-up  39-right  40 -down
            switch (e.keyCode) {
                case 37:
                    if (that.snake.direction==="right"){
                        that.snake.direction = "right";
                        break;
                    }
                    that.snake.direction = "left";
                    break;
                case 38:
                    if (that.snake.direction==="bottom"){
                        that.snake.direction = "bottom";
                        break;
                    }
                    that.snake.direction = "top";
                    break;
                case 39:
                    if (that.snake.direction==="left"){
                        that.snake.direction = "left";
                        break;
                    }
                    that.snake.direction = "right";
                    break;
                case 40:
                    if (that.snake.direction==="top"){
                        that.snake.direction = "top";
                        break;
                    }
                    that.snake.direction = "bottom";
                    break;
            }
        },false)
    }


    //私有的函数
    function runSnake(){
        var timerId = setInterval(function () {
            //让蛇往前走一格
            //在定时器的function中，this指向window
            that.snake.move(that.food,that.map);
            that.snake.render(that.map);

            //2.4 当蛇遇到边界，游戏结束
            var maxX = that.map.offsetWidth / that.snake.width;
            var maxY = that.map.offsetHeight / that.snake.height;
            var headX = that.snake.body[0].x;
            var headY = that.snake.body[0].y;
            if (headX<0 || headX>=maxX) {
                alert("Game Over\n Score is "+window.Score);
                clearInterval(timerId);
            }
            if (headY<0 || headY>=maxY) {
                alert("Game Over\n Score is "+window.Score);
                clearInterval(timerId);
            }
            if (window.flag){
                alert("Game Over\n Score is "+window.Score);
                clearInterval(timerId);
            }

        },150)
    }

    // console.log(that.snake.body[1].x,that.snake.body[1].y);
    // function ifTouch(headX,headY){
    //     for (var i = that.snake.body.length;i>0;i--){
    //         if (headX===that.snake.body[i].x && headY===that.snake.body[i].y){
    //             console.log(that.snake.body[i].x,that.snake.body[i].y);
    //             console.log(headX,headY);
    //             return true;
    //         }
    //     }
    // }

    window.Game = Game;
})();

