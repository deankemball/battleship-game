document.addEventListener("DOMContentLoaded", () => {
  const player1Grid = document.getElementById("player-1-field") as HTMLElement;
  const player2Grid = document.getElementById("player-2-field") as HTMLElement;

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
});