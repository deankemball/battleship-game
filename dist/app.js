"use strict";
document.addEventListener("DOMContentLoaded", () => {
    // grid constants and types
    const player1Grid = document.getElementById("player-1-field");
    const player2Grid = document.getElementById("player-2-field");
    const gridChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const player1GridState = {};
    const player2GridState = {};
    // ships constants
    const rotateButton = document.getElementById("rotate-button");
    const shipsContainer = document.getElementById("player-1-ships");
    const shipsContainerClass = shipsContainer.className;
    // name change constants
    const nameChangeButton = document.getElementById("name-change-button");
    var playerName = document.getElementById("player-1-name");
    var playerNameOrig = "CADET";
    var noticeText = document.getElementById("update");
    // grid functions
    // create unique grid ids
    for (let i = 0; i < gridChars.length; i++) {
        for (let j = 1; j <= 10; j++) {
            const player1Id = `player-1-${gridChars[i]}-${j}`;
            const player2Id = `player-2-${gridChars[i]}-${j}`;
            const player1Square = document.createElement('div');
            player1Square.id = player1Id;
            const player2Square = document.createElement('div');
            player2Square.id = player2Id;
            player1Grid.appendChild(player1Square);
            player2Grid.appendChild(player2Square);
        }
    }
    // create objects with unique key names (positions) and values (initialized as empty: "")
    // create the key names
    function createKeyValuePair(grid, position, value) {
        grid[position] = value;
    }
    // return the value of the called key name 
    function getValue(grid, position) {
        return grid[position];
    }
    // loop through the grid and for every cell assign the unique key name and value (e.g. "b-3", "")
    for (let i = 0; i < gridChars.length; i++) {
        for (let j = 0; j <= 10; j++) {
            createKeyValuePair(player1GridState, `${gridChars[i]}-${j}`, "");
            createKeyValuePair(player2GridState, `${gridChars[i]}-${j}`, "");
        }
    }
    // declare the Ship class which has default attributes; type, isHorizontal, length
    class Ship {
        // assign lenghts for each instance of ShipType
        constructor(type) {
            this.isHorizontal = true;
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
            this.isHorizontal = this.isHorizontal ? false : true;
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
    // NAME CHANGE BUTTON
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
