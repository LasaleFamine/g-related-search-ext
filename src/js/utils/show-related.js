const isGoogle = chrome => new Promise(resolve =>
	chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs =>
		resolve(/google\.+.+\/search/g.test(tabs[0].url))
	)
);

module.exports = async chrome =>
	await isGoogle(chrome) ?
		chrome.tabs.executeScript({
			code: `
			(function() {
				const isGRelatedSearchPresent = document.getElementsByClassName('GRelatedSearch').length > 0;
				if (isGRelatedSearchPresent) {
					return false;
				}

				console.info('[G Related Search]: running script.');
				const related = document.querySelectorAll('*[id^="eobm_"]');
				const title = document.createElement('h1');
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

				const relatedInside = document.querySelectorAll('*[id^="eobd_"]');
				for (const inside of relatedInside) {
					inside.style.display = 'flex';
					inside.style['flex-wrap'] = 'wrap';
					inside.childNodes.forEach(node => {
						node.innerHTML = '<a href="https://encrypted.google.com/search?q=' + node.textContent + '">' + node.textContent + '</a>';
						node.style.width = '50%';
					})
				}

				const toHide = document.querySelectorAll('*[id^="eobc_"]');
				for (const el of toHide) {
					el.style.display = 'none';
				}

				const closeXToHide = document.querySelectorAll('.XCKyNd');
				for (const el of closeXToHide) {
					el.style.display = 'none';
				}
			}());
		`
		}) : null;
