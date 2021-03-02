import { updateUI } from './js/updateUI'
import { postData } from './js/postData'
import { getData } from './js/getData'
import { populateSavedTrips } from './js/populateSavedTrips'
import { openTrip } from './js/openTrip'

import './styles/base.scss'
import './styles/input.scss'
import './styles/main-classes.scss'
import './styles/result-classes.scss'
import './styles/result-card.scss'

function triggerReload(){
    location.reload();
}

document.getElementById('submit').addEventListener('click', updatePics);
document.addEventListener("DOMContentLoaded", populateSavedTrips);

export {
    updateUI,
    postData,
    getData,
    triggerReload,
    openTrip
}