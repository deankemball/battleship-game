"use strict";
document.addEventListener("DOMContentLoaded", () => {
    // GRID STUFF
    const gridChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    class Grid {
        constructor(type) {
            this.ships = [];
            this.squares = [];
            this.type = type;
            this.state = {};
            for (let i = 0; i < gridChars.length; i++) {
                for (let j = 1; j <= 10; j++) {
                    const position = `${gridChars[i]}-${j}`;
                    this.state[position] = "";
                }
            }
            this.element = document.createElement('div');
            this.element.classList.add("grid", this.type === "player-1" ? "player-1-field" : "player-2-field");
            const container = document.querySelector(".field-container");
            container.appendChild(this.element);
        }
        createBoard() {
            for (const key in this.state) {
                const square = document.createElement("div");
                square.id = `${this.type}-${key}`;
                this.element.appendChild(square);
                this.squares.push(square);
            }
        }
        getValue(position) {
            return this.state[position];
        }
        setValue(position, value) {
            this.state[position] = value;
        }
        hasValue(position) {
            const value = this.getValue(position);
            return Boolean(value);
        }
    }
    class Player1Grid extends Grid {
        constructor() {
            super("player-1");
        }
    }
    class Player2Grid extends Grid {
        constructor() {
            super("player-2");
        }
    }
    const player1Grid = new Player1Grid;
    const player2Grid = new Player2Grid;
    player1Grid.createBoard();
    player2Grid.createBoard();
    // SHIP STUFF
    const rotateButton = document.getElementById("rotate-button");
    const shipsContainer = document.getElementById("player-1-ships");
    const shipsContainerClass = shipsContainer.className;
    // declare the Ship class which has default attributes; type, isHorizontal, length
    class Ship {
        // assign lenghts for each instance of ShipType
        constructor(type) {
            this.isVertical = true;
            this.type = type;
            switch (this.type) {
                case "destroyer":
                    this.length = 2;
                    break;
                case "cruiser":
                case "submarine":
                    this.length = 3;
                    break;
                case "battleship":
                    this.length = 4;
                    break;
                case "carrier":
                    this.length = 5;
                    break;
            }
        }
    }
    // modifies the PlayerShip ShipType by adding combining the previous type from Ship with "-container"
    class PlayerShip extends Ship {
        constructor(type) {
            super(type);
            this.element = document.querySelector(`.${this.type}-container`);
        }
        rotate() {
            this.isVertical = this.isVertical ? false : true;
            const shipSpecificClass = this.element.className.split(" ")[1];
            this.element.classList.toggle(`${shipSpecificClass}-vertical`);
        }
    }
    const shipsArray = [
        new PlayerShip("destroyer"),
        new PlayerShip("submarine"),
        new PlayerShip("cruiser"),
        new PlayerShip("battleship"),
        new PlayerShip("carrier"),
    ];
    const shipsContainerArray = [
        "player-1-ships"
    ];
    rotateButton.addEventListener("click", () => {
        shipsContainer.classList.toggle(`${shipsContainerClass}-vertical`);
        return shipsArray.forEach((ship) => ship.rotate());
    });
    let selectedShipPart;
    let selectedShip;
    shipsArray.forEach(ship => {
        ship.element.addEventListener('mousedown', (event) => {
            const target = event.target;
            selectedShipPart = parseInt(target.id.split("-")[1]);
        });
        ship.element.addEventListener("dragstart", (event) => {
            selectedShip = ship;
            const targetClass = selectedShip.element.className;
            const targetShip = Array.from(document.getElementsByClassName(targetClass))[0];
            targetShip.classList.add("hide-dragged");
        });
    });
    player1Grid.element.addEventListener("dragstart", (event) => event.preventDefault());
    player1Grid.element.addEventListener("dragover", (event) => event.preventDefault());
    player1Grid.element.addEventListener("dragenter", (event) => event.preventDefault());
    player1Grid.element.addEventListener("dragleave", (event) => event.preventDefault());
    player1Grid.element.addEventListener("drop", (event) => {
        const target = event.target;
        const position = makePositionFromId(target.id);
        placeShip(selectedShip, selectedShipPart, position);
    });
    function makePositionFromId(id) {
        const [char, number] = id.split("-").slice(2);
        return `${char}-${parseInt(number)}`;
    }
    function placeShip(ship, shipPart, position) {
        // create a binding that holds all of the positions takes
        const shipClass = Array.from(ship.element.classList)[1];
        const enemyShip = document.getElementsByClassName(shipClass)[1];
        enemyShip.classList.add("invisible");
        const shipSquares = [];
        const positionChar = position.split("-")[0];
        const gridNum = parseInt(position.split("-")[1]);
        if (!ship.isVertical) {
            for (let i = 0; i < ship.length; i++) {
                const column = gridNum + i - shipPart;
                if (column > 10 || column < 1) {
                    return;
                }
                shipSquares.push(`${positionChar}-${column}`);
            }
        }
        else {
            for (let i = 0; i < ship.length; i++) {
                const char = gridChars.indexOf(positionChar);
                const row = char + i - shipPart;
                if (row > 10 || row < 1) {
                    return;
                }
                shipSquares.push(`${gridChars[row]}-${gridNum}`);
            }
        }
        const isTaken = shipSquares.some((square) => player1Grid.getValue(square));
        if (!isTaken) {
            shipSquares.forEach(square => player1Grid.setValue(square, ship.type));
            shipSquares.forEach(square => { var _a; return (_a = document.getElementById(`player-1-${square}`)) === null || _a === void 0 ? void 0 : _a.classList.add("placed"); });
            ship.element.setAttribute("draggable", "false");
            ship.element.classList.add("invisible");
        }
        // document.getElementById(`player-1-${shipSquares}`)?.classList.add("placed")
    }
    // NAME CHANGE STUFF
    const nameChangeButton = document.getElementById("name-change-button");
    var playerName = document.getElementById("player-1-name");
    var playerNameOrig = "CADET";
    var noticeText = document.getElementById("update");
    function showButton() {
        nameChangeButton.classList.add("name-change-button-show");
        noticeText.classList.add("update-hide");
    }
    function hideButton() {
        nameChangeButton.classList.remove("name-change-button-show");
        noticeText.classList.remove("update-hide");
    }
    function changeName() {
        var userVersion = playerName.innerHTML;
        if (userVersion.length == 0) {
            playerName.innerHTML = playerNameOrig;
            noticeText.innerHTML = "try again";
        }
        else {
            localStorage.userEdits = userVersion;
            noticeText.innerHTML = "name changed";
            setTimeout(function () { noticeText.classList.add("update-hide"); }, 1500);
        }
    }
    nameChangeButton.addEventListener("click", changeName);
    playerName.addEventListener("click", showButton);
    nameChangeButton.addEventListener("click", hideButton);
});
