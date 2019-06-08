/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        
        /* проверка на исключение
        function getRandomArbitary(min, max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        if (getRandomArbitary(1, 5)==4) {
            request.open("GET", "https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json");
        }else{
            request.open("GET", "https://raw.githubusercontent.com/smelukov/citiesTest/master/cities1.json");   
        }
        */
       
        request.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        request.onload = function() {
            try {
                if (this.status === 200 ) {
                    var arr = JSON.parse(this.response),
                        arr2=[],
                        arr3=[];

                    for (let item of arr) {
                        arr2.push(item.name);
                    }
                    arr2.sort();
                    for (let item of arr2) {
                        arr3.push( { 'name': item } );
                    }
                    resolve(arr3);
                } else { 
                    reject();
                }
            } catch (e) {
                reject();
            }

            request.onerror = function() {
                reject();
            };

        };
        request.send();
    });    
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    var eRegExp = new RegExp('.*' + chunk + '.*', 'i');

    if (eRegExp.exec(full)) {
        
        return true;
    }

    return false;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

const erorrResult = document.createElement('div');

erorrResult.classList.add('erorr-result');
erorrResult.style.display = 'none';
erorrResult.innerHTML = 'Не удалось загрузить города <input type="button" value="Повторить" id="erorr-repeat">';
homeworkContainer.appendChild(erorrResult);

const erorrRepeat = homeworkContainer.querySelector('#erorr-repeat');
var arrTowns;
var loadingEND = towns => {
    loadingBlock.style.display = 'none';
    filterBlock.style.display = 'block';

    filterInput.addEventListener('keyup', function() {
        filterResult.innerText='';
        if (filterInput.value != '') {
            var fragm = document.createDocumentFragment();

            for (let town of arrTowns) {
                if (isMatching(town.name, filterInput.value)) {
                    var newLi = document.createElement('li');
                    
                    newLi.innerText = town.name;
                    fragm.appendChild(newLi);
                }
            }
            filterResult.appendChild(fragm);
        }
    });
    arrTowns = towns;
};
var loadingERROR = () => {
    loadingBlock.style.display = 'none';
    erorrResult.style.display = 'block';
};

loadTowns().then(loadingEND, loadingERROR)

erorrRepeat.addEventListener('click', () => {
    erorrResult.style.display = 'none';
    loadTowns().then(loadingEND, loadingERROR)
}, false);

export {
    loadTowns,
    isMatching
};
