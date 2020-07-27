$("#navbar").load("navbar.html");
$("#footer").load("footer.html", function () {
  var dt = new Date();
  var year = dt.getFullYear();

  let footerP = document.querySelector("footer");
  footerP.innerHTML = `&copy;Copyright Tuan Trung Nguyen ${year}`;
});

const API_URL = "https://trackme-ashy.vercel.app/api";
const currentUser = localStorage.getItem("user");

if (currentUser) {
  $.get(`${API_URL}/users/${currentUser}/devices`)
    .then((response) => {
      response.forEach((device) => {
        $("#devices tbody").append(`
        <tr data-device-id = ${device._id}>
          <td>${device.user}</td>
          <td>${device.name}</td>
        </tr>`);
      });

      $("#devices tbody tr").on("click", (e) => {
        const deviceId = e.currentTarget.getAttribute("data-device-id");
        $.get(`${API_URL}/devices/${deviceId}/device-history`).then(
          (response) => {
            response.map((sensorData) => {
              $("#historyContent").append(`
              <tr>
                <td>${sensorData.ts}</td>
                <td>${sensorData.temp}</td>
                <td>${sensorData.loc.lat}</td>
                <td>${sensorData.loc.lon}</td>
                </tr>`);
            });
            $("#historyModal").modal("show");
          }
        );
      });
    })
    .catch((err) => {
      console.log(`Error: ${error}`);
    });
} else {
  const path = window.location.pathname;
  if (path !== "/login" && path !== "/registration") {
    location.href = "/login";
  }
}

$.get(`${API_URL}/devices`)
  .then((response) => {
    response.forEach((device) => {
      $("#devices tbody").append(`
      <tr>
        <td>${device.user}</td>
        <td>${device.name}</td>
      </tr>`);
    });
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });

// Adding devices
$("#add-device").on("click", function (e) {
  e.preventDefault();
  const user = $("#user").val();
  const name = $("#name").val();
  const sensorData = [];

  const body = {
    name,
    user,
    sensorData,
  };

  $.post("`${API_URL}/devices`", body)
    .then((response) => {
      location.href = "/";
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
});

//Send Command
$("#send-command").on("click", function () {
  e.preventDefault();
  const command = $("#command").val();
  console.log(`command is: ${command}`);
});

//Register user
$("#add-user").on("click", function (e) {
  e.preventDefault();
  const userName = $("#UserName").val();
  const Password = $("#Password").val();
  const rePassword = $("#re-Password").val();

  if (Password !== rePassword) {
    console.log(Password);
    console.log(rePassword);
    const message = document.getElementById("Identify-message");
    message.innerHTML = `Password doesnt match !!`;
  } else {
    $.post(`${API_URL}/registration`, {
      name: userName,
      password: Password,
    }).then((response) => {
      if (response.success) {
        location.href = "/login";
      } else {
        const failMessage = document.getElementById("Fail-message");
        failMessage.innerHTML = `Username has already existed`;
      }
    });
  }
});

//Login
$("#login").on("click", function (e) {
  e.preventDefault();
  const userLogin = $("#UserNameLogin").val();
  const passwordLogin = $("#PasswordLogin").val();

  $.post(`${API_URL}/authenticate`, {
    name: userLogin,
    password: passwordLogin,
  }).then((response) => {
    console.log(response);
    if (response.success) {
      localStorage.setItem("user", userLogin);
      localStorage.setItem("isAdmin", response.isAdmin);
      location.href = "/";
    } else {
      $("FailMessage").append(
        `<p> class = "alert alert-danger">${response}</p>`
      );
      const failedLogin = document.getElementById("FailMessage");
      failedLogin.innerHTML = `UserName or Password incorrect`;
    }
  });
});

const logout = () => {
  localStorage.removeItem("user");
  location.href = "/login";
};
