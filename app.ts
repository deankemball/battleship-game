document.addEventListener("DOMContentLoaded", () => {
  // GRID STUFF
  const gridChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

  type Position = `${string}-${number}`
  type PossibleValue = "" | ShipType;
  type GridState = Record<Position, PossibleValue>;

abstract class Grid {
    protected state: GridState
    type: "player-1" | "player-2"
    ships: Ship[] = []
    element: HTMLElement
    squares: HTMLElement[] = []

    constructor(type: "player-1" | "player-2") {
      this.type = type
      this.state = {}

      for (let i = 0; i < gridChars.length; i++) {
        for (let j = 1; j <= 10; j++) {
          const position: Position = `${gridChars[i]}-${j}`;
              this.state[position] = "";
        }
      }

      this.element = document.createElement('div')
      this.element.classList.add(
        "grid",
        this.type === "player-1" ? "player-1-field" : "player-2-field"
      );
      
      const container = document.querySelector(".field-container") as HTMLElement
      container.appendChild(this.element)
    }
    
    createBoard(): void {
        
      for(const key in this.state) {
        const square = document.createElement("div")
        square.id = `${this.type}-${key}`
        this.element.appendChild(square)
        this.squares.push(square)
      }
    }
      getValue(position: Position): PossibleValue {
        return this.state[position];
      }

      setValue(position: Position, value: PossibleValue): void {
        this.state[position] = value;
      }

      hasValue(position: Position): boolean {
        const value = this.getValue(position);
        return Boolean(value);
      }
    }
    
    class Player1Grid extends Grid {
      constructor() {
        super("player-1")
      }
    }
    class Player2Grid extends Grid {
      constructor() {
        super("player-2")
      }
    }

  const player1Grid = new Player1Grid;
  const player2Grid = new Player2Grid;

  player1Grid.createBoard();
  player2Grid.createBoard();
  
  
  
  // SHIP STUFF
  const rotateButton = document.getElementById("rotate-button") as HTMLElement;
  const shipsContainer = document.getElementById("player-1-ships") as HTMLElement;
  const shipsContainerClass = shipsContainer.className;
  
  // declare the type ShipType which is a union of all the ship sizes
  type ShipType = 
  | "destroyer" 
  | "submarine" 
  | "cruiser" 
  | "battleship" 
  | "carrier"
  
  // declare the Ship class which has default attributes; type, isHorizontal, length
  class Ship {
    type: ShipType;
    isHorizontal: boolean = true;
    length: number;
    
    // assign lenghts for each instance of ShipType
    constructor(type: ShipType) {
      this.type = type;
      switch (this.type) {
        case "destroyer": 
        this.length = 2
        break;
        case "cruiser":
          case "submarine":
            this.length = 3
            break;
            case "battleship": 
            this.length = 4
            break;
            case "carrier": 
            this.length = 5
            break;
          }
        }
      }
      
      // modifies the PlayerShip ShipType by adding combining the previous type from Ship with "-container"
      class PlayerShip extends Ship {
        element: HTMLElement
      constructor(type: ShipType) {
        super(type);
        this.element = document.querySelector(
          `.${this.type}-container`
          ) as HTMLElement;
        }
        
        rotate() {
          this.isHorizontal = this.isHorizontal ? false : true;
          
          const shipSpecificClass = this.element.className.split(" ")[1];
          this.element.classList.toggle(`${shipSpecificClass}-vertical`)
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
    
    rotateButton.addEventListener("click", () =>
    {
      shipsContainer.classList.toggle(`${shipsContainerClass}-vertical`);
      return shipsArray.forEach((ship) => ship.rotate());
    });

    let selectedShipPart 
    let selectedShip 

    shipsArray.forEach(ship => {
      ship.element.addEventListener('mousedown', (event) => {
        selectedShipPart = event.target;
        console.log(selectedShipPart)
      });
      ship.element.addEventListener("dragstart", (event) => {
        selectedShip = event.target;
        console.log(selectedShip)
      })
    })

    player1Grid.element.addEventListener("dragstart", (event) =>
      event.preventDefault()
    );
    player1Grid.element.addEventListener("dragover", (event) =>
      event.preventDefault()
    );
    player1Grid.element.addEventListener("dragenter", (event) =>
      event.preventDefault()
    );
    player1Grid.element.addEventListener("dragleave", (event) =>
      event.preventDefault()
    );
    player1Grid.element.addEventListener("drop", (event) => {
      const target = event.target as HTMLElement;
      makePositionFromId(target.id);
    });

    function makePositionFromId(id: string): Position {
      const [char, number] = id.split("-").slice(2);
      console.log(`${char}-${parseInt(number)}`)
      return `${char}-${parseInt(number)}`;
    }
    
    // NAME CHANGE STUFF
  const nameChangeButton = document.getElementById("name-change-button") as HTMLElement;
  var playerName = document.getElementById("player-1-name") as HTMLElement;
  var playerNameOrig = "CADET";
  var noticeText = document.getElementById("update") as HTMLElement;
  
  function showButton() {
    nameChangeButton.classList.add("name-change-button-show")
    noticeText.classList.add("update-hide")
  }
  function hideButton() {
    nameChangeButton.classList.remove("name-change-button-show")
    noticeText.classList.remove("update-hide")
  }
  function changeName() {
    var userVersion = playerName.innerHTML;

    if (userVersion.length == 0) {

      playerName.innerHTML = playerNameOrig;
      noticeText.innerHTML = "try again";

      } else {

        localStorage.userEdits = userVersion;
        noticeText.innerHTML = "name changed";
        setTimeout(function() {noticeText.classList.add("update-hide")}, 1500)
      }
    }

    nameChangeButton.addEventListener("click", changeName)
    playerName.addEventListener("click", showButton)
    nameChangeButton.addEventListener("click", hideButton)

});

