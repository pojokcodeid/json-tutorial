let myfunction = async () => {
  try {
    await fetch("http://localhost:3000/employees")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  } catch (e) {
    console.log(e);
  }
};

myfunction();

let xhr = new XMLHttpRequest();
xhr.open("GET", "./file/myfile.json", true);
xhr.send();
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    let data = JSON.parse(xhr.responseText);
    console.log(data);
  }
};

$.getJSON("./file/myfile.json", function (data) {
  console.log(data);
});
