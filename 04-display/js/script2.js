async function showJsonToTable() {
  await fetch("file/data.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((object) => {
        let tr = document.createElement("tr");

        for (let property in object) {
          let td = document.createElement("td");
          td.textContent = object[property];
          tr.appendChild(td);
        }
        document
          .getElementById("myTable")
          .querySelector("tbody")
          .appendChild(tr);
      });
    })
    .catch((err) => console.log(err));
}
