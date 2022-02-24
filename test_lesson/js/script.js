let cl = console.log;

let delivery = (fio, phone, email, deliMethod, dateNow, startPoint, finPoint, dateStart, dateFin, form) => {
  cl('hihi')
  let fieldName = fio.value,
      fieldPhone = phone.value,
      fieldEmail = email.value,
      fieldDeliMet = deliMethod.value,
      fieldDateCurrent = dateNow.value,
      fiedDistA = startPoint.value,
      fiedDistB = finPoint.value,
      fiedDateDeparture = dateStart.value,
      fiedDateDelivery = dateFin.value;
    
  let price = calculation(fiedDistA, fiedDistB, fieldDeliMet, prices, distances);
    
  if(document.querySelector('.result')) document.querySelector('.result').remove();

  let result = document.createElement('div');
      result.setAttribute('class', 'result');

  result.innerHTML = `<span>Дата расчета - ${fieldDateCurrent}</span>
  <span>Способ доставки - ${fieldDeliMet}</span>
  <span>Путь доставки - "${fiedDistA}(${fiedDateDeparture})  -> ${fiedDistB}(${fiedDateDelivery})"</span>
  <span>Стоимость, руб. - ${price}</span>
  <span>ФИО - ${fieldName} </span>
  <span>телефон - ${fieldPhone} </span>
  <span>эл. почта - ${fieldEmail}</span>`;
  form.append(result);
    
  }
  
  let showForm = () => {
  let deliveryMethods = ['самолет', 'такси', 'частный водитель', 'пеший курьер'],
      destinations = ['Минск', 'Брест', 'Витебск', 'Могилев', 'Гродно', 'Гомель'];

  let form = document.createElement('form');
  form.setAttribute('class', 'form');
    

  let fio = document.createElement('input');
  fio.setAttribute('type', 'text');
  fio.setAttribute('class', 'fio');
  fio.setAttribute('placeholder', 'Your full name');
  fio.required = 'true';

  let phone = document.createElement('input');
  phone.setAttribute('type', 'tel');
  phone.setAttribute('class', 'phone');
  phone.setAttribute('placeholder', 'Your full phone');
  phone.required = 'true';

  let email = document.createElement('input');
  email.setAttribute('type', 'email');
  email.setAttribute('class', 'email');
  email.setAttribute('placeholder', 'Your full e-mail');
  email.required = 'true';

  let deliMethod = document.createElement('select');
  deliMethod.setAttribute ('class', 'drop_down deli_method');
  deliMethod.innerHTML += deliveryMethods.map((elem, index) => {
    return `<option id='dMet${index + 1} value="${elem}'>${elem}</option>`;
  });
  deliMethod.required = true;

  let dateToday = new Date();
  let options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  };

  let dateNow = document.createElement('input');
  dateNow.setAttribute('class', 'date_delivery');
  dateNow.value =  dateToday.toLocaleString("ru", options);
  dateNow.disabled = true;

  let startPoint = document.createElement('select');
  startPoint.setAttribute ('class', 'drop_down start_point');
  startPoint.innerHTML += destinations.map((elem, index) => {
    return `<option id='dMet${index + 1}'">${elem}</option>`;
  });

  let finPoint = document.createElement('select');
  finPoint.setAttribute ('class', 'drop_down fin_point');
  finPoint.innerHTML += destinations.map((elem, index) => {
    return `<option id='dMet${index + 1}'">${elem}</option>`;
  });

  let dateStart = document.createElement('input');
  dateStart.setAttribute('type', 'date');
  dateStart.setAttribute('class', 'date_start');
  dateStart.required = 'true';

  let dateFin = document.createElement('input');
  dateFin.setAttribute('type', 'date');
  dateFin.setAttribute('class', 'date_fin');
  dateFin.required = 'true';

  let submit = document.createElement('button');
  submit.setAttribute('type', 'submit');
  submit.setAttribute('class', 'submit_form');
  submit.innerText = 'Рассчитать стоимость';

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    delivery(fio, phone, email, deliMethod, dateNow, startPoint, finPoint, dateStart, dateFin, form);
  });

  document.querySelector('script').before(form);
  form.append(fio, phone, email, deliMethod, dateNow, startPoint, finPoint, dateStart, dateFin, submit);
  for(let i = 0; i < form.childNodes.length; ++i) {
    form.childNodes[i].addEventListener('change', function () {
      let check = false;
      for (let j = 0; j < form.childNodes.length - 1; ++j) {
        if(form.childNodes[j].value == '') {
          check = false;
          break;
        }
        check = true;
      }
      if(check == true) delivery(fio, phone, email, deliMethod, dateNow, startPoint, finPoint, dateStart, dateFin, form);
    });
  }
}

let calculation = (a, b, met, arrPrice, arrDis) => {
  let dis = null,
      metPrice = null;
  for(let i = 0; i < arrDis.length; ++i) {
    
    if(((arrDis[i].a == a || arrDis[i].a == b) && (arrDis[i].b == a || arrDis[i].b == b) && (arrDis[i].a != arrDis[i].b)) || (arrDis[i].a == a && arrDis[i].a == b && arrDis[i].b == a && arrDis[i].b == b && a == b)) {
      dis = arrDis[i].d;
      break;
    }
  }
  for(let i =0; i < arrPrice.length; ++i) {
    if(arrPrice[i].method == met) {
      metPrice = arrPrice[i].price;
      break;
    }
  }
  cl(dis);
  cl(metPrice);
  return dis * metPrice;
}

let distances = [
  {
    a: 'Минск',
    b: 'Минск',
    d: 18
  },
  {
    a: 'Минск',
    b: 'Брест',
    d: 351
  },
  {
    a: 'Минск',
    b: 'Витебск',
    d: 291
  },
  {
    a: 'Минск',
    b: 'Могилев',
    d: 198
  },
  {
    a: 'Минск',
    b: 'Гродно',
    d: 276
  },
  {
    a: 'Минск',
    b: 'Гомель',
    d: 312
  },
  {
    a: 'Брест',
    b: 'Брест',
    d: 41
  },
  {
    a: 'Брест',
    b: 'Витебск',
    d: 633
  },
  {
    a: 'Брест',
    b: 'Могилев',
    d: 535
  },
  {
    a: 'Брест',
    b: 'Гродно',
    d: 235
  },
  {
    a: 'Брест',
    b: 'Гомель',
    d: 649
  },
  {
    a: 'Витебск',
    b: 'Витебск',
    d: 41
  },
  {
    a: 'Витебск',
    b: 'Могилев',
    d: 158
  },
  {
    a: 'Витебск',
    b: 'Гродно',
    d: 565
  },
  {
    a: 'Витебск',
    b: 'Гомель',
    d: 329
  },
  {
    a: 'Могилев',
    b: 'Могилев',
    d: 41
  },
  {
    a: 'Могилев',
    b: 'Гродно',
    d: 483
  },
  {
    a: 'Могилев',
    b: 'Гомель',
    d: 177
  },
  {
    a: 'Гродно',
    b: 'Гродно',
    d: 41
  },
  {
    a: 'Гродно',
    b: 'Гомель',
    d: 597
  },
  {
    a: 'Гомель',
    b: 'Гомель',
    d: 41
  }
];

let prices = [
  {
    method: 'самолет', 
    price: 7
  },
  {
    method: 'такси', 
    price: 5
  },
  {
    method: 'частный водитель', 
    price: 3
  },
  {
    method: 'пеший курьер', 
    price: 1
  },
];
showForm();