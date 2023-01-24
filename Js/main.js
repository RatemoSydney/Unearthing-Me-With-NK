const dateLink = document.querySelector('.diary-link'),
    cancelBtn = document.querySelector('.cancel');

dateLink.addEventListener('click',() => {
    let popUp = document.querySelector('.diary');
    //popUp.classList.toggle('active');
    popUp.style.display ='contents';
});
cancelBtn.addEventListener('click',() => {
    let popUp = document.querySelector('.diary');
    //popUp.classList.toggle('deactivate');
    popUp.style.display ='none';
});

//CALENDAR

let date = new Date(),
    currentYear = date.getFullYear(),//getting current year
    currentMonth = date.getMonth(),//getting current month
    daysOfWeek = document.querySelector('.days'),
    icons = document.querySelectorAll('.icons span'),
    currentDate = document.querySelector('.currentdate');

const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const calendarRender = () => {
    let firstMonthDate = new Date(currentYear,currentMonth, 1).getDay(),//get first date of month
        lastMonthDate = new Date(currentYear,currentMonth + 1, 0).getDate(),//get last date of month
        lastMonthLastDates = new Date(currentYear,currentMonth, 0).getDate(),//get last date of previous month
        lastDayofMonth = new Date(currentYear,currentMonth, lastMonthDate).getDay(),//get last date of previous month
        tag = "";

    //To show last month's dates
    for (let i =  firstMonthDate; i > 0; i--) {
        tag += `<li class="inactive">${lastMonthLastDates -i +1}</li>`;
    }

    //To show current month's dates
    for (let i = 1; i <= lastMonthDate; i++) {
        let isToday = i === date.getDate() && currentMonth === date.getMonth() && currentYear === date.getFullYear() ? "active" : "";
        tag += `<li class="${isToday}">${i}</li>`;
    }
    
    //To show next month's dates
    for (let i = lastDayofMonth; i < 6; i++) {
        tag += `<li class="inactive">${i - lastDayofMonth +1}</li>`;
        
    }

    currentDate.innerHTML = `${months[currentMonth]} ${currentYear}`;
    daysOfWeek.innerHTML = tag;
} 
calendarRender();

icons.forEach(icon => {
    /*
    let prevBtn = document.querySelector('#prev'),
        nextBtn = document.querySelector('#next');
    */
    icon.addEventListener('click',()=>{
        currentMonth = icon.id === "prev" ? currentMonth -1 : currentMonth +1;
        
        //Showing next year
        if(currentMonth < 0 || currentMonth > 11){
            //creating new date for new current month and year to pass as date value
            date = new Date(currentYear,currentMonth);
            currentYear = date.getFullYear(); //Updating current year with new date year
            currentMonth = date.getMonth(); //Updating current month with new date month
        }else{
            date = new Date(); //Else pass new date as current date
        }

        calendarRender();
    });
});