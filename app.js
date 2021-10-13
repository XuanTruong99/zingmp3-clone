const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

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


const playListContentWrapElement = $('.playlist__content-wrap')
const cdThumb = $('.play__area-img');
const headingPlayArea = $('.play__area-title-heading')
const descriptionPlayArea = $('.play__area-title-sub')


const app = {
    currentIndex: 0,
    songs: [
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

    // Rendersong
    render: function() {
        const html = this.songs.map((song,index) => {
            return `
                <div class="playlist__content">
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
        playListContentWrapElement.innerHTML = html.join('')
    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },

    loadCurrentSong: function() {
        cdThumb.src = `${this.currentSong.image}`
        headingPlayArea.textContent = this.currentSong.name
        descriptionPlayArea.textContent = this.currentSong.singer
        audio.src = this.currentSong.path
    },

    start: function() {
        // define
        this.defineProperties()
        // Rendersong
        this.render()
        // Load
        this.loadCurrentSong()
    }
}

app.start()




