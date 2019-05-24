var player = {
    name: "Max",
    health: "100%",
    location: {
        x: 0,
        y: 0,
        getLocation() {
            return this.x + ", " + this.y;
        }
    },
    currentLocation: {
        x: 0,
        y: 0,
        setCurrentLocation(x, y) {
            this.x = x;
            this.y = y;
        }
    }
};

var shop = {
    location: {
        x: 0,
        y: 0,
        getLocation() {
            return this.x + ", " + this.y;
        },
        setLocation(x, y) {
            this.x = x;
            this.y = y;
        },
        items: {
            name: "",
            price: 0,
            discription: ""
        }
    }
}

var npc = {
    name: "Monster",
    health: "100%",
    location: {
        x: 0,
        y: 0,
        getLocation() {
            return this.x + ", " + this.y;
        },
        setLocation(x, y) {
            this.x = x;
            this.y = y;
        }
    }
}

var map = [
    [1, 1, 2, 0, 0],
    [2, 1, 2, 2, 2],
    [0, 1, 1, 1, 1],
    [0, 2, 2, 0, 1],
    [2, 2, 0, 0, 1]
];

var random = 5;

//looking if there is any overflow, continue to randomize
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map.length; j++) {
        if (shop.location.getLocation() == npc.location.getLocation()) {
            shop.location.setLocation(Math.floor(Math.random() * random), Math.floor(Math.random() * random));
            npc.location.setLocation(Math.floor(Math.random() * random), Math.floor(Math.random() * random));
        }
        if (shop.location.getLocation() == "0, 0") {
            shop.location.setLocation(Math.floor(Math.random() * random), Math.floor(Math.random() * random));
        }
        if (npc.location.getLocation() == "0, 0") {
            npc.location.setLocation(Math.floor(Math.random() * random), Math.floor(Math.random() * random));
        }
        if (map[shop.location.x][shop.location.y] == 0) {
            shop.location.setLocation(Math.floor(Math.random() * random), Math.floor(Math.random() * random));
        }
        if (map[shop.location.x][shop.location.y] == 1) {
            shop.location.setLocation(Math.floor(Math.random() * random), Math.floor(Math.random() * random));
        }
        if (map[npc.location.x][npc.location.y] == 0) {
            npc.location.setLocation(Math.floor(Math.random() * random), Math.floor(Math.random() * random));
        }
    }
}

function info() {
    switch (map[player.location.x][player.location.y]) {
        case 0:
            console.log("water");
            break;
        case 1:
            console.log("road");
            break;
        case 2:
            console.log("grass");
            break;
        default:
    }
}

//creating a canvas & maptiles
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.width = random * 100;
canvas.height = random * 100;

canvas.style.border = "2px solid #4c90ff";

var water = new Image();
var road = new Image();
var grass = new Image();

var house = new Image();
var monster = new Image();
//var warrior = new Image();
//var tree = new Image();

water.src = "img/water.jpg";
road.src = "img/road.jpg";
grass.src = "img/grass.jpg";

house.src = "img/house.png";
monster.src = "img/monster.png";
//warrior.src = "img/warrior.png";
//tree.src = "tree.png";

var character = document.getElementById("player");
character.className = "move-down";

var posX = 0;
var posY = 0;

//drawing the map
window.onload = function () {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map.length; j++) {
            switch (map[i][j]) {
                case 0:
                    context.drawImage(water, posX, posY, 100, 100);
                    break;
                case 1:
                    context.drawImage(road, posX, posY, 100, 100);
                    break;
                case 2:
                    context.drawImage(grass, posX, posY, 100, 100);
                    break;
                default:
                    break;
            }
            if (i == shop.location.x && j == shop.location.y) {
                context.drawImage(house, posX, posY, 100, 100);
            }
            if (i == npc.location.x && j == npc.location.y) {
                context.drawImage(monster, posX, posY, 100, 100);
            }
            posX += 100;
        }
        posX = 0;
        posY += 100;
    }
}

player.currentLocation.setCurrentLocation(player.location.x, player.location.y);

function shopCheck() {
    if (player.location.getLocation() == shop.location.getLocation())
        console.log("you entered the shop.");
}

function npcCheck() {
    if (player.location.getLocation() == npc.location.getLocation())
        console.log("you encounterd the enemy.");
}

function notAllowedMessage() {
    console.log("there is nothing, you can't go there.");
}

var isThereAWater = false;

function waterCheck() {
    if (map[player.location.x][player.location.y] == 0)
        isThereAWater = true;
    else
        isThereAWater = false;
}
/*
function moveAnimation() {
    setInterval(function () {
        character.style.backgroundPositionX = "-192px";
    }, 200);
    setInterval(function(){
        character.style.backgroundPositionX = "-128px";
    }, 200);
    setInterval(function(){
        character.style.backgroundPositionX = "-64px";
    }, 200);
    character.style.backgroundPositionX = "0px";
}
*/
//movement functions
function goUp() {
    if (player.location.x == 0) {
        notAllowedMessage()
    } else {
        map[player.location.x][player.location.y] = map[player.location.x--][player.location.y];
        waterCheck();
        if (isThereAWater) {
            console.log("you can't go there, there is water");
            map[player.location.x][player.location.y] = map[player.location.x++][player.location.y];
        } else {
            player.currentLocation.y -= 100;
            console.log("Moved up to " + map[player.location.x][player.location.y]);
            info();
            $(character).animate({
                top: player.currentLocation.y
            });
            character.className = "move-up";
            //moveAnimation();
            shopCheck();
            npcCheck();
        }
    }
}

function goDown() {
    if (player.location.x == map.length - 1) {
        notAllowedMessage()
    } else {
        map[player.location.x][player.location.y] = map[player.location.x++][player.location.y];
        waterCheck();
        if (isThereAWater) {
            console.log("you can't go there, there is water");
            map[player.location.x][player.location.y] = map[player.location.x--][player.location.y];
        } else {
            player.currentLocation.y += 100;
            console.log("Moved down to " + map[player.location.x][player.location.y]);
            info();
            $(character).animate({
                top: player.currentLocation.y
            });
            character.className = "move-down";
            //moveAnimation();
            shopCheck();
            npcCheck();
        }
    }
}

function goLeft() {
    if (player.location.y == 0) {
        notAllowedMessage()
    } else {
        map[player.location.x][player.location.y] = map[player.location.x][player.location.y--];
        waterCheck();
        if (isThereAWater) {
            console.log("you can't go there, there is water");
            map[player.location.x][player.location.y] = map[player.location.x][player.location.y++];
        } else {
            player.currentLocation.x -= 100;
            console.log("Moved left to " + map[player.location.x][player.location.y]);
            info();
            $(character).animate({
                left: player.currentLocation.x
            });
            character.className = "move-left";
            //moveAnimation();
            shopCheck();
            npcCheck();
        }
    }
}

function goRight() {
    if (player.location.y == map.length - 1) {
        notAllowedMessage()
    } else {
        map[player.location.x][player.location.y] = map[player.location.x][player.location.y++];
        waterCheck();
        if (isThereAWater) {
            console.log("you can't go there, there is water");
            map[player.location.x][player.location.y] = map[player.location.x][player.location.y--];
        } else {
            player.currentLocation.x += 100;
            console.log("Moved right to " + map[player.location.x][player.location.y]);
            info();
            $(character).animate({
                left: player.currentLocation.x
            });
            character.className = "move-right";
            //moveAnimation();
            shopCheck();
            npcCheck();
        }
    }
}
/*
document.getElementById("demo").innerHTML = "Player " + player.name +
    " with " + player.health + " health was spawned on " +
    player.location.getLocation() +
    " (" + map[player.location.x][player.location.y] +
    ")" + "<p> Shop location: " + shop.location.getLocation() +
    " (" + map[shop.location.x][shop.location.y] + ") </p>" +
    "NPC location: " + npc.location.getLocation() +
    " (" + map[shop.location.x][shop.location.y] + ")" + "</p>";

document.write("map:" + "<br><br>" + "<p>");
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map.length; j++) {
        document.write(map[i][j] + " ");
    }
    document.write("<br>");
}
*/

//moving with arrows
document.onkeydown = function (event) {
    switch (event.keyCode) {
        case 37:
            goLeft();
            break;
        case 38:
            goUp();
            break;
        case 39:
            goRight();
            break;
        case 40:
            goDown();
            break;
    }
};