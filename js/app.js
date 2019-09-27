eventListener();

function eventListener(){
    let ui = new UI;

    window.addEventListener('load', function(){
        ui.hidePreloader()
    })
    
    document.querySelector('.navBtn').addEventListener('click', function(){
        ui.showNav()
    })

    document.querySelector('.video__switch').addEventListener('click', function(){
        ui.videoControls()
    })

    document.querySelector('.input-submit').addEventListener('click', function(event){
        event.preventDefault()
        let name = document.querySelector('.input-name').value;
        let lastName = document.querySelector('.input-lastname').value;
        let email = document.querySelector('.input-email').value;

        let value = ui.checkEmpty(name, lastName, email);
        console.log(value)
        if(value){
            let customer = new Customer(name, lastName, email);
            ui.addItem(customer)
            ui.showFeedback('custumer added to the list', 'success');
            ui.clearFields()
        }else{
            ui.showFeedback('some form values empty','error')
        }
    })

    let links = document.querySelectorAll('.work-item__icon');

    links.forEach(function(item){
        item.addEventListener('click', function(event){
            ui.showModal(event)
        })
    })

    document.querySelector('.work-modal__close').addEventListener('click', function(){
        ui.closeModal(event)
    })
}

function UI(){}

UI.prototype.showModal = function(event){
    event.preventDefault();
    if(event.target.parentElement.classList.contains('work-item__icon')){
        let id = event.target.parentElement.dataset.id;
        let modal = document.querySelector('.work-modal');
        let modalItem = document.querySelector('.work-modal__item');

        modal.classList.add('work-modal--show');
        modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`;
    }
}

UI.prototype.closeModal = function(){
    document.querySelector('.work-modal').classList.remove('work-modal--show')
}

UI.prototype.clearFields = function(){
    document.querySelector('.input-name').value = "";
    document.querySelector('.input-lastname').value = "";
    document.querySelector('.input-email').value = "";
}

UI.prototype.hidePreloader = function(){
    document.querySelector('.preloader').style.display = "none";
}

UI.prototype.showNav = function(){
    document.querySelector('.nav').classList.toggle('nav--show')
}

UI.prototype.videoControls = function(){
    let btn = document.querySelector('.video__switch-btn');
    if(!btn.classList.contains('btnSlide')){
        btn.classList.add('btnSlide');
        document.querySelector('.video__item').pause();
    }else{
        btn.classList.remove('btnSlide');
        document.querySelector('.video__item').play();
    }
}

UI.prototype.checkEmpty = function(name, lastName, email){
    if(name === '' || lastName === '' || email === ''){
        return false;
    }else{
        return true
    }
}

UI.prototype.showFeedback = function(text, type){
    let feedback = document.querySelector('.drink-form__feedback')
    if(type === 'success'){
        feedback.classList.add('success');
        feedback.textContent = text;
        this.removeAlert(type);
    }else if(type === 'error'){
        feedback.classList.add('error');
        feedback.textContent = text;
        this.removeAlert(type);
    }
}

UI.prototype.removeAlert = function(type){
    setTimeout(function(){
        document.querySelector('.drink-form__feedback').classList.remove(type)
    },3000)
}

UI.prototype.addItem = function(customer){
    let random = this.getRandom();
    console.log(random)
    let list = document.querySelector('.drink-card__list');
    let div = document.createElement('div');
    div.classList.add('person');
    div.innerHTML = `
        <img src="img/person-${random}.jpeg" alt="person" class="person__thumbnail">
        <h4 class="person__name">${customer.name}</h4>
        <h4 class="person__last-name">${customer.lastname}</h4>
    `
    list.appendChild(div)
}

UI.prototype.getRandom = function(){
    let images = [1,2,3,4,5]
    let random = Math.floor((Math.random() * images.length))
    return random
}

function Customer(name, lastname, email){
    this.name = name;
    this.lastname = lastname;
    this.email = email
}