let projects;
let tasklists;

async function getProjects() {
    var projects;
    await fetch("https://app.paymoapp.com/api/projects/", {
            headers: {
                "X-Session": "5059fe5ba060edfd2e29cf241a40d1fd"
            },
        })
        .then(res =>
            res.json()
        )
        .then(data => {
            projects = data;
        })

    return projects;
}


async function getTasklist() {
    var tasklists;
    await fetch("https://app.paymoapp.com/api/tasklists/", {
            headers: {
                "X-Session": "5059fe5ba060edfd2e29cf241a40d1fd"
            },
        })
        .then(res => res.json())
        .then(data => {
            tasklists = data;
        })

    return tasklists;
}


async function getTask() {
    var tasks;
    await fetch("https://app.paymoapp.com/api/tasks/", {
            headers: {
                "X-Session": "5059fe5ba060edfd2e29cf241a40d1fd"
            },
        })
        .then(res => res.json())
        .then(data => {
            tasks = data;
        })

    return tasks;
}
let tree = document.querySelector("#tree");
async function createTree() {
    let projects, tasklists, tasks;
    await getProjects().then((res) => {
        projects = res.projects;
    });
    await getTasklist().then((res) => {
        tasklists = res.tasklists;
    });
    await getTask().then((res) => {
        tasks = res.tasks;
    })

    let elements = {};
    projects.forEach(el => {
        el.tasklists = {};
        elements[el.id] = el;
    });

    tasklists.forEach(el => {
        el.tasks = {};
        elements[el.project_id].tasklists[el.id] = el;
    })
    tasks.forEach(el => {
        elements[el.project_id].tasklists[el.tasklist_id].tasks[el.id] = el;
    })
    console.log(elements);
    let ul = document.createElement("UL");
    tree.appendChild(ul);

    for (const [key, project] of Object.entries(elements)) {
        console.log(project.name);
        let li = document.createElement("LI");
        li.innerHTML = project.name;
        let ul2 = document.createElement("UL");
        for (const [key, tasklist] of Object.entries(project.tasklists)) {
            console.log("  " + tasklist.name);
            let li2 = document.createElement("LI");
            li2.innerHTML = tasklist.name;
            let ul3 = document.createElement("UL");
            for (const [key, task] of Object.entries(tasklist.tasks)) {
                console.log("    " + task.name);
                let li3 = document.createElement("LI");
                li3.innerHTML = task.name;
                ul3.appendChild(li3);
            }
            ul2.appendChild(li2);
            ul2.appendChild(ul3);
        }
        ul.appendChild(li);
        ul.appendChild(ul2);
    }
}


createTree();