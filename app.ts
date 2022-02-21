document.addEventListener("DOMContentLoaded", () => {
  const player1Grid = document.getElementById("player-1-field") as HTMLElement;
  const player2Grid = document.getElementById("player-2-field") as HTMLElement;
  const rotateButton = document.getElementById("rotate-button") as HTMLElement;
  const shipsContainer = document.getElementById("player-1-ships") as HTMLElement;
  const shipsContainerClass = shipsContainer.className;
  const nameChangeButton = document.getElementById("name-change-button") as HTMLElement;
  var playerName = document.getElementById("player-1-name") as HTMLElement;
  var playerNameOrig = "CADET";
  var noticeText = document.getElementById("update") as HTMLElement;
  
  const gridChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

  for (let i = 0; i < gridChars.length; i++) {
    for (let j = 1; j <= 10; j++) {
      const player1Id = `player-1-${gridChars[i]}-${j}`
      const player2Id = `player-2-${gridChars[i]}-${j}`

      const player1Square = document.createElement('div');
      player1Square.id = player1Id;
      
      const player2Square = document.createElement('div');
      player2Square.id = player2Id;

      player1Grid.appendChild(player1Square);
      player2Grid.appendChild(player2Square);
    }
    
  }

  function rotateShip() {
    shipsContainer.classList.toggle(`${shipsContainerClass}-vertical`);

    const ships = shipsContainer?.children as HTMLCollection;
    const shipsArray = Array.from(ships);

    shipsArray.forEach((ship) => {
      const shipSpecificClass = ship.className.split(" ")[1]
      ship.classList.toggle(`${shipSpecificClass}-vertical`);
    })
  }

  rotateButton.addEventListener("click", rotateShip)
  
  function changeName() {
    var userVersion = playerName.innerHTML;

    if (userVersion.length == 0) {

      playerName.innerHTML = playerNameOrig;
      noticeText.innerHTML = "try again";

      } else {

        localStorage.userEdits = userVersion;
        noticeText.innerHTML = "name changed";

      }
    }

    function showButton() {
      nameChangeButton.classList.add("name-change-button-show")
      noticeText.classList.add("update-hide")
    }
    function hideButton() {
      nameChangeButton.classList.remove("name-change-button-show")
      noticeText.classList.remove("update-hide")
    }

    nameChangeButton.addEventListener("click", changeName)
    playerName.addEventListener("click", showButton)
    nameChangeButton.addEventListener("click", hideButton)

    
    // window.onclick = function(event) {
    //   if  (!event.target.classList.contains("mainButton") &&
    //     dropdown.classList.contains("show")
    //   ) {
    //     dropdown.classList.remove("show");
    //   }
    // }


  //   window.onload = () => {
  //     var modal = document.getElementById('player-1-name') as HTMLElement;
  //     // When the user clicks anywhere outside of the modal, save name
  //     window.addEventListener('click', function (event) {
  //         if (event.target !== modal) {
  //           console.log("outside");
  //             changeName();
  //         }
  //     });
  // }

});