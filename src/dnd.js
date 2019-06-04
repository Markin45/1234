/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {

	function getRandomArbitary(min, max){
		return Math.random() * (max - min) + min;
	}

	function randColor() {
		return '#' + Math.floor(Math.random()*16777215).toString(16);
	}

	var div = document.createElement('div');

	var body_width = document.body.clientWidth || 500;
	var body_height = document.body.clientHeight || 500;
	var div_width = getRandomArbitary(10,body_width/2);
	var div_height = getRandomArbitary(10,body_height/2);
	var div_left = getRandomArbitary(0,body_width-div_width);
	var div_top = getRandomArbitary(0,body_height-div_height);
	
	div.classList.add("draggable-div");
	div.style.width = div_width+'px';
	div.style.height = div_height+'px';
	div.style.left = div_left+'px';
	div.style.top = div_top+'px';
	div.style.background = randColor();

	div.setAttribute('draggable', 'true');
	div.setAttribute( "id", "id"+(Math.floor(Math.random()*2000)));

	return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
//function addListeners(target) {}

homeworkContainer.addEventListener('dragstart', e => {
	var id = e.target.getAttribute('id');
	
	e.dataTransfer.setData('id', id);
	e.dataTransfer.setData('plusX', e.clientX - e.target.offsetLeft);
	e.dataTransfer.setData('plusY', e.clientY - e.target.offsetTop);
}, false);
homeworkContainer.addEventListener('dragover', e => {
	e.preventDefault();
}, false);		
homeworkContainer.addEventListener('drop', e => {
	var id = e.dataTransfer.getData('id');
	var y = e.clientY - e.dataTransfer.getData('plusY');
	var x = e.clientX - e.dataTransfer.getData('plusX');
	var element = document.getElementById(id);
	
	
	element.style.left = x+'px';
	element.style.top = y+'px';			
}, false);


let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
	// создать новый div
	const div = createDiv();

	// добавить на страницу
	homeworkContainer.appendChild(div);
	// назначить обработчики событий мыши для реализации D&D
	//addListeners(div);
	// можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
	// или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
	createDiv
};
