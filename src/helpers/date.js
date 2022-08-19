const START_MONTH = '02';
const START_YEAR = '2022';

function makeMonthHumanReadable(currentMonth){
    let monthValue = '';

    if(currentMonth === 0){
        monthValue = '01';
    }else if(currentMonth > 8){
        monthValue = `${currentMonth + 1}`
    }else {
        monthValue = `0${currentMonth + 1}`
    }

    return monthValue;
}

export function getArrayOfMonthesToCurrentDate(){
    const startInvasionYear = 2022;
    const startInvasionMonth = 1; // means February

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const arrayOfDates = [];

    for(let i = currentYear; i >= startInvasionYear; i--){

        let startMonth = 11;
        let endMonth = 0;
        if(i === 2022){
            endMonth = startInvasionMonth;
        }
        if(i === currentYear){
            startMonth = currentMonth;
        }
        for(let y = startMonth; y >= endMonth; y--){
            arrayOfDates.push(`${i}-${makeMonthHumanReadable(y)}`);
        }
    }

    return arrayOfDates;
}