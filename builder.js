const taskType =
    document.getElementById("taskType");

const editor =
    document.getElementById("editor");

const preview =
    document.getElementById("preview");

const previewButton =
    document.getElementById("previewButton");

const saveButton =
    document.getElementById("saveButton");


// Создание формы

function createEditor() {

    const type =
        taskType.value;

    editor.innerHTML = "";


    // ОДИН ОТВЕТ

    if (type === "test") {

        editor.innerHTML = `

            <h3>Вопрос</h3>

            <input
                id="question"
                placeholder="Введите вопрос"
            >

            <h3>Варианты ответа</h3>

            <input class="optionInput"
                placeholder="Вариант 1">

            <input class="optionInput"
                placeholder="Вариант 2">

            <input class="optionInput"
                placeholder="Вариант 3">

            <input class="optionInput"
                placeholder="Вариант 4">

            <label>
                Правильный ответ
            </label>

            <input
                id="correct"
                placeholder="Например: push()"
            >
        `;
    }


    // НЕСКОЛЬКО ОТВЕТОВ

    if (type === "multiple") {

        editor.innerHTML = `

            <h3>Вопрос</h3>

            <input
                id="question"
                placeholder="Введите вопрос"
            >

            <h3>Варианты</h3>

            <input class="optionInput"
                placeholder="Вариант 1">

            <input class="optionInput"
                placeholder="Вариант 2">

            <input class="optionInput"
                placeholder="Вариант 3">

            <input class="optionInput"
                placeholder="Вариант 4">

            <p>
                Правильные ответы через запятую:
            </p>

            <input
                id="correct"
                placeholder="String, Number"
            >
        `;
    }


    // СОПОСТАВЛЕНИЕ

    if (type === "matching") {

        editor.innerHTML = `

            <h3>Пары</h3>

            <input
                class="leftInput"
                placeholder="HTML"
            >

            <input
                class="rightInput"
                placeholder="Структура страницы"
            >

            <input
                class="leftInput"
                placeholder="CSS"
            >

            <input
                class="rightInput"
                placeholder="Оформление"
            >

            <input
                class="leftInput"
                placeholder="JavaScript"
            >

            <input
                class="rightInput"
                placeholder="Интерактивность"
            >

        `;
    }


    // ПОСЛЕДОВАТЕЛЬНОСТЬ

    if (type === "sequence") {

        editor.innerHTML = `

            <h3>Элементы в правильном порядке</h3>

            <input class="sequenceInput"
                placeholder="Элемент 1">

            <input class="sequenceInput"
                placeholder="Элемент 2">

            <input class="sequenceInput"
                placeholder="Элемент 3">

            <input class="sequenceInput"
                placeholder="Элемент 4">

        `;
    }


    // КАТЕГОРИИ

    if (type === "category") {

        editor.innerHTML = `

            <h3>Категории</h3>

            <input
                id="categories"
                placeholder="Frontend, Backend"
            >

            <h3>Элементы</h3>

            <input class="categoryItem"
                placeholder="HTML - Frontend">

            <input class="categoryItem"
                placeholder="PHP - Backend">

            <input class="categoryItem"
                placeholder="CSS - Frontend">

            <input class="categoryItem"
                placeholder="Node.js - Backend">

        `;
    }


    // ПРОПУСК

    if (type === "fill") {

        editor.innerHTML = `

            <h3>Предложение</h3>

            <input
                id="question"
                placeholder="Для объявления переменной используют ____"
            >

            <h3>Допустимые ответы</h3>

            <input
                id="correct"
                placeholder="let, const, var"
            >

        `;
    }

}


taskType.addEventListener(
    "change",
    createEditor
);

createEditor();
// Создание объекта задания

function getTaskData() {

    const type =
        taskType.value;

    const title =
        document.getElementById("taskTitle").value;

    const difficulty =
        document.getElementById("taskDifficulty").value;

    const instruction =
        document.getElementById("taskInstruction").value;


    let task = {

        id: Date.now(),

        title: title,

        type: type,

        difficulty: difficulty,

        instruction: instruction

    };


    // TEST

    if (type === "test") {

        const options =
            [...document.querySelectorAll(".optionInput")]
            .map(input => input.value)
            .filter(value => value !== "");

        task.options = options;

        task.correct =
            document.getElementById("correct").value;
    }


    // MULTIPLE

    if (type === "multiple") {

        const options =
            [...document.querySelectorAll(".optionInput")]
            .map(input => input.value)
            .filter(value => value !== "");

        task.options = options;

        task.correct =
            document
                .getElementById("correct")
                .value
                .split(",")
                .map(x => x.trim());
    }


    // MATCHING

    if (type === "matching") {

        const left =
            [...document.querySelectorAll(".leftInput")];

        const right =
            [...document.querySelectorAll(".rightInput")];

        task.pairs = [];

        for (let i = 0; i < left.length; i++) {

            if (
                left[i].value !== "" &&
                right[i].value !== ""
            ) {

                task.pairs.push({

                    left: left[i].value,

                    right: right[i].value

                });

            }

        }

    }


    // SEQUENCE

    if (type === "sequence") {

        task.items =
            [...document.querySelectorAll(".sequenceInput")]
            .map(input => input.value)
            .filter(value => value !== "");

    }


    // CATEGORY

    if (type === "category") {

        task.categories =
            document
                .getElementById("categories")
                .value
                .split(",")
                .map(x => x.trim());

        task.items = [];

        task.correct = {};

        const items =
            document.querySelectorAll(".categoryItem");


        items.forEach(input => {

            const parts =
                input.value.split("-");

            if (parts.length >= 2) {

                const name =
                    parts[0].trim();

                const category =
                    parts[1].trim();

                task.items.push(name);

                task.correct[name] =
                    category;
            }

        });

    }


    // FILL

    if (type === "fill") {

        task.correct =
            document
                .getElementById("correct")
                .value
                .split(",")
                .map(x => x.trim());

    }


    return task;
}
// ПРЕДПРОСМОТР

previewButton.addEventListener(
    "click",
    function () {

        const task =
            getTaskData();

        preview.innerHTML = `

            <h2>Предпросмотр</h2>

            <h3>
                ${task.title}
            </h3>

            <p>
                ${task.instruction}
            </p>

            <p>
                Тип: ${task.type}
            </p>

        `;

        if (task.options) {

            task.options.forEach(option => {

                preview.innerHTML += `

                    <div class="answer-option">
                        ${option}
                    </div>

                `;

            });

        }


        if (task.pairs) {

            task.pairs.forEach(pair => {

                preview.innerHTML += `

                    <p>
                        ${pair.left}
                        — ${pair.right}
                    </p>

                `;

            });

        }


        if (task.items) {

            task.items.forEach(item => {

                preview.innerHTML += `

                    <div class="sequence-item">
                        ${item}
                    </div>

                `;

            });

        }

    }
);


// СОХРАНЕНИЕ

saveButton.addEventListener(
    "click",
    function () {

        const task =
            getTaskData();


        if (!task.title) {

            alert("Введите название задания!");

            return;
        }


        let saved =
            JSON.parse(
                localStorage.getItem("tasks")
            ) || [];


        saved.push(task);


        localStorage.setItem(
            "tasks",
            JSON.stringify(saved)
        );


        alert(
            "Задание успешно сохранено!"
        );


        window.location.href =
            "index.html";

    }
);