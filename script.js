// LOGIN
function login() {
  let u = document.getElementById("username").value;
  let p = document.getElementById("password").value;

  if (u === "rit" && p === "123") {
    window.location.href = "vehicle.html";
  } else {
    document.getElementById("error").innerText = "Invalid Login!";
  }
}

// VEHICLE SELECT
function selectVehicle(type) {
  localStorage.setItem("vehicle", type);
  window.location.href = "parking.html";
}

// PARKING DATA
let data = {
  two: {
    A: [0,0,1,0,1],
    B: [0,1,0,0]
  },
  four: {
    C: [0,1,0],
    D: [1,0,0]
  }
};

// LOAD PARKING PAGE
if (window.location.pathname.includes("parking.html")) {
  loadParking();
}

function loadParking() {
  let type = localStorage.getItem("vehicle");
  document.getElementById("title").innerText = type === "two" ? "Two Wheeler Parking" : "Four Wheeler Parking";

  let zonesDiv = document.getElementById("zones");

  for (let zone in data[type]) {
    let zoneTitle = document.createElement("h3");
    zoneTitle.innerText = "Zone " + zone;
    zonesDiv.appendChild(zoneTitle);

    data[type][zone].forEach((val, index) => {
      let slot = document.createElement("div");
      slot.className = "slot " + (val === 0 ? "free" : "occupied");
      slot.innerText = index + 1;

      slot.onclick = function () {
        data[type][zone][index] = val === 0 ? 1 : 0;
        location.reload();
      };

      zonesDiv.appendChild(slot);
    });
  }

  updateDashboard(type);
}

// DASHBOARD
function updateDashboard(type) {
  let total = 0, occupied = 0;

  for (let zone in data[type]) {
    total += data[type][zone].length;
    occupied += data[type][zone].filter(x => x === 1).length;
  }

  let free = total - occupied;

  document.getElementById("dashboard").innerHTML =
    `Total: ${total} | Occupied: ${occupied} | Free: ${free}`;
}
