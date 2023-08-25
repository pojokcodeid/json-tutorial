const showList = async () => {
  await fetch("file/myfile.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      createList(data);
    });
};
showList();

function createList(data) {
  const mainUl = document.createElement("ol");
  for (let i = 0; i < data.result.length; i++) {
    const studentLi = document.createElement("li");
    studentLi.innerHTML = data.result[i].name;

    const marksUl = document.createElement("ul");
    for (var key in data.result[i].marks) {
      const marksLi = document.createElement("li");
      marksLi.innerHTML = key + ":" + data.result[i].marks[key];
      marksUl.appendChild(marksLi);
    }

    studentLi.appendChild(marksUl);
    mainUl.appendChild(studentLi);
  }
  document.body.appendChild(mainUl);
}
