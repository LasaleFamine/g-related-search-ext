const isGoogle = chrome => new Promise(resolve =>
	chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs =>
		resolve(tabs[0].url.includes('google.com/search'))
	)
);

module.exports = async chrome =>
	await isGoogle(chrome) ?
		chrome.tabs.executeScript({
			code: `
			console.info('[G Related Search]: running script.');
			let related = document.querySelectorAll('*[id^="eobm_"]');
			let title = document.createElement('h1');
			title.innerHTML = 'Related Searches <small>Powered by G Related Search</small>';
			title.style.color = 'dodgerblue';
			title.classList.add('GRelatedSearch');
			for (const res of related) {
				res.style.display = 'block';
				res.style.opacity = '1';
				res.style.lineHeight = '24px';
				res.style.padding = '16px';
				res.style.fontSize = 'small';
				res.firstChild.style.display = 'block';
				res.insertBefore(title.cloneNode(true), res.firstChild);
			}

			let relatedInside = document.querySelectorAll('*[id^="eobd_"]');
			for (const inside of relatedInside) {
				inside.style.display = 'flex';
				inside.style['flex-wrap'] = 'wrap';
				inside.childNodes.forEach(node => {
					node.innerHTML = '<a href="https://encrypted.google.com/search?q=' + node.textContent + '">' + node.textContent + '</a>';
					node.style.width = '50%';
				})
			}

			let toHide = document.querySelectorAll('*[id^="eobc_"]');
			for (const el of toHide) {
				el.style.display = 'none';
			}

			let closeXToHide = document.querySelectorAll('.XCKyNd');
			for (const el of closeXToHide) {
				el.style.display = 'none';
			}
		`
		}) : null;
