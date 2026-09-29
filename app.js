const container =
    document.getElementById("tasksContainer");

const search =
    document.getElementById("search");

const typeFilter =
    document.getElementById("typeFilter");

const difficultyFilter =
    document.getElementById("difficultyFilter");


// Названия типов

const typeNames = {

    test: "Один ответ",

    multiple: "Несколько ответов",

    matching: "Сопоставление",

    sequence: "Последовательность",

    category: "Распределение",

    fill: "Заполнение пропусков"

};


// Показываем задания

function showTasks() {

    const text =
        search.value.toLowerCase();

    const type =
        typeFilter.value;

    const difficulty =
        difficultyFilter.value;


    const filtered =
        tasks.filter(task => {

            const searchMatch =
                task.title
                    .toLowerCase()
                    .includes(text);

            const typeMatch =
                type === "all" ||
                task.type === type;

            const difficultyMatch =
                difficulty === "all" ||
                task.difficulty === difficulty;

            return (
                searchMatch &&
                typeMatch &&
                difficultyMatch
            );

        });


    container.innerHTML = "";


    if (filtered.length === 0) {

        container.innerHTML =
            "<p>Задания не найдены.</p>";

        return;
    }


    filtered.forEach(task => {

        const card =
            document.createElement("div");

        card.className = "task-card";


        card.innerHTML = `

            <span class="task-type">
                ${typeNames[task.type]}
            </span>

            <h3>
                ${task.title}
            </h3>

            <p>
                Сложность: ${task.difficulty}
            </p>

            <button
                class="start-button"
                onclick="startTask(${task.id})"
            >
                Начать
            </button>

        `;


        container.appendChild(card);

    });

}


// Запуск задания

function startTask(id) {

    localStorage.setItem(
        "currentTask",
        id
    );

    window.location.href =
        "builder.html?run=true";
}


// Фильтры

search.addEventListener(
    "input",
    showTasks
);

typeFilter.addEventListener(
    "change",
    showTasks
);

difficultyFilter.addEventListener(
    "change",
    showTasks
);


showTasks();