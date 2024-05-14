fetch('schedule.json')
  .then(response => response.json())
	.then(data => displaySchedule(data.schedule));
  
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

// Fetch the schedule data and display it
fetch('schedule.json')
  .then(response => response.json())
  .then(data => displaySchedule(data.schedule));