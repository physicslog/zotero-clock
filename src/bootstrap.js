// bootstrap.js
var ZoteroClock;

function log(msg) {
	Zotero.debug("Zotero Clock: " + msg);
}

function install() {
	log("Installed 1.0");
}

async function startup({ id, version, rootURI }) {
	log("Starting 1.0");

	Zotero.PreferencePanes.register({
		pluginID: 'zotero-clock@example.com',
		src: rootURI + 'preferences.xhtml',
		scripts: [rootURI + 'preferences.js']
	});

	Services.scriptloader.loadSubScript(rootURI + 'zotero-clock.js');
	ZoteroClock.init({ id, version, rootURI });
	ZoteroClock.addToAllWindows();
}

function onMainWindowLoad({ window }) {
	ZoteroClock.addToWindow(window);
}

function onMainWindowUnload({ window }) {
	ZoteroClock.removeFromWindow(window);
}

function shutdown() {
	log("Shutting down 1.0");
	ZoteroClock.removeFromAllWindows();
	ZoteroClock = undefined;
}

function uninstall() {
	log("Uninstalled 1.0");
}
