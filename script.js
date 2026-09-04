const localeStorageKey = 'TASKARRAY';
let taskArray = JSON.parse(localStorage.getItem(localeStorageKey)) || [];
let editedTask = null;

const priorityObj = {
    'high' : 3,
    'medium' : 2,
    'low' : 1
}

const projectFilter = document.getElementById('projectFilter');
const taskEmptyState = document.getElementById('taskEmptyState');

document.addEventListener('DOMContentLoaded' , () => {
    
    const projectsArray = ['Personal' , 'College' , 'Web-Development' , 'Python' , 'DSA'];

    projectsArray.forEach(option => {
        const html = `<option value="${option.toLowerCase()}">${option}</option>`;
        projectFilter.insertAdjacentHTML('beforeend', html);
    });

    taskEmptyState.style.display = 'block';

    renderProjectsProgress();
    renderRecentTasks();
    renderTasksInfo();
    sortTasksArray();
    renderTasksPriorityDetails();
    displayProjectsProgress();

    renderProjectsView();
})

const addTaskButton = document.getElementById('addTaskButton');
const taskModal = document.getElementById('taskModal');

addTaskButton.addEventListener('click' , () => {

    taskModal.style.display = 'flex';
    changeTaskModalUI('add');

    resetErrors();

})

const closeModal = document.getElementById('closeModal');
const cancelTask = document.getElementById('cancelTask');

closeModal.addEventListener('click' , () => {

    taskModal.style.display = 'none';
    resetErrors();
    resetInputs();
})

cancelTask.addEventListener('click' , () => {

    taskModal.style.display = 'none';
    resetErrors();
    resetInputs();
})

const modalTitle = document.getElementById('modalTitle');
const saveTask = document.getElementById('saveTask');

function changeTaskModalUI(sourceButton) {

    if (sourceButton === 'add') {

        modalTitle.textContent = `Add Task`;
        saveTask.innerText = `Save Task`;
        
    }
    
    else {
        
        modalTitle.textContent = `Edit Task`;
        saveTask.innerText = `Update Task`;
    }
}

saveTask.addEventListener('click' , (e) => {

    e.preventDefault();

    resetErrors();
    validateAllInputs();

})

const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskProject = document.getElementById('taskProject');
const taskPriority = document.getElementById('taskPriority');
const taskStatus = document.getElementById('taskStatus');
const taskDueDate = document.getElementById('taskDueDate');


const taskTitleError = document.getElementById('taskTitleError');
const taskDescriptionError = document.getElementById('taskDescriptionError');
const taskProjectError = document.getElementById('taskProjectError');
const taskPriorityError = document.getElementById('taskPriorityError');
const taskDueDateError = document.getElementById('taskDueDateError');

function validateAllInputs() {

    let inputTitle = taskTitle.value.trim()

    let [title , titleError] = validateTitle(inputTitle);

    if (titleError !== null) {
        taskTitleError.textContent = titleError;
        return;
    }

    let inputDescription = taskDescription.value.trim();

    let [description , descriptionError] = validateDescription(inputDescription);

    if (descriptionError !== null) {
        taskDescriptionError.textContent = descriptionError;
        return;
    }

    let inputTask = taskProject.value;

    let [task , taskError] = validateTaskProjects(inputTask);

    if (taskError !== null) {
        taskProjectError.textContent = taskError;
        return;
    }

    let inputPriority = taskPriority.value;

    let [priority , priorityError] = validateTaskPriority(inputPriority);

    if (priorityError !== null) {
        taskPriorityError.textContent = priorityError;
        return;
    }

    let inputTaskStatus = taskStatus.value;

    let inputDueDate = taskDueDate.value;

    let [dueDate , dueDateError] = validateDueDate(inputDueDate);

    if (dueDateError !== null) {
        taskDueDateError.textContent = dueDateError;
        return;
    }

    const currentDate = getCurrentDate();

    if (editedTask === null) {

        taskArray.push({

            'title' : title,
            'description' : description,
            'task' : task,
            'priority' : priority,
            'status' : inputTaskStatus,
            'dueDate' : dueDate,
            'date' : currentDate
        })

        localStorage.setItem(localeStorageKey, JSON.stringify(taskArray));

    }

    else {

        const index = taskArray.indexOf(editedTask);

        taskArray[index] = {

            'title' : title,
            'description' : description,
            'task' : task,
            'priority' : priority,
            'status' : inputTaskStatus,
            'dueDate' : dueDate,
            'date' : editedTask.date
        }

        localStorage.setItem(localeStorageKey, JSON.stringify(taskArray));
        editedTask = null;
        
    }

    resetErrors();
    resetInputs();

    renderTasksInfo();
    renderTasksPriorityDetails();
    renderRecentTasks();
    sortTasksArray();

    renderProjectsProgress();
    displayProjectsProgress();

    renderProjectsView();
}

function validateDueDate(dateString) {

    if (!dateString) {
        return [null, "Due date is required."];
    }

    const chosenDate = new Date(dateString);
    
    if (isNaN(chosenDate.getTime())) {
        return [null, "Please enter a valid date format."];
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (chosenDate < today) {
        return [null, "Due date cannot be in the past."];
    }

    const year = chosenDate.getFullYear();
    const month = String(chosenDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(chosenDate.getDate()).padStart(2, '0');
    
    const formattedDate = `${year}/${month}/${day}`;

    return [formattedDate, null];
}

function getCurrentDate() {

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');

    const currentDate = `${year}/${month}/${day}`;

    return currentDate;
}



function validateTaskPriority(priority) {

    if (!priority) {
        return [null , 'Task Priority is required.'];
    }

    return [priority , null];
}

function validateTaskProjects(task) {

    if (!task) {
        return [null , 'Project Category is required.'];
    }

    return [task , null]
}

function validateDescription(description) {
    
    if (!description) {
        return [null , 'Description must be filled.'];
    }
    return [description , null]
}

function validateTitle(inputTitle) {
    
    if (!inputTitle) {
        return [null , 'Task Title is required'];
    }
    
    return [inputTitle , null]
}

function resetErrors() {

    taskTitleError.textContent = '';
    taskDescriptionError.textContent = '';
    taskProjectError.textContent = '';
    taskPriorityError.textContent = '';
    taskDueDateError.textContent = '';

}

function resetInputs() {

    taskTitle.value = '';
    taskDescription.value = '';
    taskProject.value = '';
    taskPriority.value = '';
    taskStatus.value = 'todo';
    taskDueDate.value = '';

}

const totalTasksBox = document.getElementById('totalTasks');
const completedTasksBox = document.getElementById('completedTasks');
const pendingTasksBox = document.getElementById('pendingTasks');
const completedTaskDescription = document.getElementById('completedTaskDescription');
const overdueTasks = document.getElementById('overdueTasks');

function renderTasksInfo() {

    totalTasksBox.textContent = taskArray.length;

    let completedTasks = 0;
    let inProgress = 0;
    let overDueTasksCount = 0;

    for (let task of taskArray) {

        if (getOverDueTasks(task)) {
            overDueTasksCount++;
        }
        
        if (task.status === 'completed') {
            completedTasks++;
        } else {
            inProgress++;
        }
    }

    const completionRate = getCompletionRate(completedTasks);

    completedTaskDescription.textContent = `${completionRate}% completion rate`;
    completedTasksBox.textContent = completedTasks;
    pendingTasksBox.textContent = inProgress;
    overdueTasks.textContent = overDueTasksCount;

}

function getOverDueTasks(task) {

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(task.dueDate.replace(/\//g, '-'));
    dueDate.setHours(0, 0, 0, 0);

    if (dueDate < today && task.status !== "completed") {
        return true;
    }

    return false;
}

function getCompletionRate(completedTasks) {

    if (taskArray.length === 0) {
        return 0;
    }

    return ((completedTasks / taskArray.length) * 100).toFixed(2);
}

const highPriorityCount = document.getElementById('highPriorityCount');
const mediumPriorityCount = document.getElementById('mediumPriorityCount');
const lowPriorityCount = document.getElementById('lowPriorityCount');

function renderTasksPriorityDetails() {
     
    let highCount = 0;
    let mediumCount = 0;
    let lowCount = 0;

    for (let task of taskArray) {
        
        if (task.priority === 'high') {
            highCount++;
        }

        else if (task.priority === 'medium') {
            mediumCount++;
        }

        else {
            lowCount++;
        }
    }

    highPriorityCount.textContent = highCount;
    mediumPriorityCount.textContent = mediumCount;
    lowPriorityCount.textContent = lowCount;
}

const themeButton = document.getElementById('themeButton');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');

let isDarkModeOn = false;

themeButton.addEventListener('click' , () => {

    if (!isDarkModeOn) {

        themeIcon.textContent = '⋆✴︎';
        themeText.textContent = 'Light Mode';

        isDarkModeOn = true;

    }

    else {

        themeIcon.textContent = '☾';
        themeText.textContent = 'Dark Mode';

        isDarkModeOn = false;

    }

    document.body.classList.toggle('dark-mode');

})

function renderRecentTasks() {

    let duplicateArray = [...taskArray];

    duplicateArray.sort((a , b) => {
        return new Date(b.date) - new Date(a.date);
    })

    if (duplicateArray.length > 5) {

        duplicateArray = duplicateArray.slice(0 , 5);
        displayRecentTasks(duplicateArray);
        return;

    }

    displayRecentTasks(duplicateArray);

}

const recentTasksContainer = document.getElementById('recentTasksContainer');
const emptyRecentTasks = document.getElementById('emptyRecentTasks');

function displayRecentTasks(duplicateArray) {

    recentTasksContainer.innerHTML = '';

    for (let task of duplicateArray) {

        let taskCard = document.createElement('div');

        let statusText = convertStatusTextToDisplay(task.status);
        let priorityText = convertPriorityTextToDisplay(task.priority);
        let projectText = convertProjectTextToDisplay(task.task);

        taskCard.classList.add('recent-task-item');

        taskCard.innerHTML = `
        
        <div class="recent-task-info">
            <h3>${task.title}</h3>
            <p>${projectText}</p>
        </div>

        <div class="recent-task-meta">
            <span class="status-badge ${task.status}">${statusText}</span>
            <span class="priority-badge ${task.priority}">${priorityText}</span>
        </div>

        `;

        recentTasksContainer.appendChild(taskCard);
    }

    if (recentTasksContainer.innerHTML === '') {
        emptyRecentTasks.hidden = false;
    } else {
        emptyRecentTasks.hidden = true;
    }
    
}

const viewAllTasks = document.getElementById('viewAllTasks');

viewAllTasks.addEventListener('click' , () => {

    viewSet('tasksView' , 'tasksNav')

})

const tasksNavButton = document.getElementById('tasksNav');

tasksNavButton.addEventListener('click' , () => {

    viewSet('tasksView' , 'tasksNav')
    
})

const dashboardNavButton = document.getElementById('dashboardNav');

dashboardNavButton.addEventListener('click' , () => {

    viewSet('dashboardView' , 'dashboardNav')
    
})

function viewSet(targetView , targetButton){

    const currentVisibleView = document.querySelector('.page-view.active-view');
    const targetVisibleView = document.getElementById(targetView);

    currentVisibleView.classList.remove('active-view');
    targetVisibleView.classList.add('active-view');
    
    const currentVisibleButton = document.querySelector('.nav-item.active');
    const targetVisibleButton = document.getElementById(targetButton);

    currentVisibleButton.classList.remove('active');
    targetVisibleButton.classList.add('active');
}

const taskSort = document.getElementById('taskSort');

const tasksContainer = document.getElementById('tasksContainer');

const taskCount = document.getElementById('taskCount');
let countOfTask = 0;

function sortTasksArray() {
    countOfTask = 0;

    tasksContainer.innerHTML = '';

    let duplicateArray = [...taskArray];

    const sortValue = taskSort.value;

    if (sortValue === 'newest') {

        duplicateArray.sort((a , b) => {
            return new Date(b.date) - new Date(a.date);
        })
    }

    else if (sortValue === 'oldest') {

        duplicateArray.sort((a , b) => {
            return new Date(a.date) - new Date(b.date);
        })
    }

    else if (sortValue === 'dueSoon') {

        duplicateArray.sort((a , b) => {
            return new Date(a.dueDate.replace(/\//g, '-')) -
                new Date(b.dueDate.replace(/\//g, '-'));
        })
    }
    
    else if (sortValue === 'dueLate') {

        duplicateArray.sort((a , b) => {
            return new Date(b.dueDate.replace(/\//g, '-')) -
                new Date(a.dueDate.replace(/\//g, '-'));
        })
    }

    else {
        duplicateArray.sort((a , b) => {
            return priorityObj[b.priority] - priorityObj[a.priority];
        })
    }

    filterByProjects(duplicateArray);

}

function filterByProjects(duplicateArray) {

    const filterValue = projectFilter.value;

    if (filterValue === 'all') {

        filterByPriority(duplicateArray);
        return;
    }

    duplicateArray = duplicateArray.filter(task => task.task === filterValue)

    filterByPriority(duplicateArray);
}

const priorityFilter = document.getElementById('priorityFilter');

function filterByPriority(duplicateArray) {

    const filterValue = priorityFilter.value;

    if (filterValue === 'all') {
        filterByStatus(duplicateArray);
        return;
    }

    duplicateArray = duplicateArray.filter(task => task.priority === filterValue);

    filterByStatus(duplicateArray);

}

const statusFilter = document.getElementById('statusFilter');

function filterByStatus(duplicateArray) {

    const filterValue = statusFilter.value;

    if (filterValue === 'all') {
        searchTasks(duplicateArray);
        return;
    }

    duplicateArray = duplicateArray.filter(task => task.status === filterValue);

    searchTasks(duplicateArray);

}

const taskSearch = document.getElementById('taskSearch');

function searchTasks(duplicateArray) {

    const searchValue = taskSearch.value.trim().toLowerCase();

    for (let task of duplicateArray) {

        if (task.title.toLowerCase().includes(searchValue)) {
            displayAllTasks(task);
            countOfTask++;
        }
    }

    if (tasksContainer.innerHTML === '') {
        taskEmptyState.style.display = 'block';
    } else {
        taskEmptyState.style.display = 'none';
    }

    updateTaskCount();
}

function updateTaskCount() {

    taskCount.textContent = `${countOfTask} Tasks`;

}

function convertDate(inputDate) {

    const dateObj = new Date(inputDate.replace(/\//g, '-'));

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }).format(dateObj);

    return formattedDate;
}

function convertPriorityTextToDisplay(text) {

    let priorityText;

    if (text === 'high') {
        priorityText = 'High';
    }

    else if (text === 'medium') {
        priorityText = 'Medium';
    }

    else {
        priorityText = 'Low';
    }

    return priorityText;

}

function convertStatusTextToDisplay(text) {

    let statusText;

    if (text === 'todo') {
        statusText = 'To Do';
    }

    else if (text === 'progress') {
        statusText = 'In Progress';
    }

    else {
        statusText = 'Completed';
    }

    return statusText;

}

function convertProjectTextToDisplay(text) {

    let projectText;

    if (text === 'dsa') {
        projectText = 'DSA';
    }
    else if (text === 'personal') {
        projectText = 'Personal';
    }
    else if (text === 'college') {
        projectText = 'College';
    }
    else if (text === 'web-development') {
        projectText = 'Web Development';
    }
    else if (text === 'python') {
        projectText = 'Python';
    }

    return projectText;
}


function displayAllTasks(task) {

    const parsedDate = convertDate(task.dueDate);

    let priorityText = convertPriorityTextToDisplay(task.priority);

    let statusText = convertStatusTextToDisplay(task.status);

    let projectText = convertProjectTextToDisplay(task.task);

    const priorityClass = task.priority;
    const statusClass = task.status;


    let taskCard = document.createElement('div');

    taskCard.classList.add('task-table-row');

    taskCard.innerHTML = `

        <div class="task-name">

            <div class="task-icon">
                ✓
            </div>

            <div class="task-name-content">

                <h3>
                    ${task.title}
                </h3>

                <p>
                    ${task.description}
                </p>

            </div>

        </div>


        <div class="task-project">
            ${projectText}
        </div>


        <div class="task-priority">

            <span class="priority-badge ${priorityClass}">
                ${priorityText}
            </span>

        </div>


        <div class="task-status">

            <span class="status-badge ${statusClass}">
                ${statusText}
            </span>

        </div>


        <div class="task-date">

            <span>
                ${parsedDate}
            </span>

        </div>


        <div class="task-actions">

            <button class="action-button edit-button">
                Edit
            </button>

            <button class="action-button delete-button">
                Delete
            </button>

        </div>

    `;

    const deleteButton = taskCard.querySelector('.action-button.delete-button');
    const editButton = taskCard.querySelector('.action-button.edit-button');

    deleteButton.addEventListener('click' , () => {

        deleteTheTask(task);

    })

    editButton.addEventListener('click' , () => {

        changeTaskModalUI('edit');
        taskModal.style.display = 'flex';

        editedTask = task;
        renderPreviousValues(task);
        
    })


    tasksContainer.appendChild(taskCard);
}

taskSearch.addEventListener('input' , sortTasksArray);
statusFilter.addEventListener('change' , sortTasksArray);
priorityFilter.addEventListener('change' , sortTasksArray);
projectFilter.addEventListener('change' , sortTasksArray);
taskSort.addEventListener('change' , sortTasksArray);

const resetTaskFilters = document.getElementById('resetTaskFilters');

resetTaskFilters.addEventListener('click' , () => {

    taskSearch.value = '';
    statusFilter.value = 'all';
    priorityFilter.value = 'all';
    projectFilter.value = 'all';
    taskSort.value = 'newest';

    sortTasksArray();
})

function deleteTheTask(task) {

    const taskIndex = taskArray.indexOf(task);

    taskArray.splice(taskIndex , 1);
    localStorage.setItem(localeStorageKey, JSON.stringify(taskArray));

    renderRecentTasks();
    renderTasksInfo();
    renderTasksPriorityDetails();
    sortTasksArray();

    renderProjectsProgress();
    displayProjectsProgress();

    renderProjectsView();
}

function renderPreviousValues(task) {

    taskTitle.value = task.title;
    taskDescription.value = task.description;
    taskProject.value = task.task;
    taskPriority.value = task.priority;
    taskStatus.value = task.status;
    taskDueDate.value = task.dueDate.replace(/\//g, '-');

}

let projectsFrequency = {};
let completedProjectsFrequency = {};

function renderProjectsProgress() {

    projectsFrequency = {};
    completedProjectsFrequency = {};

    for (let task of taskArray) {

        let project = task.task;

        if (project in projectsFrequency) {
            projectsFrequency[project] += 1;
        } else {
            projectsFrequency[project] = 1;
        }
    }

    for (let task of taskArray) {

        let project = task.task;

        if (project in completedProjectsFrequency && task.status === 'completed') {
            completedProjectsFrequency[project] += 1;
        } else if (task.status === 'completed') {
            completedProjectsFrequency[project] = 1;
        }
    }
}

function projectProgressHelper(projectName) {

    projectName = projectName.toLowerCase();

    const completedTasks = completedProjectsFrequency[projectName] || 0;
    const totalTasks = projectsFrequency[projectName] || 0;

    const percentage = totalTasks === 0
        ? 0
        : ((completedTasks / totalTasks) * 100).toFixed(2);

    return [percentage, completedTasks, totalTasks];

}

const projectProgressContainer = document.getElementById('projectProgressContainer');
const emptyProjects = document.getElementById('emptyProjects');

function displayProjectsProgress() {

    projectProgressContainer.innerHTML = '';

    const projectsArray = [
        'Personal',
        'College',
        'Web-Development',
        'Python',
        'DSA'
    ];

    for (let projectName of projectsArray) {

        let [percentage, completedTasks, totalTasks] =
            projectProgressHelper(projectName);

        let progressCard = document.createElement('div');

        progressCard.classList.add('project-progress-item');

        progressCard.innerHTML = `
    
            <div class="project-progress-heading">

                <h3>
                    ${projectName}
                </h3>

                <span>
                    ${percentage}%
                </span>

            </div>

            <div class="progress-track">

                <div
                    class="progress-bar"
                    style="width: ${percentage}%;"
                ></div>

            </div>

            <div class="project-progress-footer">

                <span>
                    ${totalTasks !== 0 
                        ? `${completedTasks} of ${totalTasks} tasks completed`
                        : `No tasks yet`
                    }
                </span>

            </div>

        `;

        projectProgressContainer.appendChild(progressCard);
    }

    if (projectProgressContainer.innerHTML === ''){
        emptyProjects.style.display = 'block';
    }

    else {
        emptyProjects.style.display = 'none';
    }

}

function getShortDescription(projectName) {

    if (projectName === 'python') {
        return 'Python projects, practice, and coding tasks';
    } else if (projectName === 'dsa') {
        return 'Data structures, algorithms, and problem solving';
    } else if (projectName === 'web-development') {
        return 'Frontend and web development tasks';
    } else if (projectName === 'college') {
        return 'Academic work, assignments, and study tasks';
    } else {
        return 'Personal goals, plans, and everyday tasks';
    }
}

const viewAllProjects = document.getElementById('viewAllProjects');
const projectsNav = document.getElementById('projectsNav');

viewAllProjects.addEventListener('click' , () => {

    viewSet('projectsView' , 'projectsNav')
})

projectsNav.addEventListener('click' , () => {

    viewSet('projectsView' , 'projectsNav')
})

const projectsContainer = document.getElementById('projectsContainer');
const projectsEmptyState = document.getElementById('projectsEmptyState');

function renderProjectsView() {

    projectsContainer.innerHTML = '';

    for (let task in projectsFrequency) {

        const shortDescription = getShortDescription(task);

        const taskTitle = convertProjectTextToDisplay(task);

        const [completionRate , completedTask , totalTasks] = projectProgressHelper(task);

        let projectCard = document.createElement('div');

        projectCard.classList.add('project-card');

        projectCard.innerHTML = `

        <div class="project-card-header">

            <div>
                <h3>${taskTitle}</h3>
                <p>${shortDescription}</p>
            </div>

            <span class="project-percentage">${completionRate}%</span>

        </div>

        <div class="progress-track">

            <div
                class="progress-bar"
                style="width: ${completionRate}%;"
            ></div>

        </div>

        <div class="project-card-footer">

            <span>${completedTask} of ${totalTasks} tasks completed</span>

            <button class="view-project-button">
                View Tasks →
            </button>

        </div>
        `;

        const viewTaskButton = projectCard.querySelector('.view-project-button');

        viewTaskButton.addEventListener('click' , () => {

            
            viewSet('tasksView' , 'tasksNav');
            projectFilter.value = task;
            sortTasksArray();
        })

        projectsContainer.appendChild(projectCard);

    }

    if (projectsContainer.innerHTML === '') {
        projectsEmptyState.style.display = 'block';
    } else {
        projectsEmptyState.style.display = 'none';
    }

}



