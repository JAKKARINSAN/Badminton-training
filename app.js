var intervalTime, blinkTimeCell1, blinkTimeCell2, positions;

window.onload = function() {
    // Retrieve data from Local Storage or set defaults
    intervalTime = localStorage.getItem('intervalTime') || '60000';
    blinkTimeCell1 = localStorage.getItem('blinkTimeCell1') || '3000';
    blinkTimeCell2 = localStorage.getItem('blinkTimeCell2') || '2000';
    positions = JSON.parse(localStorage.getItem('positions')) || [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 2],
        [2, 0], [2, 1], [2, 2]
    ];

    console.log(intervalTime, blinkTimeCell1, blinkTimeCell2);

    // Start blinking cells
    blinkCell();

    // Continue blinking at intervals
    var intervalID = setInterval(blinkCell, parseInt(blinkTimeCell1) + parseInt(blinkTimeCell2));

    // Stop blinking after intervalTime
    setTimeout(function() {
        clearInterval(intervalID);
        window.location.href = 'setting.html';
    }, parseInt(intervalTime));
};

function blinkCell() {
    var table = document.getElementById("myTable");
    if (!table) {
        console.error("Table not found!");
        return;
    }

    var cell1 = table.rows[1].cells[1];
    var randomCell = getRandomElementPosition();
    var cell2 = table.rows[randomCell[0]].cells[randomCell[1]];

    blink(cell1, blinkTimeCell1, function() {
        blink(cell2, blinkTimeCell2, function() {
        });
    });
}

function blink(cell, duration, callback) {
    cell.style.backgroundColor = "red";
    var n = 0;
    var blinkInterval = setInterval(function() {
        n += 500;
        if (n >= duration - 1000) {
            cell.style.backgroundColor = "orange";
        } else {
            cell.style.backgroundColor = (cell.style.backgroundColor === "red" || cell.style.backgroundColor === "orange") ? "white" : "red";
        }
    }, 500);

    setTimeout(function() {
        clearInterval(blinkInterval);
        cell.style.backgroundColor = "white";
        if (callback) callback();
    }, duration);
}

function getRandomElementPosition() {
    let randomIndex = Math.floor(Math.random() * positions.length);
    return positions[randomIndex];
}
function openSettingPage() {
    window.location.href = 'setting.html'; // เปลี่ยนเส้นทางไปยังหน้า setting.html
  }
