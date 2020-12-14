window.addEventListener('DOMContentLoaded', function () {  
    'use strict';

    const dateFunc = () => {
        let date = new Date();
        let arrDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
        let day = date.getDay() -1;
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let deadline = '31 december 2020';
        let now = date.getTime();
        let dateStop = new Date(deadline).getTime();
        let timeRemaining = (dateStop - now) / 1000;
        let days = Math.floor(timeRemaining / 60 / 60 / 24);

        const addZero = (n) => {
            return n < 10 ? '0' + n: n;
        }

        let p = document.createElement('p');

        p.innerHTML = `
        ${(hours < 10 ? 'Доброе утро' : hours >= 10 && hours < 17 ? 'Добрый день' : hours > 17 && hours < 20 ? 'Добрый вечер' : 'Доброй ночи')}<br>
        Сегодня: ${arrDays[day]}<br>
        Текущее время: ${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)} ${(hours>12 ? 'PM' : 'AM')}<br>
        До нового года осталось: ${days} дней
        
        `;
        document.body.append(p);
        


    }
    dateFunc();

    //setInterval(dateFunc, 1000);

});
