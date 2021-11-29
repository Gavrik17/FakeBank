function sliderAmount() {
    var slide = document.getElementsByClassName('amount')
    var p = document.getElementsByClassName('amountres')


    for (let i = 0; i < slide.length; i++){
        p[i].innerHTML = `Сумма: ${slide[i].value} рублей`
    }
}

function sliderTerm() {
    var slide = document.getElementsByClassName('term')
    var p = document.getElementsByClassName('termres')


    for (let i = 0; i < slide.length; i++){
        p[i].innerHTML = `Срок: ${slide[i].value} месяцев`
    }
}