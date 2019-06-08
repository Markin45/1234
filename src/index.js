/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, seconds*1000);
    });
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
    return new Promise(resolve => {
        const request = new XMLHttpRequest(); 

        request.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        request.onload = function() {
            if ( this.status === 200 ) {
                var arr = JSON.parse(this.response), 
                    arr2 = [], 
                    arr3 = [];

                for (let item of arr) {
                    arr2.push(item.name);
                }
                arr2.sort();
                for (let item of arr2) {
                    arr3.push( { 'name': item } );
                }
                resolve(arr3);
            }
        };
        request.send();
    });    
}

export {
    delayPromise,
    loadAndSortTowns
};
