// 與初始化頁面內容、展現task有關

function addMainRegion (){
    const main = document.createElement("div");
    main.classList.add("main");
    document.body.appendChild(main);
}

function addHeaderRegion (){
    const main = document.querySelector(".main");

    const header = document.createElement("div");
    header.classList.add("header");
    main.appendChild(header);

    const hTitle = document.createElement("h1");
    hTitle.classList.add("hTitle");
    hTitle.textContent = "ToDo";
    header.appendChild(hTitle);
}

function addSidebarRegion (){
    const main = document.querySelector(".main");

    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");
    main.appendChild(sidebar);

    const category = document.createElement("div");
    category.classList.add("category");
    const projects = document.createElement("div");
    projects.classList.add("projects");
    sidebar.append(category, projects);

    const categoryBtns = document.createElement("h2");
    categoryBtns.classList.add("sTitle");
    categoryBtns.textContent = "Category";
    const today = document.createElement("button");
    today.id = "today";
    today.textContent = "Today";
    const week = document.createElement("button");
    week.id = "week";
    week.textContent = "Week";
    const completed = document.createElement("button");
    completed.id = "completed";
    completed.textContent = "Completed";
    const all = document.createElement("button");
    all.id = "all";
    all.textContent = "All";
    category.append(categoryBtns, today, week, completed, all);

    const projectsBtns = document.createElement("h2");
    projectsBtns.classList.add("sTitle");
    projectsBtns.textContent = "Projects";
    projects.appendChild(projectsBtns);
}

function addContentRegion(){
    const main = document.querySelector(".main");

    const content = document.createElement("div");
    content.classList.add("content");
    main.appendChild(content);

    const tasks = document.createElement("div");
    tasks.classList.add("tasks");
    content.appendChild(tasks);
}

export function loadInitialLayout(){
    addMainRegion();
    addHeaderRegion();
    addSidebarRegion();
    addContentRegion();
}