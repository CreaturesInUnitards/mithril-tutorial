/* global m */
module.exports = {
	view: _v => m('a.logo.fix.flex.jc.ac.w40.h40.bot0.l10.pointer[href=/]',
		{ oncreate: m.route.link },
		m('.blip-wrapper.rel.flex.ja.ae.w100p.h50p', 
			m('.blip.in-block.bg-brick.rad50p.w20p.h40p'),
			m('.blip.in-block.bg-brick.rad50p.w20p.h40p'),
			m('.blip.in-block.bg-brick.rad50p.w50p.h100p'),
		)
	)	
}


