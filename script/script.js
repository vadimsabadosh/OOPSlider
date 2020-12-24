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
        
    };
    countTimer('25 december 2020');
    

    //Menu 
    const toggleMenu = () => {
        const menu = document.querySelector('menu');
        
        const activeMenu = () => {
            menu.classList.add('active-menu');
        }

        const deactiveMenu = () => {
            menu.classList.remove('active-menu');
        }

        document.body.addEventListener('click', (e) => {
            let target = e.target;
            target = target.closest('.menu');
            if(target){
                activeMenu();
            }else if(!target){
                target = e.target;
                if(target.closest('.close-btn')){
                    deactiveMenu();
                }else if(target.closest('a')){
                    deactiveMenu();
                }else{
                    target = e.target;
                    target = target.closest('.active-menu');
                    
                    if(!target){
                        deactiveMenu();
                    }else{
                        return;
                    }
                    
                }
            }

        });
    };
    toggleMenu();



    //POP-UP

    const togglePopup = () => {
        const popup = document.querySelector('.popup');
        const btnPopup = document.querySelectorAll('.popup-btn');

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
        });
        
        popup.addEventListener('click', (e) => {
            let target = e.target;

            if(target.classList.contains('popup-close')){
                if(document.documentElement.clientWidth>768){
                    fadeOut(popup)
                }else{
                    popup.style.display = '';
                }
            }else{
                target = target.closest('.popup-content');
                if(!target){
                    if(document.documentElement.clientWidth>768){
                        fadeOut(popup)
                    }else{
                        popup.style.display = '';
                    }
                }
            }
            
        });


    };
    togglePopup();

    //Скролл
    const scrolling = () => {


        const allLinks = document.querySelectorAll('menu>ul>li>a');
        const scrollBtn = document.querySelector('main>a');

        scrollBtn.addEventListener('click', scroll);

                function scroll(e){
                    e.preventDefault();
                    const href = this.getAttribute('href')
                    const scrollTarget = document.querySelector(href);
                    const offsetPosition = scrollTarget.offsetTop;
                    window.scroll({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                };
            allLinks.forEach(link => {
                link.addEventListener('click', scroll);
            });
    };
    scrolling();

    // Табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header');
        const tabs = tabHeader.querySelectorAll('.service-header-tab');
        const tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++){
                if(index === i){
                    tabs[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                }else{
                    tabs[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }

        };
        tabHeader.addEventListener('click', (e) => {
            let target = e.target;
                target = target.closest('.service-header-tab');
                if(target){
                    tabs.forEach((item, i) => {
                        if(item === target){
                            toggleTabContent(i);
                        }
                    });
                }
            
            
        });

    };
    tabs();

    // Слайдер
    const silder = () => {

        const slider = document.querySelector('.portfolio-content');
        const slide = document.querySelectorAll('.portfolio-item');
        
        const addDot = () => {
            let ul = document.createElement('ul');
            ul.classList.add('portfolio-dots');
            slider.append(ul);
            for (let i = 0; i < slide.length; i++){
                let li = document.createElement('li');
                li.classList.add('dot');
                ul.append(li);
            }
            const allLi = ul.querySelectorAll('li');
            allLi[0].classList.add('dot-active');
        };
        addDot();
        
        const dots = document.querySelectorAll('.dot');

        let interval;
        let currentSlide = 0;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };


        const autoPlay = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        };

        const startSlide  = (time = 3000) => {
            interval = setInterval(autoPlay, time);
        };
        startSlide(2500);

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (e) => {
            e.preventDefault();
            let target = e.target;

            if(!target.matches('.portfolio-btn, .dot')){
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dots, currentSlide, 'dot-active');

            if(target.matches('#arrow-right')){
                currentSlide++;
            }else if(target.matches('#arrow-left')){
                currentSlide--;
            }else if(target.matches('.dot')){
                dots.forEach((elem, i) => {
                    if(elem === target){
                        currentSlide = i;
                    }
                })
            };
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            if(currentSlide < 0){
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dots, currentSlide, 'dot-active');
        });
        slider.addEventListener('mouseover', (e) => {
            if(e.target.matches('.portfolio-btn') || e.target.matches('.dot')){
                stopSlide();
            }
        });
        
        slider.addEventListener('mouseout', (e) => {
            if(e.target.matches('.portfolio-btn') || e.target.matches('.dot')){
                startSlide();
            }
        });
    };
    silder();

    //Ввод в калькуляторе только цифр
    const calcNumbers = () => {
        const inputs = document.querySelectorAll('input.calc-item');

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.value = input.value.replace(/\D/g, '');
            });
        });
        
    }
    calcNumbers();

    //Наша команда
    const ourTeam = () => {
        const images = document.querySelectorAll('.command__photo');
        images.forEach(image => {
            let oldSrc = image.src;
            image.addEventListener('mouseover', () => {
                image.src = image.dataset.img;
            });
            image.addEventListener('mouseout', () => {
                image.src = oldSrc;
            });
        });
    }
    ourTeam();

    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block');
        const calcType = document.querySelector('.calc-type');
        const calcSquare = document.querySelector('.calc-square');
        const calcCount = document.querySelector('.calc-count');
        const calcDay = document.querySelector('.calc-day');
        const totalValue = document.getElementById('total');

           

        const countSum = () => {
            let total = 0, countValue = 1, dayValue = 1;
            const typeValue = +calcType.options[calcType.selectedIndex].value;
            let squareValue = +calcSquare.value;

            if(calcCount.value > 1){
                countValue += (calcCount.value - 1) / 10;
            }

            if(calcDay.value && calcDay.value < 5){
                dayValue *= 2;
            }else if(calcDay.value && calcDay.value < 10){
                dayValue *= 1.5;
            }

            if(typeValue && squareValue){
                total = price * squareValue * typeValue * countValue * dayValue;
            }
            totalValue.textContent = total;
            if(totalValue.textContent > 1){
                animateValue(total, 1700);
            }
        };

        const animateValue = (end, duration) => {
            
            let startTimestamp = null;
            const step = (timestamp) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / duration, 1);
              totalValue.innerHTML = Math.floor(progress * (end - 0) + 0);
              if (progress < 1) {
                window.requestAnimationFrame(step);
              }
            };
            window.requestAnimationFrame(step);
          }
        

        calcBlock.addEventListener('change', (e) => {
            let target = e.target;
            if(target.matches('select') || target.matches('input')){
                    countSum();
                    
            }
        })
    };
    calc();


    ///AJAX

    const sendForm = () => {

        const errorMessage = 'Что-то пошло не так....';
        const loadMessage = 'Загрузка...';
        const successMessage = 'Сообщение удачно отправлено';

        const forms = document.querySelectorAll('form');

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size:2rem; color: white;';

        ////сабмит на все формы
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const popupLoader = document.querySelector('.popup_loader');
                const popupLoaderWrap = document.querySelector('.popup_loader-wrap');
                const skCircleBounce = document.querySelector('.sk-circle-bounce');
                const closePopupLoader = document.querySelector('.close_popupLoader');

                popupLoader.style.display = 'flex';
                closePopupLoader.style.display = 'none';

                //анимация загрузки
                const spiner = (msg) => {
                    closePopupLoader.style.display = 'block';
                    popupLoaderWrap.removeChild(skCircleBounce);
                    const messDiv = document.createElement('h2');
                    messDiv.textContent = msg;
                    popupLoaderWrap.append(messDiv);
                    closePopupLoader.addEventListener('click', (e) => {
                        e.preventDefault();
                        popupLoader.style.display = '';
                        popupLoaderWrap.removeChild(messDiv);
                        popupLoaderWrap.append(skCircleBounce);
                    });
                    form.reset();
                };

                

                const formData = new FormData(form);
                const body = {};
    
                formData.forEach((val, key) => {
                    body[key] = val;
                });
                postData(body, () => {
                    spiner(successMessage);
                }, (error) => {
                    console.error(error);
                    spiner(errorMessage);
                });
            }); 
        });

            //Отправка на сервер
        const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();

            request.addEventListener('readystatechange', () => {

                if(request.readyState !== 4){
                    return;
                }

                if(request.status === 200){
                    outputData();
                }else{
                    errorData(request.status);
                }
            });

            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');
        
            request.send(JSON.stringify(body));
        };

        ///запрет на ввод англ букв и цифр
        document.addEventListener('input', () => {
            let allNames = document.querySelectorAll('input[name="user_name"], input[name="user_message"]');
            
            for(let i = 0; i<allNames.length; i++){
                allNames[i].value =  allNames[i].value.replace(/[^А-Яа-яЁё ]/g, '');
            };
        })

        ///Маска ввода номера
        maskPhone('input[name="user_phone"]', '+_ (___) ___-__-__');



        

    };
    sendForm();
});