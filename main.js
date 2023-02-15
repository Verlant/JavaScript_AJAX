let nav = document.querySelector("nav");
let header = document.querySelector("header");
let main = document.querySelector("main");
let ol = document.createElement("ol");
nav.appendChild(ol);

function listUsers(jsonObj) {
  for (let i = 0; i < jsonObj.length; i++) {
    let nom = jsonObj[i].name;
    let user = document.createElement("li");
    user.setAttribute("data-id", jsonObj[i].id);
    let icon = document.createElement("img");
    icon.setAttribute("src", "user_header.png");
    user.textContent = nom;
    user.prepend(icon);
    ol.appendChild(user);
  }
}

function setUserDataHeader(jsonObj) {
  while (header.hasChildNodes()) {
    header.removeChild(header.lastChild);
  }

  const NAME = jsonObj.name;
  const USERNAME = jsonObj.username;
  const EMAIL = jsonObj.email;
  const PHONE = jsonObj.phone;

  const IMG = document.createElement("img");
  IMG.setAttribute("src", "user_header.png");
  header.appendChild(IMG);

  const CONTAINER = document.createElement("div");
  CONTAINER.setAttribute("class", "user-data");
  header.appendChild(CONTAINER);

  const H1_NAME = document.createElement("h1");
  H1_NAME.textContent = NAME;
  CONTAINER.appendChild(H1_NAME);

  const SPAN_USERNAME = document.createElement("span");
  SPAN_USERNAME.textContent = USERNAME;
  H1_NAME.appendChild(SPAN_USERNAME);

  const H2_EMAIL = document.createElement("H2");
  H2_EMAIL.textContent = jsonObj.email;
  CONTAINER.appendChild(H2_EMAIL);

  const H3_PHONE = document.createElement("h3");
  H3_PHONE.textContent = jsonObj.phone;
  CONTAINER.appendChild(H3_PHONE);
}

function print_dataUser(nodeElement, nodesList, jsonObj) {
  nodesList.forEach((element) => {
    element.classList.remove("JS-bg-active");
  });
  nodeElement.classList.add("JS-bg-active");
  userId = nodeElement.getAttribute("data-id");
  setUserDataHeader(jsonObj[userId - 1]);
}

function listPosts(jsonObj, nodeElement) {
  while (main.hasChildNodes()) {
    main.removeChild(main.lastChild);
  }
  jsonObj.forEach((element) => {
    userId = nodeElement.getAttribute("data-id");

    if (element.userId == userId) {
      const DIV_COMMENT = document.createElement("div");
      DIV_COMMENT.setAttribute("class", "user-comment");
      const H4 = document.createElement("h4");
      H4.setAttribute("class", "title");
      H4.textContent = element.title;
      DIV_COMMENT.appendChild(H4);

      const DIV_BODY = document.createElement("div");
      DIV_BODY.setAttribute("class", "body");
      DIV_BODY.textContent = element.body;
      DIV_COMMENT.appendChild(DIV_BODY);

      main.appendChild(DIV_COMMENT);
    }
  });
}

async function getDataUsers(params) {
  return fetch("https://jsonplaceholder.typicode.com/users").then(function (
    response
  ) {
    return response.json();
  });
}

async function getDataPostsUsers() {
  return fetch("https://jsonplaceholder.typicode.com/posts").then(function (
    response
  ) {
    return response.json();
  });
}

async function foo() {
  jsonDataUsers = await getDataUsers();
  jsonDataPostsUsers = await getDataPostsUsers();
  listUsers(jsonDataUsers);
  const ALL_BUTTONS = document.querySelectorAll("li");

  ALL_BUTTONS.forEach((element) => {
    element.addEventListener("click", (e) => {
      print_dataUser(element, ALL_BUTTONS, jsonDataUsers);
      listPosts(jsonDataPostsUsers, element);
    });
  });
}

foo();
