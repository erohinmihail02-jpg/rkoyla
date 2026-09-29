let tasks = [

    {
        id: 1,

        title: "Основы JavaScript",

        type: "test",

        difficulty: "Легко",

        instruction:
            "Какой метод добавляет элемент в конец массива?",

        options: [
            "push()",
            "pop()",
            "shift()",
            "slice()"
        ],

        correct: "push()"
    },


    {
        id: 2,

        title: "Типы данных JavaScript",

        type: "multiple",

        difficulty: "Легко",

        instruction:
            "Выберите типы данных JavaScript.",

        options: [
            "String",
            "Number",
            "Boolean",
            "HTML"
        ],

        correct: [
            "String",
            "Number",
            "Boolean"
        ]
    },


    {
        id: 3,

        title: "HTML и CSS",

        type: "matching",

        difficulty: "Средне",

        instruction:
            "Соедините технологию с её назначением.",

        pairs: [

            {
                left: "HTML",
                right: "Структура страницы"
            },

            {
                left: "CSS",
                right: "Оформление страницы"
            },

            {
                left: "JavaScript",
                right: "Интерактивность"
            }

        ]
    },


    {
        id: 4,

        title: "Этапы разработки",

        type: "sequence",

        difficulty: "Средне",

        instruction:
            "Расположите этапы разработки в правильном порядке.",

        items: [
            "Анализ задачи",
            "Проектирование",
            "Разработка",
            "Тестирование",
            "Публикация"
        ]
    },


    {
        id: 5,

        title: "Frontend и Backend",

        type: "category",

        difficulty: "Средне",

        instruction:
            "Распределите технологии по категориям.",

        items: [
            "HTML",
            "CSS",
            "JavaScript",
            "PHP",
            "Node.js"
        ],

        categories: [
            "Frontend",
            "Backend"
        ],

        correct: {
            "HTML": "Frontend",
            "CSS": "Frontend",
            "JavaScript": "Frontend",
            "PHP": "Backend",
            "Node.js": "Backend"
        }
    },


    {
        id: 6,

        title: "Переменные JavaScript",

        type: "fill",

        difficulty: "Легко",

        instruction:
            "Для объявления переменной можно использовать ключевое слово ____.",

        correct: [
            "let",
            "var",
            "const"
        ]
    }

];


// Загружаем задания из localStorage

let savedTasks =
    JSON.parse(localStorage.getItem("tasks")) || [];


// Добавляем созданные задания

tasks = [...tasks, ...savedTasks];