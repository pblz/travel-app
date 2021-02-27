import { handleClick } from './js/clickHandler'
import { updateUI } from './js/updateUI'
import { postData } from './js/postData'
import { getData } from './js/getData'
import { updatePics } from './js/populateInspiration'
import { withinWeek } from './js/withinWeek'

import './styles/base.scss'


document.getElementById('submit').addEventListener('click', updatePics);

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
    withinWeek
}