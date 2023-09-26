async function getNames() {
  const res = await fetch('/posts');
  const guests = await res.json();
  return guests;
}



async function renderNames() {
  document.querySelector('.guests').innerHTML = '';
  const guests = await getNames();

  guests.forEach((guest) => {
    const { username, _id } = guest;

    const xmark = document.createElement('i');
    xmark.classList.add('fa-solid');
    xmark.classList.add('fa-xmark');

    const div = document.createElement('div');
    div.classList.add('guest-container');
    div.id = _id;

    const h3 = document.createElement('h3');
    h3.id = 'guest';
    h3.textContent = username;

    document.querySelector('.guests').appendChild(div);
    div.appendChild(h3);
    div.appendChild(xmark);
    const userInStorage = localStorage.getItem('userName');
    userInStorage === `"${username}"`
      ? (xmark.style.visibility = 'visible')
      : (xmark.style.visibility = 'hidden');
    countGuests(guests.length);
  });

  chkAdmin();
}

function setUserName(e) {
  const userName = document.querySelector('#name');
  const userInStorage = localStorage.getItem('username');
  localStorage.setItem('userName', JSON.stringify(userName.value));
}

async function countGuests(numberOfGuests) {
  const numberEl = document.getElementById('guest-count');

  // numberEl === 0
  //   ? (numberEl.textContent = '0')
  //   : (numberEl.textContent = numberOfGuests);
}

async function chkAdmin() {
  const xmarks = document.querySelectorAll('.fa-xmark');
  if (localStorage.getItem('admin') === 'admin') {
    xmarks.forEach((icon) => (icon.style.visibility = 'visible'));
  }
}

function updateCountDown() {
  const targetDate = new Date('2023-09-27T21:00');
  const countdownElement = document.getElementById('countdown');
  const currentTime = new Date();

  const timeDifference = targetDate - currentTime;

  if (timeDifference <= 0) {
    countdownElement.textContent = 'Anmälan är stängd.';
    document.querySelector('form').style.display = 'none';
  } else {
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    if (days !== 0 && hours === 1) {
      countdownElement.innerHTML = `Fyll i ditt namn för att anmäla dig. <br>
        Anmälan stänger om ${days} dag, ${hours} timma och ${minutes} minuter`;
    } else if (days !== 0 && hours !== 1) {
      countdownElement.innerHTML = `Fyll i ditt namn för att anmäla dig. <br>
        Anmälan stänger om ${hours} timmar och ${minutes} minuter`;
    } else if (days === 0 && hours > 1) {
      countdownElement.innerHTML = `Fyll i ditt namn för att anmäla dig. <br>
        Anmälan stänger om ${hours} timmar och ${minutes} minuter`;
    } else if (days === 0 && hours === 1) {
      daysAndHours = hours;
      countdownElement.innerHTML = `Fyll i ditt namn för att anmäla dig. <br>
        Anmälan stänger om ${hours} timma och ${minutes} minuter`;
    } else if (hours === 0) {
      countdownElement.innerHTML = `Fyll i ditt namn för att anmäla dig. <br>
        Anmälan stänger om ${minutes} minuter`;
    }
  }
}

function findUser(e) {
  if (e.target.classList.contains('fa-xmark')) {
    e.stopImmediatePropagation();
    deleteOwnName(e.target.parentElement.id);
    setTimeout(() => {
      renderNames();
    }, 199);
  }
}

async function deleteOwnName(id) {
  const username = localStorage.getItem('userName')
    ? localStorage.getItem('userName')
    : '';
  try {
    const response = await fetch(`posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Något gick fick, DELETE misslyckades');
    }

    const data = await response.json();
    console.log('Delete Complete!');
  } catch (error) {
    console.log(error);
  }
}

document.querySelector('form').addEventListener('submit', setUserName);
document.querySelector('.guests').addEventListener('click', findUser);

function init() {
  renderNames();
  updateCountDown();
  const countdownInterval = setInterval(() => {
    updateCountDown();
  }, 1000);
}

init();
