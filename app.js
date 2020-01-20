document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    //Получаю все элементы
    const add = document.querySelector("#add"),
        block = document.querySelector(".block"),
        none = document.querySelector(".none"),
        cancelText = document.querySelector("#cancel-text"),
        addText = document.querySelector("add-text"),
        hint = document.querySelectorAll(".hint"),
        time = document.querySelector(".time"),
        formEntry = document.querySelector("#form-article"),
        test = document.querySelector(".test"),
        article = document.querySelector(".article"),
        entryLoaded = document.querySelectorAll(".entry"),
        hideTextLoaded = document.querySelectorAll(".hide-text");

    //Создаю переменные 
    const entryArr = JSON.parse(localStorage.getItem('entryArr')) || [],
        dateCreation = JSON.parse(localStorage.getItem('dateArr')) || [];


    // Дата
    function showTime() {
        const date = new Date();
        let h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds();

        time.innerHTML = `${checkTime(h)}:${checkTime(m)}:${checkTime(s)}`;
    }
    function checkTime(i) {
        if (i < 10) {
            return i = `0${i}`;
        } else {
            return i;
        }
    }
    // checkTime();
    showTime();
    setInterval(showTime, 1000);

    // При сохранении записи записываю и число, когда была создана запись || ч1
    function dateOfCreation() {
        const date = new Date();
        let h = date.getDate(),
            m = date.getMonth(),
            s = date.getFullYear();
        let timeOfCreation = `${checkTime(h)} ${checkMonth(m)} ${checkTime(s)}`;

        dateCreation.push(timeOfCreation);
        localStorage.setItem("dateArr", JSON.stringify(dateCreation));

        return dateCreation;
    }
    function checkMonth(month) {
        if (month == 0) {
            return "Января";
        }
        if (month == 1) {
            return "Февраля";
        }
        if (month == 2) {
            return "Марта";
        }
        if (month == 3) {
            return "Апреля";
        }
        if (month == 4) {
            return "Мая";
        }
        if (month == 5) {
            return "Июня";
        }
        if (month == 6) {
            return "Июля";
        }
        if (month == 7) {
            return "Августа";
        }
        if (month == 8) {
            return "Сентября";
        }
        if (month == 9) {
            return "Октября";
        }
        if (month == 10) {
            return "Ноября";
        }
        if (month == 11) {
            return "Декабря";
        }
    }
    // удаление записей и из памяти, и из массива +удаление даты (и из памяти, и из массива)
    const delEntry = (entry, entryArr, dateCreation) => {

        entry.forEach((element, index) => {

            element.addEventListener("click", event => {
                if (event.target.id == "del") {

                    entryArr.splice(index, 1);
                    dateCreation.splice(index, 1);
                    localStorage.setItem("dateArr", JSON.stringify(dateCreation));
                    localStorage.setItem("entryArr", JSON.stringify(entryArr));

                    render(entryArr, dateCreation);
                    return true;
                }

            });
        });



    };

    // render
    const render = (entryArr, dateArr) => {
        test.innerHTML = "";
        entryArr.forEach((elem, i) => {

            test.innerHTML += `
            <div class="entry" data-number="${i}">
                <section class="section-1">
                    <div class="section-data">
                     ${dateArr[i]}
                    </div>
                    <div class="row row-section">
                        <div class="section-options" id="eye">
                            👁
                        </div>
                        <div class="section-options" id="del">
                            Удалить
                        </div>
                        
                    </div>
                </section>
                <section class="hide-text">
                    <div class="hide-caption">Тема: <span class="text-caption"> ${elem.theme}</span></div>
                    <br>
                    
                    ${elem.text}
                </section>
            </div>
            `;
        });
        const entry = document.querySelectorAll(".entry"),
            hideText = document.querySelectorAll(".hide-text");

        showEye(entry, hideText);
        delEntry(entry, entryArr, dateArr);

    };


    //Закрываю все подсказки
    const closeHint = () => {
        let closeInfoNumber = JSON.parse(localStorage.getItem("closeHintInfoNumber")) || [];
        if (closeInfoNumber != "") {
            closeInfoNumber.forEach((element, i) => {
                hint.forEach((elem, index) => {
                    if (element == index) {
                        hint[index].style.display = "none";
                    }
                });
            });
        }
        hint.forEach((elem, index) => {

            hint[index].addEventListener("click", event => {
                // localStorage.setItem("index-close-hint", "");
                if (event.target.className == "close-hint") {
                    hint[index].style.display = "none";
                    // closeInfoNumber.push(index);
                    closeInfoNumber.push(index);
                    localStorage.setItem("closeHintInfoNumber", JSON.stringify(closeInfoNumber));
                }
                // localStorage.setItem("close-hint", "none");
            });
        });
    };
    closeHint();

    //Быстрый просмотр нашей записи
    const showEye = (entry, hideText) => {
        entry.forEach((element, index) => {
            element.addEventListener("click", event => {
                if (event.target.id == "eye") {
                    let dataAtt = event.target.closest("[data-number='" + index + "']");
                    hideText.forEach((elem, i) => {
                        if (dataAtt.dataset.number == i) {
                            // hideText[i].style.display = "block";
                            if (hideText[i].style.display == "block") {
                                hideText[i].style.display = "none";
                            } else {
                                hideText[i].style.display = "block";
                            }
                        }
                    });
                }

            });
        });
    };




    formEntry.addEventListener("submit", event => {
        event.preventDefault();
        const obj = {};
        [...formEntry].forEach((elem, i) => {
            if (elem.tagName === "INPUT" || elem.tagName === "TEXTAREA") {
                obj[elem.name] = elem.value;
            }
        });
        // obj
        // console.log('obj: ', obj);
        formEntry.reset();
        entryArr.push(obj);
        localStorage.setItem("entryArr", JSON.stringify(entryArr));

        render(entryArr, dateOfCreation());

        block.classList.remove("none");
        block.classList.add("block");
        none.classList.add("none");
        none.classList.remove("block");
        // const entry = document.querySelectorAll(".entry"),
        //     hideText = document.querySelectorAll(".hide-text");
        // showEye(entry, hideText);

    });
    render(entryArr, dateCreation);

    //Перехожу на страницу добавление
    add.addEventListener("click", () => {
        block.classList.remove("block");
        block.classList.add("none");
        none.classList.add("block");
        none.classList.remove("none");
    });

    //Кнопка возврата на главную страницу
    cancelText.addEventListener("click", () => {
        block.classList.remove("none");
        block.classList.add("block");
        none.classList.add("none");
        none.classList.remove("block");

    });
});