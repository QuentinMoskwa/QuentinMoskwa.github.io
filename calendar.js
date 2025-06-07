
document.getElementById('infoButton').addEventListener('click', function () {
  document.getElementById('infoModal').style.display = 'flex';
});

function closeInfoModal() {
  document.getElementById('infoModal').style.display = 'none';
}






let selectedDate = null;
let calendar = null;

function addEventFromModal(status) {
  const name = document.getElementById('nameInput').value.trim();
  const endDate = document.getElementById('endDate').value;
  const note = document.getElementById('noteInput').value.trim();


  if (!name || !selectedDate || !endDate) return;

  const colors = {
    "DISPO": "#4CAF50",
    "PROVISOIRE": "#FFC107",
    "PAS DISPO": "#F44336"
  };

  const start = new Date(selectedDate);
  const end = new Date(endDate);


  // Boucle jour par jour
  for (let d = new Date(start); d <= end; d.setDate(d.getDate()+1)) {
    const dateStr = d.toISOString().split('T')[0];

    const newEvent = {
      name: name,
      dispo: status,
      date: dateStr,
      note: note
    };


    fetch('https://qmoskwa.alwaysdata.net/save-event.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        calendar.refetchEvents();
      } else {
        alert('Erreur lors de l’ajout de l’événement pour le ' + dateStr);
      }
    })
    .catch(() => {
      alert('Erreur réseau pour le ' + dateStr);
    });
  }

  closeModal();
}


function openModal(dateStr) {
  const name = document.getElementById('nameInput').value.trim();
      if (!name) {
        return;
      }
  selectedDate = dateStr;
  const startInput = document.getElementById('startDate');
  const endInput = document.getElementById('endDate');

  startInput.value = dateStr;
  endInput.value = dateStr;
  endInput.min = dateStr; // Empêche de choisir une date avant

  document.getElementById('popup').style.display = 'flex';
}


function closeModal() {
  selectedDate = null;
  document.getElementById('popup').style.display = 'none';
}

function openEditModal(event) {
  selectedEvent = event;

  const namePart= event.title || '';
  var notePart = event.note || '';
  document.getElementById('editNameInput').value = namePart || '';
  document.getElementById('editDispoSelect').value = event.extendedProps.dispo || dispoPart?.trim() || '';
  document.getElementById('editNoteInput').value = event.extendedProps.note || notePart || '';

  document.getElementById('editModal').style.display = 'flex';
}

function closeEditModal() {
  selectedEvent = null;
  document.getElementById('editModal').style.display = 'none';
}

function updateEvent() {
  if (!selectedEvent) return;

  const name = document.getElementById('editNameInput').value.trim();
  const dispo = document.getElementById('editDispoSelect').value;
  const note = document.getElementById('editNoteInput').value.trim();

  fetch('https://qmoskwa.alwaysdata.net/update-event.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: selectedEvent.id,
      name: name,
      dispo: dispo,
      note: note
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      calendar.refetchEvents();
      closeEditModal();
    } else {
      alert('Erreur lors de la mise à jour');
    }
  });
}

function deleteEvent() {
  if (!selectedEvent) return;

  if (!confirm('Supprimer cet événement ?')) return;

  fetch('https://qmoskwa.alwaysdata.net/delete-event.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: selectedEvent.id })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      calendar.refetchEvents();
      closeEditModal();
    } else {
      alert('Erreur lors de la suppression');
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const savedName = localStorage.getItem('nouUserName');
    if (savedName) {
      document.getElementById('nameInput').value = savedName;
    }
  const calendarEl = document.getElementById('calendar');

  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'fr',
    firstDay: 1,
    selectable: true,
    events: 'https://qmoskwa.alwaysdata.net/get-events.php',

    eventContent: function(arg) {
      const hasNote = arg.event.extendedProps.note;
      const icon = hasNote ? " 📝" : "";

      return {
        html: `<div>${icon}${arg.event.title}</div>`
      };
    },

    dateClick: function (info) {
      const name = document.getElementById('nameInput').value.trim();
      if (!name) {
        alert('Veuillez entrer votre nom avant d’ajouter une disponibilité.');
        return;
      }

      openModal(info.dateStr);
    },

    eventClick: function(info) {
      openEditModal(info.event);
    }


  });

  calendar.render();

  // add button to every fc-daygrid-day-frame 
  const dayFrames = document.querySelectorAll('.fc-daygrid-day-top');
  dayFrames.forEach(frame => {
    const button = document.createElement('button');
    button.className = 'add-event-button';

    // Créer une image
    const img = document.createElement('img');
    img.src = 'src/img/70310.png';
    img.alt = '+';
    img.style.width = '100%';
    img.style.aspectRatio = '1 / 1';
    img.style.padding = '5px';

    // Ajouter l'image dans le bouton
    button.appendChild(img);

    // Gérer le clic
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const dateStr = frame.getAttribute('data-date');
      openModal(dateStr);
    });

    // Ajouter le bouton au jour
    frame.appendChild(button);
  });


  // Fermer la modale si on clique dehors
  window.addEventListener('click', function (e) {
    const popup = document.getElementById('popup');
    if (e.target === popup) {
      closeModal();
    }
  });

  document.getElementById('nameInput').addEventListener('input', function () {
    const name = this.value.trim();
    localStorage.setItem('nouUserName', name);
  });

});
