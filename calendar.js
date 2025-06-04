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

      calendar.addEvent({
        title: `${name} - ${status}`,
        start: selectedDate,
        backgroundColor: colors[status],
        borderColor: colors[status]
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
            info.event.remove();
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