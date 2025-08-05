ZoteroClock = {
    id: null,
    version: null,
    rootURI: null,
    initialized: false,
    addedElementIDs: [],

    init({ id, version, rootURI }) {
        if (this.initialized) return;
        this.id = id;
        this.version = version;
        this.rootURI = rootURI;
        this.initialized = true;
    },

    log(msg) {
        Zotero.debug("Zotero Clock Timer: " + msg);
    },

    addToWindow(window) {
        let doc = window.document;

        // Container
        let container = doc.createElement('div');
        container.id = 'zotero-clock-container';
        container.style.position = 'absolute';
        container.style.transform= "rotate(-90deg)";
        container.style.top = '50%';
        container.style.right = '-37px';
        container.style.transform = 'rotate(-90deg) translateY(-50%)';
        container.style.padding = '5px';
        container.style.background = 'rgba(255, 255, 255, 0.15)';
        container.style.backdropFilter = 'blur(12px)';
        container.style.color = '#333';
        container.style.fontSize = '12px';
        container.style.borderRadius = '12px';
        container.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.2)';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        container.style.width = '70px';
        container.style.minWidth = '70px';
        container.style.maxWidth = '70px';
        container.style.textAlign = 'center';
        container.style.fontWeight = 'bold';

        // Clock Element
        let clockElem = doc.createElement('div');
        clockElem.id = 'zotero-clock';
        clockElem.textContent = '--:--:--';
        clockElem.style.fontSize = '14px';
        clockElem.style.color = '#fff';

        container.appendChild(clockElem);

        doc.documentElement.appendChild(container);
        this.storeAddedElement(container);

        this.startClock(window);
    },

    addToAllWindows() {
        let windows = Zotero.getMainWindows();
        for (let win of windows) {
            if (!win.ZoteroPane) continue;
            this.addToWindow(win);
        }
    },

    storeAddedElement(elem) {
        if (!elem.id) {
            throw new Error("Element must have an id");
        }
        this.addedElementIDs.push(elem.id);
    },

    removeFromWindow(window) {
        let doc = window.document;
        for (let id of this.addedElementIDs) {
            doc.getElementById(id)?.remove();
        }
    },

    removeFromAllWindows() {
        let windows = Zotero.getMainWindows();
        for (let win of windows) {
            if (!win.ZoteroPane) continue;
            this.removeFromWindow(win);
        }
    },

    startClock(window) {
        let clockElem = window.document.getElementById('zotero-clock');
        function updateClock() {
            let now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            let minsStr = minutes.toString().padStart(2, '0');
            let timeStr = `${hours}:${minsStr} ${ampm}`;
            clockElem.textContent = `${timeStr}`;
        }
        setInterval(updateClock, 1000);
        updateClock();
    }
};
