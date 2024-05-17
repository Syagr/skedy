let schedules = {}; // Храните все расписания здесь

function loadSchedule() {
    const fileInput = document.getElementById('jsonFile');
    if (!fileInput.files.length) {
        alert('Please choose a file');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (!data.schedule) {
                alert('Invalid file format');
                return;
            }
            schedules[file.name] = data; // Добавьте новое расписание в объект
            displaySchedule(data.schedule); 
        } catch (error) {
            alert('Error parsing JSON file');
        }
    };

    reader.onerror = function() {
        alert('Error reading file');
    };

    reader.readAsText(file);
}

async function loadSelectedSchedule() {
    const select = document.getElementById('jsonSelect');
    const selectedFile = select.options[select.selectedIndex].value;

    try {
        const response = await fetch(selectedFile);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (!data.schedule) {
            alert('Invalid file format');
            return;
        }

        schedules[selectedFile] = data; // Добавьте новое расписание в объект
        displaySchedule(data.schedule);
    } catch (error) {
        alert('Error loading schedule: ' + error.message);
    }
}
function displaySchedule(schedule) {
    const scheduleContainer = document.getElementById('schedule');
    scheduleContainer.innerHTML = '';

    schedule.forEach((day) => {
        const date = new Date(day.date);
        const formattedDate = date
            .toLocaleDateString('en-EN', {
                weekday: 'long',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            })
            .replace(/\//g, '.');

        const dayScheduleWrapper = document.createElement('div');
        dayScheduleWrapper.className = 'schedule-container__wrapper';

        const dateHeader = document.createElement('h3');
        dateHeader.textContent = formattedDate;
        dayScheduleWrapper.appendChild(dateHeader);

        const lessonList = document.createElement('ul');
        day.lessonList.forEach((lesson) => {
            const lessonItem = document.createElement('li');
            lessonItem.innerHTML = `<strong>${lesson.subject}</strong>: <br>${lesson.time}, <br>${lesson.teacher}, <br><strong>aud. ${lesson.classroom}</strong>`;
            lessonList.appendChild(lessonItem);
        });

        dayScheduleWrapper.appendChild(lessonList);
        scheduleContainer.appendChild(dayScheduleWrapper);
    });
}