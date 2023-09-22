async function getNames() {
    const res = await fetch('/posts');
    const guests = await res.json();
    return guests;
}

async function displayNames () {
    const guests = await getNames();

    guests.forEach(guest => {
        const { username, foodType } = guest;

        const xmark = document.createElement('i');
        xmark.classList.add('fa-solid');
        xmark.classList.add('fa-xmark'); 

        const div = document.createElement('div');
        div.classList.add('guest-container');

        const h3 = document.createElement('h3');
        h3.id = 'guest';
        h3.textContent = username;

        document.querySelector('.guests').appendChild(div);
        div.appendChild(h3);
        div.appendChild(xmark);
        
        countGuests(guests.length);
    });

    chkAdmin();
}

function setUserName(e) {
    const userName = document.querySelector('#name');
    const userInStorage = localStorage.getItem('username')
    localStorage.setItem('userName', JSON.stringify(userName.value));
}

async function countGuests (numberOfGuests) {
    const numberEl = document.getElementById('guest-count').textContent = numberOfGuests;
}

async function chkAdmin() {
    const xmarks = document.querySelectorAll('.fa-xmark');
        if (localStorage.getItem('admin') !== null) {
            xmarks.forEach(icon => icon.style.visibility = 'visible');
            console.log('You are the admin!');
        }
}

function updateCountDown() {
    const targetDate = new Date('2023-09-24T23:59:59');
    const countdownElement = document.getElementById('countdown');
    const currentTime = new Date();

    const timeDifference = targetDate - currentTime;

    if (timeDifference <= 0) {
        countdownElement.textContent = 'Tiden är ute!';
      } else {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    
        countdownElement.innerHTML = `Fyll i ditt namn för att anmäla dig. <br>
        Anmälan stränger om ${days} dagar, ${hours} timmar, ${minutes} minuter och ${seconds} sekunder.`;
      }
}


// function deleteGuest() {
//     const userName = localStorage.getItem('userName') ? localStorage.getItem('userName') : '';
//     return 
// }

document.querySelector('form').addEventListener('submit', setUserName);

function init() {
    displayNames();
    const countdownInterval = setInterval(() => {
        updateCountDown();
    }, 1000);
}

init();