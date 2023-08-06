
/* ~~~~~~~~~~ Query Selectors  ~~~~~~~~~~*/
const loginButton = document.querySelector('.login-submit-button');

/* ~~~~~~~~~~ Login form submit event  ~~~~~~~~~~*/







/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// const initializeApp = () => {
//     currentUser = getRandomUser(users);
//     sleepCurrentDate = findCurrentDateInRange(currentUser.id, sleep, activity);
//     activityCurrentDate = findCurrentDateInRange(currentUser.id, sleep, activity);
//     currentDate = findCurrentDate(currentUser.id, hydration, sleep, activity);
//     displayRandomUser(activity, currentUser);
//     displayFluidConsumedToday(hydration, currentUser, currentDate);
//     displayDailySleep(sleep, currentUser, sleepCurrentDate);
//     displayAverageSleep(sleep, currentUser, sleepCurrentDate);
//     displayActivity(activity, currentUser, activityCurrentDate);
//     stepsPerDay(activity, currentUser, currentDate);
//     activeMinutesPerDay(activity, currentUser, activityCurrentDate);
//     displayWeeklyStepCount(activity, currentUser, activityCurrentDate);
//     displayRandomQuote();
//     setMotivationLevel('level');
  
//     const formElement = document
//       .getElementById('form')
//       .addEventListener('submit', function (event) {
//         console.log('Form submitted!');
//         event.preventDefault();
  
//         const formData = new FormData(event.target);
  
//         const postUserInput = {
//           userID: currentUser.id,
//           date: '2023/07/02',
//           numOunces: formData.get('waterIntake'),
//         };
  
//         console.log('Form submitted!');
  
//         postSavedHydration(postUserInput)
//           .then((json) => {
//             displayNewHydrationEntry(json);
//             console.log(json);
//           })
//           .catch((err) => console.error(`Error at: ${err}`));
  
//         event.target.reset();
//       });

// const motivationLevels = {
//     level1: {
//       title: 'Not Motivated',
//       description: 'Fried',
//       descriptionText: 'Feeling overwhelmed',
//       image: './images/L1a.jpg',
//       advice: 'Prioritize self-care. Spend some time outside.',
//     },
//     level2: {
//       title: 'Slightly Motivated',
//       description: 'Fluttering Feathers.',
//       descriptionText: 'Starting to feel motivated.',
//       image: './images/L2.jpg',
//       advice: 'Celebrate the small wins!',
//     },
//     level3: {
//       title: 'Moderately Motivated',
//       description: 'Cluck and Strut!',
//       descriptionText: 'Stepping up to the challenge.',
//       image: './images/L3.jpg',
//       advice: 'Stay focused and surround yourself with positive influences!',
//     },
//     level4: {
//       title: 'Highly Motivated',
//       description: 'Cock-a-doodle Can-Do!',
//       descriptionText: 'Feeling eggs-cited and energized!',
//       image: './images/L4.jpg',
//       advice: 'Embrace challenges and maintain a can-do attitude.',
//     },
//     level5: {
//       title: 'Extremely Motivated',
//       description: 'Hard-Boiled Dynamo!',
//       descriptionText: 'Congratulations! Maximum motivation achieved!',
//       image: './images/L5.jpg',
//       advice: 'Keep pushing your limits and inspiring others!',
//     },
//   };
  
//   const setMotivationLevel = (level) => {
//     let motivationLevel = motivationLevels[level];
//     if (motivationLevel) {
//       motivationTitle.innerText = motivationLevel.title;
//       motivationDescription.innerText = motivationLevel.description;
//       motivationText.innerHTML = motivationLevel.descriptionText;
//       motivationImage.src = motivationLevel.image;
//       motivationAdvice.innerHTML = motivationLevel.advice;
//       motivationDropdown.value = level;
//     } else {
//       motivationTitle.innerText = 'Get Motivated!';
//       motivationDescription.innerText = 'Choose your level';
//       motivationText.innerHTML =
//         'The only limit to your greatness is the extent of your determination.';
//       motivationImage.src = './images/default.jpg';
//       motivationImage.alt = '';
//       motivationAdvice.innerHTML = '';
//       motivationDropdown.value = '';
//     }
//   };
  
//   motivationDropdown.addEventListener('change', (event) => {
//     setMotivationLevel(event.target.value);
//   });
  