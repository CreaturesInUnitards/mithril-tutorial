const Player = require('@vimeo/player')
const VIDEO_CONTAINER_ID = 'videoContainer'

const State = {
	firstRun: {
		menu: true,
		lab: true
	},
	chapters: require('./Data'),
	canPlay: false,
	currentChapterIndex: 0,
	currentFlemIndex: 0,
	menuOpen: false,
	labOpen: false,
	player: null,
	toggleView: function(w) {
		State.firstRun[w] = false
		const prop = w + 'Open'
		State[prop] = !State[prop]
		
		if (w === 'lab' && State.player) State.player.pause()
	},
	setFlem: (n) => {
		State.currentFlemIndex = n
	},
	setupPlayer: (id) => {
		const player = State.player = new Player(VIDEO_CONTAINER_ID, {id: id || State.chapters[1].id})

		player.on('ended', function () {
			State.labOpen = true
			State.menuOpen = true
			m.redraw()

			setTimeout(State.player.setCurrentTime.bind(this, 0), 1000)			
		})
		
		player.on('loaded', function() {
			const chapter = State.chapters[State.currentChapterIndex]
			let cuepointCount = 0
			chapter.flems.forEach(function(flem){
				if (flem.cuepoint) player.addCuePoint(flem.cuepoint, { idx: cuepointCount++ })
			})

			document.getElementById(VIDEO_CONTAINER_ID).classList.add('enter')

		})
		
		player.on('cuepoint', function(notification){
			State.setFlem(notification.data.idx)
			State.toggleView('lab')
			m.redraw()
		})
	},
	loadChapter: (ch, fl) => {
		State.currentChapterIndex = ch
		const id = State.chapters[ch].id
		State.canPlay = false
		
		State.setFlem(fl || 0)
		if (fl !== undefined) State.labOpen = true

		if (id) {
			setTimeout(() => {
				State.canPlay = true
				m.redraw()
				setTimeout(State.setupPlayer.bind(null, id), 100)
			}, 100)
		}
	}
}

module.exports = State