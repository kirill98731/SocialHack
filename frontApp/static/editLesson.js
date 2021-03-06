// Добавление новой карточки или колонки
// Во всех функциях входной параметр elem - кнопка, к которой прикреплена эта функция

// Начать добавление карточки
// Создаёт поле ввода текта новой карточки и кнопки добавления и отмены
// Функция прикрепляется к кнопке внизу колонки
var start_adding_pres = function (elem) {
    var input = document.createElement('textarea');
    input.className = "card";
    input.setAttribute("placeholder", "Введите название");
    input.onkeydown = pressEnter;
    elem.parentNode.children[1].appendChild(input).focus();

    input = document.createElement('textarea');
    input.className = "card";
    input.setAttribute("placeholder", "Введите ссылку");
    input.onkeydown = pressEnter;
    elem.parentNode.children[1].appendChild(input);

    elem.parentNode.replaceChild(make_buttons("Добавить", "add_pres(this)", "stop_adding_pres(this)"), elem);

    input.scrollIntoView();
}

// Добавить карту
// Добавляет в конец текущей колонки новую карточку
// Функция прикрепляется к кнопке "Добавить карточку"
var add_pres = function (elem) {
    var textareas = elem.parentNode.parentNode.children[1].querySelectorAll('textarea.card');
    var card = document.createElement('div');
    card.className = "card";
    card.innerHTML = textareas[0].value;
    card.setAttribute("data-link", textareas[1].value);

    sendChanges(textareas[0].value, textareas[1].value, card);
    replace_buttons(elem, "start_adding_pres(this)", "Добавить");
    textareas[0].parentNode.removeChild(textareas[0]);
    textareas[1].parentNode.replaceChild(card, textareas[1]);
}

// Отмена добавления
// Отменяет добавление новой карточки
// Функция прикрепляется к крестику
var stop_adding_pres = function (elem) {
    cards = elem.parentNode.parentNode.children[1];
    cards.querySelectorAll('textarea.card').forEach((item) => {
        cards.removeChild(item);
    });
    replace_buttons(elem, "start_adding_pres(this)", "Добавить");
};

var start_adding_quize = function (elem) {
    var input = document.createElement('textarea');
    input.className = "card";
    input.setAttribute("placeholder", "Введите название");
    input.onkeydown = pressEnter;
    elem.parentNode.children[1].appendChild(input).focus();

    input = document.createElement('textarea');
    input.className = "card";
    input.setAttribute("placeholder", "Введите текст задания");
    input.onkeydown = pressEnter;
    elem.parentNode.children[1].appendChild(input);

    input = document.createElement('textarea');
    input.className = "card";
    input.setAttribute("placeholder", "Введите неправильные ответы через запятую");
    input.onkeydown = pressEnter;
    elem.parentNode.children[1].appendChild(input);

    input = document.createElement('textarea');
    input.className = "card";
    input.setAttribute("placeholder", "Введите правильный ответ");
    input.onkeydown = pressEnter;
    elem.parentNode.children[1].appendChild(input);

    elem.parentNode.replaceChild(make_buttons("Добавить", "add_quize(this)", "stop_adding_quize(this)"), elem);

    input.scrollIntoView();
}

var add_quize = function (elem) {
    var textareas = elem.parentNode.parentNode.children[1].querySelectorAll('textarea.card');
    var card = document.createElement('div');
    card.className = "card";
    card.innerHTML = textareas[0].value;
    card.setAttribute("onclick", "giveGraph(this)");

    sendChangesTask(textareas[0].value, textareas[1].value, textareas[2].value, textareas[3].value, card);
    replace_buttons(elem, "start_adding_quize(this)", "Добавить");
    textareas[0].parentNode.removeChild(textareas[0]);
    textareas[1].parentNode.removeChild(textareas[1]);
    textareas[2].parentNode.removeChild(textareas[2]);
    textareas[3].parentNode.replaceChild(card, textareas[3]);
}

var stop_adding_quize = function (elem) {
    cards = elem.parentNode.parentNode.children[1];
    cards.querySelectorAll('textarea.card').forEach((item) => {
        cards.removeChild(item);
    })
    replace_buttons(elem, "start_adding_quize(this)", "Добавить");
};


// Вспомогательные функции

// Заменяет кнопки, в состав которых входит elem на кнопку добавление с текстом text и прикреплённой к ней функцией func
var replace_buttons = function (elem, func, text) {
    var add = document.createElement('div');
    add.className = "add-card";
    add.setAttribute("onclick", func);
    add.innerHTML = "<div class=\"plus\"></div>" + text;

    elem.parentNode.parentNode.replaceChild(add, elem.parentNode);
}

// Генерирует объект, включающий в себя две кнопки:
// 1. кнопку добавления с текстом text и функцией клика add_function
// 2. кнопку отмены с функцией клика close_function
var make_buttons = function (text, add_function, close_function) {
    var buttons = document.createElement('div');
    var add = document.createElement('div');
    add.className = "add-card-button";
    add.innerHTML = text;
    add.setAttribute("onclick", add_function);

    var close = document.createElement('div');
    close.className = "close";
    close.setAttribute("onclick", close_function);
    var cross = document.createElement('div');
    cross.className = "cross";

    close.appendChild(cross);
    buttons.appendChild(add);
    buttons.appendChild(close);

    return buttons;
};

function createGraph(data) {
    am4core.useTheme(am4themes_animated);
    var chart = am4core.create("chartdiv", am4charts.PieChart);

// Add data
    chart.data = data;

// Add and configure Series
    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "answer";
    pieSeries.slices.template.stroke = am4core.color("#fff");
    pieSeries.slices.template.strokeWidth = 2;
    pieSeries.slices.template.strokeOpacity = 1;

// This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1;
    pieSeries.hiddenState.properties.endAngle = -90;
    pieSeries.hiddenState.properties.startAngle = -90;

}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function giveGraph(card) {
    var csrftoken = getCookie('csrftoken');
    var xhr = new XMLHttpRequest();
    var body = "?activity_id=" + encodeURIComponent(card.getAttribute("data-id"));
    xhr.open("GET", '/statistic/'+card.getAttribute('data-id'), true);

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader("X-CSRFToken", csrftoken);

    xhr.onreadystatechange = function () {
        createGraph(JSON.parse(this.responseText).data);
    };

    xhr.send(body);
}


function sendChanges(present_name, present_link, card) {

    var csrftoken = getCookie('csrftoken');
    var xhr = new XMLHttpRequest();
    var body = "present_name=" + encodeURIComponent(present_name) +
        "&present_url=" + encodeURIComponent(present_link);
    xhr.open("POST", 'update/present/', true);

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader("X-CSRFToken", csrftoken);

    xhr.onreadystatechange = function () {
        card.setAttribute('data-id', JSON.parse(this.responseText).id);
    };

    xhr.send(body);
}

function sendChangesTask(task_name, task_content, task_answer, task_correct_answer, card) {

    var csrftoken = getCookie('csrftoken');
    var xhr = new XMLHttpRequest();
    var body = "task_name=" + encodeURIComponent(task_name) +
        "&task_content=" + encodeURIComponent(task_content) +
        "&task_answer=" + encodeURIComponent(task_answer) +
        "&task_correct_answer=" + encodeURIComponent(task_correct_answer);
    xhr.open("POST", 'update/task/', true);

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader("X-CSRFToken", csrftoken);

    xhr.onreadystatechange = function () {
        card.setAttribute('data-id', JSON.parse(this.responseText).id);
    };

    xhr.send(body);
}

function sendTask(card) {

    var csrftoken = getCookie('csrftoken');
    var xhr = new XMLHttpRequest();
    var body = "activity_id=" + encodeURIComponent(card.getAttribute("data-id"));
    xhr.open("POST", '/add/', true);

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader("X-CSRFToken", csrftoken);

    xhr.send(body);
}

var changeStatus = function(elem) {
    elem.innerHTML = "Загрузка...";
    var csrftoken = getCookie('csrftoken');
    var xhr = new XMLHttpRequest();
    var body = "id=" + encodeURIComponent(document.getElementById("lesson_id").innerHTML);
    xhr.open("POST", '/activate/', true);

    xhr.onreadystatechange = function () {
        if (JSON.parse(this.responseText).is_active) {
            elem.innerHTML = "Закончить лекцию!";
        }
        else elem.innerHTML = "Начать лекцию!";
    };

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader("X-CSRFToken", csrftoken);

    xhr.send(body);
};

// Обработка нажатия клавиши ентер при вводе текста в текстовое поле
function pressEnter(e) {
    if (e.keyCode == 13) {
        e.target.parentNode.parentNode.querySelectorAll('.add-card-button')[0].click();
    }
}
