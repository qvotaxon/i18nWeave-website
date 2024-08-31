// // Get all sections
// const sections = document.querySelectorAll('section');
// let currentSection = 0;

// function scrollToSection(index) {
//     sections[index].scrollIntoView({
//         behavior: 'smooth'
//     });
// }

// let timeout;

// window.addEventListener('wheel', (event) => {
//     if (event.deltaY > 0) {
//         // Scrolling down
//         if (currentSection < sections.length - 1) {
//             currentSection++;
//             scrollToSection(currentSection);
//         }
//     } else {
//         // Scrolling up

//         console.log(currentSection);
//         if (currentSection > 0) {
            
//             currentSection--;
//             timeout = setTimeout(() => {
//                 scrollToSection(currentSection);
//             }, 100);
//             // scrollToSection(currentSection);
//         }
//     }
// });

// let startY;
// let endY;

// window.addEventListener('touchstart', (event) => {
//     startY = event.touches[0].clientY;
// });

// window.addEventListener('touchend', (event) => {
//     endY = event.changedTouches[0].clientY;
//     if (startY > endY) {
//         // Swipe up
//         if (currentSection < sections.length - 1) {
//             currentSection++;
//             scrollToSection(currentSection);
//         }
//     } else {
//         // Swipe down
//         if (currentSection > 0) {
//             currentSection--;
//             scrollToSection(currentSection);
//         }
//     }
// });