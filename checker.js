function checkTest(task, answer) {

    if (answer === task.correct) {

        return true;

    }

    return false;
}


function checkMultiple(task, answers) {

    if (
        answers.length !==
        task.correct.length
    ) {

        return false;
    }


    for (let answer of answers) {

        if (
            !task.correct.includes(answer)
        ) {

            return false;
        }

    }

    return true;
}


function checkFill(task, answer) {

    answer =
        answer.trim().toLowerCase();


    for (let correct of task.correct) {

        if (
            answer ===
            correct.toLowerCase()
        ) {

            return true;
        }

    }

    return false;
}