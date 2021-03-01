import { handleClick } from './js/clickHandler'
import { updateUI } from './js/updateUI'
import { postData } from './js/postData'
import { getData } from './js/getData'
import { updatePics } from './js/populateInspiration'
import { withinWeek } from './js/withinWeek'
import { saveTrip } from './js/saveTrip'
import { newTrip } from './js/newTrip'
import { populateSavedTrips } from './js/populateSavedTrips'
import { openTrip } from './js/openTrip'

import './styles/base.scss'


document.getElementById('submit').addEventListener('click', updatePics);
document.addEventListener("DOMContentLoaded", populateSavedTrips);


function triggerReload(){
    location.reload();
}

export {
    handleClick,
    updateUI,
    postData,
    getData,
    updatePics,
    triggerReload,
    withinWeek,
    saveTrip,
    newTrip,
    populateSavedTrips,
    openTrip
}