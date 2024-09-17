window.onload = function() {
  loadSettings();
};

// Load settings from localStorage
function loadSettings() {
  // Load camera angle from localStorage
  const savedAngle = localStorage.getItem('cameraAngle');

  // ตรวจสอบถ้ามีค่าใน localStorage ให้เลือกอันเดิม
  if (savedAngle) {
    document.querySelector(`input[name="cameraAngles"][value="${savedAngle}"]`).checked = true;
  } else {
    // ถ้าไม่มีค่า ให้เลือก 8 มุม ทั่วสนาม เป็นค่าเริ่มต้น
    document.getElementById('option1').checked = true;
  }

  // Load intervalTime, blinkTimeCell1, and blinkTimeCell2 from localStorage
  var intervalTime = localStorage.getItem('intervalTime')/(1000*60);
  var blinkTimeCell1 = localStorage.getItem('blinkTimeCell1')/1000;
  var blinkTimeCell2 = localStorage.getItem('blinkTimeCell2')/1000;

  // Set values to the input elements
  document.getElementById('intervalTime').value = intervalTime || '5';
  document.getElementById('blinkTimeCell1').value = blinkTimeCell1 || '3';
  document.getElementById('blinkTimeCell2').value = blinkTimeCell2 || '2';

  // Display values in labels
  updateLabel('intervalTimeLabel', 'intervalTime', 'ระยะเวลารวม ', ' นาที (ตำ่สูง 1 นาที สูงสุด 15 นาที)');
  updateLabel('blinkTimeCell1Label', 'blinkTimeCell1', 'ระยะเวลาเตรียมตัวกลางคอร์ท ', ' วินาที (ตำ่สุด 1 วินาที สูงสุด 5 วินาที)');
  updateLabel('blinkTimeCell2Label', 'blinkTimeCell2', 'ระยะเวลาวิ่งไป-กลับ ', ' วินาที (ตำ่สุด 1 วินาที สูงสุด 5 วินาที)');

  setCameraPositions(); // Update positions based on the loaded camera angle
}

function setSettings() {
  // ดึงค่าจาก input elements
  var intervalTime = document.getElementById('intervalTime').value * 1000 * 60;
  var blinkTimeCell1 = document.getElementById('blinkTimeCell1').value * 1000;
  var blinkTimeCell2 = document.getElementById('blinkTimeCell2').value * 1000;
  var cameraAngle = document.querySelector('input[name="cameraAngles"]:checked').value;

  // บันทึกค่าลงใน localStorage
  localStorage.setItem('intervalTime', intervalTime);
  localStorage.setItem('blinkTimeCell1', blinkTimeCell1);
  localStorage.setItem('blinkTimeCell2', blinkTimeCell2);
  localStorage.setItem('cameraAngle', cameraAngle);

  setCameraPositions(); // Update positions based on the selected camera angle
  window.location.href = 'index.html';}

function updateLabel(labelId, inputId, textA, textB) {
  var label = document.getElementById(labelId);
  var input = document.getElementById(inputId);
  label.textContent = textA + input.value + textB;

}

function setCameraPositions() {
  var cameraAngle = document.querySelector('input[name="cameraAngles"]:checked').value;
  let positions;

  if (cameraAngle === "8 มุม ทั่วสนาม") {
    positions = [
      [0, 0], [0, 1], [0, 2], 
      [1, 0],         [1, 2], 
      [2, 0], [2, 1], [2, 2]
    ];
  } else if (cameraAngle === "6 มุม") {
    positions = [
      [0, 0],         [0, 2], 
      [1, 0],         [1, 2], 
      [2, 0],         [2, 2]
    ];
  } else if (cameraAngle === "5 มุม ด้านหน้ากับด้านข้าง") {
    positions = [
      [0, 0], [0, 1], [0, 2], 
      [1, 0], [1, 2]
    ];
  } else if (cameraAngle === "4 มุม") {
    positions = [
      [0, 0],         [0, 2], 

      [2, 0],         [2, 2]
    ];
  } else if (cameraAngle === "2 มุม ซ้ายขวา") {
    positions = [

      [1, 0],         [1, 2]

    ];
  } else if (cameraAngle === "2 มุม หน้าหลัง") {
    positions = [
              [0, 1], 
 
              [2, 1]
    ]
  }

  console.log('Positions set to:', positions);
  
  // แปลง positions เป็น JSON แล้วบันทึกลงใน localStorage
  localStorage.setItem('positions', JSON.stringify(positions));
  localStorage.setItem('cameraAngle', cameraAngle);
  
  console.log('Positions saved:', JSON.stringify(positions));
  console.log('Selected angle saved:', cameraAngle);
}
