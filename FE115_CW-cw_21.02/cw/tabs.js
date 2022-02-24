const tabs = function (mainSelector){
    const tabsContainer = document.querySelector(mainSelector);

    let tabs = tabsContainer.querySelector('.tabs').children;
    if(tabs.length === 0) return;

    let tabContent = tabsContainer.querySelector('.tab-content').children;
    if(tabContent.length === 0 || tabContent.length !== tabs.length) return;


    [...tabs].map((elem, i) => {
       elem.addEventListener('click', function (){
           show(i);
       })
    });

    function show(i){
        [...tabs].map((elem, i) => {
            elem.classList.remove('active');
            tabContent[i].classList.remove('active');
        })
        tabs[i].classList.add('active');
        tabContent[i].classList.add('active');
    }
}

tabs('.tabs-conteiner')

let getCoords = (elem) => {
    let box = elem.getBoundingClientRect();
    console.log(box);
    console.log(window.scrollY);
    console.log(window.pageXOffset)
    return {
        'top': box.y  < 30 ? `calc(${box.top}px + ${window.scrollY}px + ${box.height}px)` : `calc(${box.top}px + ${window.scrollY}px - 2em)`,
        'left': box.left + (box.width / 2) + window.scrollX
    }
}

function tooltip() {
    let elements = document.querySelectorAll('.tooltip');

    [...elements].map(element => {
        element.addEventListener('mouseenter', function (e) {
            let cords = getCoords(this);
            createTooltip(e, cords);
        });
        element.addEventListener('mouseout', function (e) {
            deleteTooltip()
        });

    })


    function createTooltip(e, cords) {
        console.log(e.target)
        
        let elem = document.createElement('div');
        elem.setAttribute('class', 'tooltip-element');
        elem.textContent = e.target.title
        elem.style.cssText = `
        left: calc(${cords.left}px - 100px);
        top: ${cords.top };
        `
        
        document.body.append(elem);
    }
    function deleteTooltip() {
        document.querySelector('.tooltip-element').remove();
    }
}

tooltip()