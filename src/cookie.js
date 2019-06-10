/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', () => {
    showTable();
});

addButton.addEventListener('click', () => {
    var cook = `${addNameInput.value}=${addValueInput.value}`;

    document.cookie = cook;

    // удалим старую td
    const allTD = listTable.querySelectorAll('tr td:first-child');

    for (let oneTD of allTD) {
        if (oneTD.innerText==addNameInput.value) {
            listTable.removeChild(oneTD.parentNode);
        }
    }  

    var td = creatTD(cook);

    if (td!==undefined) {
        listTable.appendChild(td);
    }

    addNameInput.value='';
    addValueInput.value='';

});

listTable.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        var name = e.target.parentNode.previousElementSibling.previousElementSibling.innerText;
        var td = e.target.parentNode.parentNode;

        listTable.removeChild(td);
        document.cookie = `${ name }=; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    }
});

function showTable() {
    var fragment = document.createDocumentFragment();

    document.cookie.split('; ').forEach(item => { 
        var td = creatTD(item);
        
        if (td!==undefined) {
            fragment.appendChild(td);   
        }
    });
    listTable.innerHTML='';
    listTable.appendChild(fragment); 
}
showTable();

function creatTD(item) {
    var td = document.createElement('tr')
    var html = '';
    var [name, value] = item.split('=');
    var find = filterNameInput.value;

    if (find!='') {
        var eRegExp = new RegExp('.*'+find+'.*', 'i');

        if ((!eRegExp.exec(name))&&(!eRegExp.exec(value))) {
            return;
        }
    }
    html += `<td>${name}</td>`;
    html += `<td>${value}</td>`;
    html += '<td><button id="add-button">удалить cookie</button></td>';
    td.innerHTML = html;

    return td;
}