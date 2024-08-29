/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" -
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение:
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    }

    const promotion = document.querySelectorAll('.promo__adv img')
    const genre = document.querySelector('.promo__genre')
    const bg = document.querySelector('.promo__bg')
    const promoList = document.querySelector('.promo__interactive-list')
    const form = document.querySelector('form.add')
    const input = form.querySelector('.adding__input')
    const checkbox = form.querySelector('input[type="checkbox"]')

    function removeAdv(arr) {
        arr.forEach(el => {
            el.remove()
        })
    }

    function makeChanges() {
        genre.textContent = 'Драма'
        bg.style.backgroundImage = `url('../../img/bg.jpg')`
    }

    function render(arr, parent) {
        parent.innerHTML = ''

        arr.sort()
        
        arr.forEach((item, index) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">
                ${ index + 1 } ${ item }
                <div class="delete" data-id="${ index }"></div>
            </li>
        `
        })
    }

    function createFormListener(form) {
        form.addEventListener('submit', submit)
    }

    function submit(event) {
        event.preventDefault()
        let value = input.value

        if (!value) return
        if (value.length > 21) value = `${ value.slice(21) }...`
        if (checkbox.checked) console.log('Добавляем любимый фильм')

        movieDB.movies.push(value)
        movieDB.movies.sort()
        render(movieDB.movies, promoList)
        createRemoveListeners()

        event.target.reset()
    }

    function createRemoveListeners() {
        const removeItems = document.querySelectorAll('.promo__interactive-item .delete')

        removeItems.forEach(el => {
            el.addEventListener('click', remove)
        })
    }

    function remove(event) {
        const parent = event.target.parentElement
        const id = +event.target.dataset.id

        parent.remove()
        movieDB.movies.splice(id, 1)

        render(movieDB.movies, promoList)
        createRemoveListeners()
    }

    removeAdv(promotion)
    makeChanges()
    render(movieDB.movies, promoList)
    createFormListener(form, movieDB.movies)
    createRemoveListeners()
})
