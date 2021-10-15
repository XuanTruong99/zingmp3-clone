const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

var test = 5
for(var i = 0; i < test; i++) {
    console.log(i)
}

// Header
const mainElement = $('.main')
const headerInputElement = $('.header__input')
const headerHistoryElement = $('.header__input-history')
const headerInputImportElement = $('.header__input-import')
const headerInputImportWrapElement = $('.header__input-import-wrap')
const pageWrapElement = $('.page__wrap')
const headerElement = $('.header')


headerInputImportElement.onfocus = function () {
    headerInputElement.classList.add('isactive')
    headerHistoryElement.style.display = 'block';
    headerInputImportWrapElement.style.top = '2px'
}

headerInputImportElement.addEventListener('click', function(e) {
    e.stopPropagation()
})

headerHistoryElement.addEventListener('click', function(e) {
    e.stopPropagation()
})

mainElement.onclick = function() {
    headerInputElement.classList.remove('isactive')
    headerHistoryElement.style.display = 'none'
    headerInputImportWrapElement.style.top = '0'
}


pageWrapElement.onscroll = function (e) {
    return e.target.scrollTop > 0 ? headerElement.style.backgroundColor = 'var(--primarybg-color)' : headerElement.style.backgroundColor = 'transparent'
}

// Page

// Slider
const sliderBackBtn = $('.handle-back')
const sliderNextBtn = $('.handle-next')
const sliderLists = $$('.page__slider-list')
const sliderList = $('.page__slider-list')

sliderNextBtn.onclick = function() {
    for(var i = 0; i < sliderLists.length; i++) {
        if(sliderLists[i].classList.value.includes('show1')) {
            sliderLists[i].classList.remove('show1')
            sliderLists[i].classList.add('hide3')
        } else if(sliderLists[i].classList.value.includes('show2')) {
            sliderLists[i].classList.remove('show2')
            sliderLists[i].classList.add('show1')
        } else if(sliderLists[i].classList.value.includes('show3')) {
            sliderLists[i].classList.remove('show3')
            sliderLists[i].classList.add('show2')
        } else if(sliderLists[i].classList.value.includes('hide1')) {
            sliderLists[i].classList.remove('hide1')
            sliderLists[i].classList.add('show3')
        } else if(sliderLists[i].classList.value.includes('hide2')) {
            sliderLists[i].classList.remove('hide2')
            sliderLists[i].classList.add('hide1')
        } else if(sliderLists[i].classList.value.includes('hide3')) {
            sliderLists[i].classList.remove('hide3')
            sliderLists[i].classList.add('hide2')
        }
    }
}

sliderBackBtn.onclick = function() {
    for(var i = 0; i < sliderLists.length; i++) {
        if(sliderLists[i].classList.value.includes('show1')) {
            sliderLists[i].classList.remove('show1')
            sliderLists[i].classList.add('show2')
        } else if(sliderLists[i].classList.value.includes('show2')) {
            sliderLists[i].classList.remove('show2')
            sliderLists[i].classList.add('show3')
        } else if(sliderLists[i].classList.value.includes('show3')) {
            sliderLists[i].classList.remove('show3')
            sliderLists[i].classList.add('hide1')
        } else if(sliderLists[i].classList.value.includes('hide1')) {
            sliderLists[i].classList.remove('hide1')
            sliderLists[i].classList.add('hide2')
        } else if(sliderLists[i].classList.value.includes('hide2')) {
            sliderLists[i].classList.remove('hide2')
            sliderLists[i].classList.add('hide3')
        } else if(sliderLists[i].classList.value.includes('hide3')) {
            sliderLists[i].classList.remove('hide3')
            sliderLists[i].classList.add('show1')
        }
    }
}

// Auto slider

setInterval(function() {
    sliderNextBtn.click()
},5000)

sliderNextBtn.addEventListener('click', function(e) {
    e.stopPropagation()
})


// Playlist
const playListBtnElement = $('.play__area-information-list-btn');
const playListElement = $('.playlist')

playListBtnElement.onclick = function() {
    if((getComputedStyle(playListElement)).display === 'none') {
        playListBtnElement.style.backgroundColor = 'var(--playlist-active-color)'
        playListElement.classList.remove('exit')
        playListElement.style.display = 'block'
    } else {
        playListBtnElement.style.backgroundColor = 'rgba(255,255,255, 0.1)'
        playListElement.classList.add('exit')
        setTimeout(function () {
            playListElement.style.display = 'none'
        },450)
    }
}

pageWrapElement.onclick = function () {
        playListBtnElement.style.backgroundColor = 'rgba(255,255,255, 0.1)'
        playListElement.classList.add('exit')
        setTimeout(function () {
            playListElement.style.display = 'none'
        },450)
}



// Play music
const KEY_STOREAGE_KEY = 'Spider music'

const playListSong = $('.playlist__song')
const playList = $('.playlist__content')
const cdThumb = $('.play__area-img');
const headingPlayArea = $('.play__area-title-heading')
const descriptionPlayArea = $('.play__area-title-sub')
const playBtn = $('.icon-play')
const player = $('.play__area-control-list-toggle-play')
const audio = $('#audio')
const progress = $('#progress')
const nextBtn = $('.next-song-btn')
const prevBtn = $('.prev-song-btn')
const randomBtn = $('.random-btn')
const repeatBtn = $('.repeat-btn')
const volumeProgress = $('.play__area-information-volume')
const volumeOffOnElement = $('.play__area-information-btn-volume')
const musicCurrentTime = $(".current")
const musicDuartion = $(".duration");


const app = {
    currentIndex: 0,
    currentVolume: 1,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isOnMouseAndTouchOnProgress: false,
    config: JSON.parse(localStorage.getItem(KEY_STOREAGE_KEY)) || {},
    songs: [
        {
            name: 'What Are Words',
            singer: 'Chris Medina',
            path: './asset/music/What Are Words - Chris Medina (Lyrics).mp3',
            image: 'https://avatar-ex-swe.nixcdn.com/playlist/2013/11/06/c/c/a/8/1383717171089_500.jpg'
        },
        {
            name: 'Love The Way You Lie',
            singer: 'Skylar Grey',
            path: './asset/music/Skylar Grey - Love The Way You Lie (Live on the Honda Stage at The Peppermint Club).mp3',
            image: 'https://s.mxmcdn.net/images-storage/albums/5/8/9/1/4/7/26741985_800_800.jpg'
        },
        {
            name: 'Nevada',
            singer: 'Vicetone',
            path: './asset/music/Vicetone - Nevada (ft. Cozi Zuehlsdorff).mp3',
            image: './asset/img/9.jpg'
        },
        {
            name: 'Bước qua mùa cô đơn',
            singer: 'Vũ',
            path: './asset/music/[lyrics] bước qua mùa cô đơn - vũ - mùa thu rơi vào em ....mp3',
            image: './asset/img/1.jpg'
        },
        {
            name: 'Heartbreak Anniversary',
            singer: 'Giveon',
            path: './asset/music/[Vietsub+Lyrics] Heartbreak Anniversary - Giveon.mp3',
            image: './asset/img/2.jpg'
        },
        {
            name: 'Like My Father',
            singer: 'Jax',
            path: './asset/music/[Vietsub+Lyrics] Like My Father - Jax.mp3',
            image: './asset/img/5.jpg'
        },
        {
            name: 'River',
            singer: 'Charlie Puth',
            path: './asset/music/[Vietsub+Lyrics] River - Charlie Puth.mp3',
            image: './asset/img/7.jpg'
        },
        {
            name: 'comethru',
            singer: 'Jeremy Zucker',
            path: './asset/music/Jeremy Zucker - comethru (Official Video).mp3',
            image: './asset/img/3.jpg'
        },
        {
            name: 'Summertime',
            singer: 'K-391',
            path: './asset/music/K-391 - Summertime [Sunshine].mp3',
            image: './asset/img/4.jpg'
        },
        {
            name: 'Happy For You (feat. Vũ.)',
            singer: 'Lukas Graham- Vũ',
            path: './asset/music/Lukas Graham - Happy For You (feat. Vũ.) Performance Video.mp3',
            image: './asset/img/6.jfif'
        },
        {
            name: 'Monody (feat. Laura Brehm)',
            singer: 'TheFatRat',
            path: './asset/music/TheFatRat - Monody (feat. Laura Brehm).mp3',
            image: './asset/img/8.jpg'
        }
    ],
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(KEY_STOREAGE_KEY, JSON.stringify(this.config))
    },

    // Rendersong
    render: function() {
        const html = this.songs.map((song,index) => {
            return `
                <div class="playlist__content ${index === this.currentIndex ? 'isplay' : ''}" data-index="${index}">
                    <div class="playlist__content-img">
                        <img src="${song.image}" alt="" class="playlist__content-item-img">
                    </div>
                    <div class="playlist__content-about">
                        <h3 class="playlist__content-about-heading">${song.name}</h3>
                        <span class="playlist__content-about-sub">${song.singer}</span>
                    </div>
                </div>
            `
        })
        playListSong.innerHTML = html.join('')
        
    },
    
    handleEvents: function() {
        const _this = this
        // CD rotate
        const cdThumbAnimate = cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        // Click playing song
        player.onclick = function() {
            if(_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        // When being playing song
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing')
            cdThumbAnimate.play()
        }
        // When being pausing song
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // Progress input element run
        audio.ontimeupdate = function() {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            }
            // 
            let currentMin = Math.floor(audio.currentTime / 60);
            let currentSec = Math.floor(audio.currentTime % 60);
            if(currentSec < 10){ //if sec is less than 10 then add 0 before it
            currentSec = `0${currentSec}`;
            }
            musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
        
            
        }

         // Chạm chuột
         progress.onmousedown = function() {
            _this.isOnMouseAndTouchOnProgress = true
        }

        // Chạm
        progress.ontouchstart = function() {
            _this.isOnMouseAndTouchOnProgress = true
        }

        // Tua song
        progress.oninput = function(e) {
            if(audio.duration) {
                const seakTime = audio.duration / 100 * e.target.value
                audio.currentTime = seakTime
                _this.isOnMouseAndTouchOnProgress = false
            }
        }
        
        // Next song
        nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        
        // Prev song
        prevBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        
        // Random song
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('isactive-btn-handle', _this.isRandom)
        }

        // Repeat song
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('isactive-btn-handle', _this.isRepeat)
        }
        
        // Ended next songs
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }
        
        // Play song when click in playList
        playListSong.onclick = function(e) {
            const songNodes = e.target.closest('.playlist__content:not(.isplay)')
            if(songNodes) {
                _this.currentIndex = Number(songNodes.dataset.index)
                _this.loadCurrentSong()
                _this.render()
                audio.play()
            }
        }
        
        // Xử lý khi thay đổi âm lượng
        volumeProgress.oninput = function(e) {
            audio.muted = false
            audio.volume = e.target.value / 100
            _this.currentVolume = audio.volume
            return _this.currentVolume === 0 ? volumeOffOnElement.classList.add('mute') : volumeOffOnElement.classList.remove('mute')
        }

        // Mute and unmute
        volumeOffOnElement.onclick = function() {
            if(audio.muted) {
                audio.muted = false;
                volumeOffOnElement.classList.remove('mute')
                volumeProgress.value = 100
            } else {
                audio.muted = true
                volumeOffOnElement.classList.add('mute')
                volumeProgress.value = 0
            }
        }

    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },

    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.playlist__content.isplay').scrollIntoView({
                behavior: 'auto',
                block: 'center',
            })
        }, 300) 
            
    },

    loadCurrentSong: function() {
        cdThumb.src = `${this.currentSong.image}`
        headingPlayArea.textContent = this.currentSong.name
        descriptionPlayArea.textContent = this.currentSong.singer
        audio.src = this.currentSong.path
        // Render duration time audio
        audio.addEventListener('loadedmetadata', function () {
            const mainDuration = audio.duration 
            const minDuration = Math.floor(audio.duration / 60)
            const secDuration = Math.floor(mainDuration - minDuration * 60)
            if(secDuration != 0) {
                musicDuartion.innerText = `${minDuration}:${secDuration}`
            } else {
                musicDuartion.innerText = `${minDuration}:00`
            }
        })

    },

    loadConfig: function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat; 
    },

    nextSong: function() {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },

    prevSong: function() {
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    playRandomSong: function() {
        let randomIndexsong
        do {
            randomIndexsong = Math.floor(Math.random() * this.songs.length)
        } while (randomIndexsong === this.currentIndex)
        this.currentIndex = randomIndexsong
        this.loadCurrentSong()
    },

    

    start: function() {
        // Load config
        this.loadConfig()
        // define
        this.defineProperties()
        // Rendersong
        this.render()
        // handle 
        this.handleEvents() 
        // Load
        this.loadCurrentSong()
        
        repeatBtn.classList.toggle('isactive-btn-handle', this.isRepeat)
        randomBtn.classList.toggle('isactive-btn-handle', this.isRandom)
    }
}

app.start()




