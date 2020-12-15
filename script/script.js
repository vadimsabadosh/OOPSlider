window.addEventListener('DOMContentLoaded', function () {  
    'use strict';

    //Timer
    const countTimer = (deadline) => {
        let timerHours = document.querySelector('#timer-hours');
        let timerMinutes = document.querySelector('#timer-minutes');
        let timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {  
            let dateStop = new Date(deadline).getTime(); //Получение даты окончания в милискундах
            let dateNow = new Date().getTime();//Получение сегодняшней даты в милискундах
            let timeRemaining = (dateStop - dateNow) / 1000; //Получение разницы во времени в секундах
            let seconds = Math.floor(timeRemaining % 60); // Получение секунд из общего числа секунд
            let minutes = Math.floor((timeRemaining / 60) % 60); // Получение минут из общего числа секунд
            let hours = Math.floor(timeRemaining / 60 / 60);// Получение часов из общего числа секунд
                //let hours = Math.floor((timeRemaining / 60 / 60) % 24); // Получение часов из общего числа секунд
                //let days = Math.floor(timeRemaining / 60 / 60 / 24); // Получение дней из общего числа секунд
            return {timeRemaining, hours, minutes, seconds }
        }

        function updateClock() {  

            let timer = getTimeRemaining();
            
            const addZero = (n) => {
                return n < 10 ? '0' + n: n;
            }
            timerHours.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSeconds.textContent = addZero(timer.seconds);

            if(timer.timeRemaining <= 0){
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }
        //updateClock();
        setInterval(updateClock, 1000);
        
    }
    countTimer('16 december 2020');
    

    //Menu 
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu');
        const btnClose = document.querySelector('.close-btn');
        const menu = document.querySelector('menu');
        const menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');        
        };

        btnMenu.addEventListener('click', handlerMenu);
        btnClose.addEventListener('click', handlerMenu);
        menuItems.forEach(item => item.addEventListener('click', handlerMenu));

    };
    toggleMenu();



    //POP-UP

    const togglePopup = () => {
        const popup = document.querySelector('.popup');
        const btnPopup = document.querySelectorAll('.popup-btn');
        const popupClose = popup.querySelector('.popup-close');

        //Функции Анимации

        //Функция плавного исчезновения
        function fadeOut(el) {
            el.style.opacity = 1;
            function fade() {
                if ((el.style.opacity -= .05) < 0) {
                    el.style.opacity = '';
                    el.style.display = "none";
                } else {
                    requestAnimationFrame(fade);
                }
            };
            fade();
        };
        //Фукнция плавного появления
        function fadeIn(el, display) {
            el.style.opacity = 0;
            el.style.display = display || "block";
            function fade() {
                var val = parseFloat(el.style.opacity);
                if (!((val += .05) > 1)) {
                    el.style.opacity = val;
                    requestAnimationFrame(fade);
                }
            };
            fade();
        };

        //Обработчики событий
        btnPopup.forEach(item => {
            item.addEventListener('click', () =>{

                if(document.documentElement.clientWidth>768){
                    fadeIn(popup);
                }else{
                    popup.style.display = 'block';
                }
            });
        })
        popupClose.addEventListener('click', () => {

            if(document.documentElement.clientWidth>768){
                fadeOut(popup)
            }else{
                popup.style.display = '';
            }
        
        })

    }
    togglePopup();
});