// Function to compare player's points to the stored average
function comparePoints(event) {
  event.preventDefault(); // Prevent form submission

  // Get the player name and test points from the form
  const playerName = document.getElementById('player-name').value;
  const testPoints = parseInt(document.getElementById('test-points').value);

  // Fetch the CSV file containing player data
  fetch('player_data.csv')
    .then(response => response.text())
    .then(data => {
      // Use PapaParse to parse the CSV data
      const parsedData = Papa.parse(data, { header: true });
      console.log(parsedData.data); // Log the parsed CSV data

      const players = {};

      // Iterate through each row of the parsed CSV data
      parsedData.data.forEach(row => {
        const name = row.NAME;
        const average = parseFloat(row.PPG);
        players[name] = average;
      });

      console.log(players); // Log the players object

      // Check if the player exists in the data
      if (players.hasOwnProperty(playerName)) {
        const playerAverage = players[playerName];
        const result = testPoints > playerAverage ? 'over' : 'under';

        document.getElementById('result').textContent = `The test points for ${playerName} is ${result} their seasonal average of (${playerAverage}), therefore you should not take the ${result} on this line.`;
      } else {
        document.getElementById('result').textContent = `Player '${playerName}' not found in the data.`;
      }
    })
    .catch(error => {
      console.log('Error fetching player data:', error);
    });
}

// Add event listener to the compare button
const compareBtn = document.getElementById('compare-btn');
compareBtn.addEventListener('click', comparePoints);

// Add event listener to ensure the DOM is loaded before adding the button event listener
document.addEventListener('DOMContentLoaded', () => {
  compareBtn.addEventListener('click', comparePoints);
});
