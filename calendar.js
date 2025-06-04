let selectedDate = null;
let calendar = null;

function addEventFromModal(status) {
  const name = document.getElementById('nameInput').value.trim();
  if (!name || !selectedDate) return;

  const colors = {
    "DISPO": "#4CAF50",
    "PROVISOIRE": "#FFC107",
    "PAS DISPO": "#F44336"
  };

  const newEvent = {
    name: name,
    dispo: status,
    date: selectedDate
  };

  fetch('https://qmoskwa.alwaysdata.net/save-event.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newEvent)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      calendar.addEvent({
        id: data.id,
        title: `${name} - ${status}`,
        start: selectedDate,
        backgroundColor: colors[status],
        borderColor: colors[status],
        allDay: true
      });
      calendar.refetchEvents();
    } else {
      alert('Erreur lors de l’ajout de l’événement');
    }
  });

  closeModal();
}

function openModal(dateStr) {
  selectedDate = dateStr;
  document.getElementById('popup').style.display = 'flex';
}

function closeModal() {
  selectedDate = null;
  document.getElementById('popup').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');

  calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'fr',
    firstDay: 1,
    selectable: true,
    events: 'https://qmoskwa.alwaysdata.net/get-events.php',

    dateClick: function (info) {
      const name = document.getElementById('nameInput').value.trim();
      if (!name) {
        alert('Veuillez entrer votre nom avant d’ajouter une disponibilité.');
        return;
      }

      openModal(info.dateStr);
    },

    eventClick: function (info) {
      if (confirm(`Supprimer cet événement ?\n(${info.event.title})`)) {
        const eventId = info.event.id;

        fetch('https://qmoskwa.alwaysdata.net/delete-event.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: eventId })
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            info.event.remove();
            calendar.refetchEvents();
          } else {
            alert('Erreur lors de la suppression');
          }
        });
      }
    }
  });

  calendar.render();

  // Fermer la modale si on clique dehors
  window.addEventListener('click', function (e) {
    const popup = document.getElementById('popup');
    if (e.target === popup) {
      closeModal();
    }
  });
});
