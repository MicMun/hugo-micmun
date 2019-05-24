function setLosungText() {
   if (window.File && window.FileReader) {
      var year = getCurrentYear();
      // read the losungen from the current year
      readJSON(`/losungen/Losungen${year}.json`);
   } else {
      document.getElementById("losung").innerHTML = "Keine Losung verfügbar!";
   }
}

// reads the JSON from path
function readJSON(path) {
   var xhr = new XMLHttpRequest();
   xhr.open('GET', path, true);
   xhr.responseType = 'blob';
   xhr.onload = function(e) {
      if (this.status == 200) {
         var file = new File([this.response], 'temp');
         var fileReader = new FileReader();
         fileReader.addEventListener('load', fileReaded);
         fileReader.readAsText(file);
      }
   }
   xhr.send();
}

// when the file is readed, show the right text
function fileReaded(event) {
   var data = JSON.parse(event.target.result);
   var currentData = data[0];
   var today = getTodayAsString();

   // search the current losung
   for (d in data) {
      if (data[d].date == today) {
         currentData = data[d];
         break;
      }
   }

   var losung = `${currentData.weekday}, ${currentData.date} <br>` +
                `${currentData.text1} <br><br>${currentData.text2} <br><br>`;

   document.getElementById("losung").innerHTML = losung;
}

// Returns the current year
function getCurrentYear() {
   var today = new Date(Date.now());
   return today.getFullYear();
}

// returns the current date as string
function getTodayAsString() {
   var today = new Date(Date.now());
   var day = today.getDate();
   var month = today.getMonth()+1;
   var year = today.getFullYear();

   return zfill(day, 2) + "." + zfill(month, 2) + "." + zfill(year, 4);
}

// fills a number with leading zeros
function zfill(num, len) {
   return (Array(len).join("0") + num).slice(-len);
}

window.addEventListener("load", setLosungText);
