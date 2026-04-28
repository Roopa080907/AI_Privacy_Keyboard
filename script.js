function analyzeMessage() {
  let text = document.getElementById("inputBox").value;

  let risk = 0;
  let warning = "";

  let emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+/;
  let phonePattern = /\d{10}/;

  let safeVersion = text;

  // EMAIL
  if (emailPattern.test(text)) {
    risk++;
    warning += "Email detected. ";
    safeVersion = safeVersion.replace(emailPattern, "****@gmail.com");
  }

  // PHONE
  if (phonePattern.test(text)) {
    risk++;
    warning += "Phone detected. ";
    safeVersion = safeVersion.replace(phonePattern, "98XXXXXX10");
  }

  // OTP / PASSWORD
  if (
    text.toLowerCase().includes("otp") ||
    text.toLowerCase().includes("password") ||
    text.toLowerCase().includes("pin")
  ) {
    risk += 2;
    warning += "Sensitive info detected. ";
  }

  // WARNING TEXT
  let warningBox = document.getElementById("warning");

  if (risk === 0) {
    warningBox.innerHTML = "🟢 Safe Message";
  } else if (risk === 1) {
    warningBox.innerHTML = "🟡 Caution: " + warning;
  } else {
    warningBox.innerHTML = "🔴 HIGH RISK: " + warning;
    showPopup("⚠ Privacy Risk Detected!");
  }

  // RISK METER
  let meter = document.getElementById("meterFill");

  if (risk === 0) {
    meter.style.width = "10%";
    meter.style.background = "green";
  } else if (risk === 1) {
    meter.style.width = "50%";
    meter.style.background = "orange";
  } else {
    meter.style.width = "100%";
    meter.style.background = "red";
  }

  // SAFE VERSION
  document.getElementById("safeMsg").innerHTML =
    "<b>Safe Version:</b><br>" + safeVersion;
}

// SEND MESSAGE
function sendMessage() {
  let text = document.getElementById("inputBox").value;
  let chatBox = document.getElementById("chatBox");

  let msg = document.createElement("div");
  msg.classList.add("msg", "user");
  msg.innerHTML = text;

  chatBox.appendChild(msg);

  document.getElementById("inputBox").value = "";
  document.getElementById("warning").innerHTML = "";
  document.getElementById("safeMsg").innerHTML = "";
}

// POPUP
function showPopup(msg) {
  let div = document.createElement("div");
  div.className = "popup";
  div.innerText = msg;
  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 2000);
}