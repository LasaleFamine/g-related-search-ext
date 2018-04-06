import './../img/g-related-search.png';

import showRelated from './utils/show-related';

window.chrome.browserAction.onClicked.addListener(() =>
	showRelated(window.chrome)
);

