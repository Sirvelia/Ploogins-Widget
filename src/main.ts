import { createApp } from 'vue'
import { VueQueryPlugin } from '@tanstack/vue-query';
import Widget from './Widget.vue'

import Partners from './api/Partners';

import './assets/styles/app.css'

declare global {
    interface Window {
        PlooginsWidget: typeof PlooginsWidget;
    }
}

class PlooginsWidget {
    private containerId: string;
    private partnerUUID: string | undefined;
    private app: any;

    constructor(containerId: string, options: { partnerUUID?: string } = {}) {
        this.containerId = containerId;
        this.partnerUUID = options.partnerUUID;
        this.app = null;
    }

    async mount() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`[PlooginsWidget] Container with id "${this.containerId}" not found`);
            return;
        }

        if (!this.partnerUUID) {
            console.error('[PlooginsWidget] Partner UUID is required');
            return;
        }

        const partner = await Partners.check(this.partnerUUID);
        if (!partner) {
            console.error('[PlooginsWidget] Partner UUID is invalid');
            return;
        }

        // Inject CSS file into head
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://cdn.jsdelivr.net/gh/Sirvelia/Ploogins-Widget@v0.0.2/dist/ploogins-widget.css';
        document.head.appendChild(cssLink);

        this.app = createApp(Widget, {
            partnerUUID: this.partnerUUID,
            settings: partner.settings
        });

        this.app.use(VueQueryPlugin);

        this.app.mount(container);
    }

    unmount() {
        if (this.app) {
            this.app.unmount();
            this.app = null;
        }
    }
}

window.PlooginsWidget = PlooginsWidget;

export default PlooginsWidget;