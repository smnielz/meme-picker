import { catsData } from "./data.js";

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const memeModal = document.getElementById('meme-modal')
const memeModalInner = document.getElementsByClassName('meme-modal-inner')
const closeMemeModalBtn = document.getElementById('close-meme-modal-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')

closeMemeModalBtn.addEventListener('click', closeMeme)
document.body.addEventListener('dblclick', closeMeme)
emotionRadios.addEventListener('change', highlightSelectedEmotion)

getImageBtn.addEventListener('click', getImage)

function closeMeme(){
    memeModal.style.display = 'none'
}

function getImage(){
    const selectedEmotion = getSelectedEmotion()
    if(selectedEmotion){
        const catArray = getCatsArray(selectedEmotion)
        const oneCat = getOneCat(catArray)
        memeModalInner[0].innerHTML = `<img 
                                        src="images/${oneCat.image}" 
                                        alt="${oneCat.alt}"
                                        class="cat-img">`
        memeModal.style.display = 'flex'
    }    
}

function getSelectedEmotion(){
    const selectedEmotion = document.querySelector('input[type="radio"]:checked')
    if(selectedEmotion)
        return selectedEmotion.value
}

function getCatsArray(emotion){
    const isGif = gifsOnlyOption.checked
    if(!isGif)
        return catsData.filter(cat => cat.emotionTags.includes(emotion))
    else
        return catsData.filter(cat => cat.emotionTags.includes(emotion) && cat.isGif)
}

function getOneCat(catsArray){
    return catsArray[Math.floor(Math.random() * catsArray.length)]
}

function highlightSelectedEmotion(e){
    const radios = document.getElementsByClassName('radios')
    for(let radio of radios)
        radio.classList.remove('highlight')
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}


function getCatsEmotionArray(cats){
    let catsEmotionArray = []
    for(let cat of cats){
        for(let emotion of cat.emotionTags){
            if(!catsEmotionArray.includes(emotion))
                catsEmotionArray.push(emotion)
        }
    }
    return catsEmotionArray
}

function getEmotionRadiosHtml(cats){
    let emotionRadiosHtml = getCatsEmotionArray(cats).map(emotion => 
         `<div class="radios">
                <label for="${emotion}">${emotion}</label>
                <input type="radio"
                id="${emotion}"
                name="emotions"
                value="${emotion}">
        </div>`).join('')
    emotionRadios.innerHTML = emotionRadiosHtml
}
getEmotionRadiosHtml(catsData)