import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import * as View from '!view!./app.html';

import { Connection } from '../lib/gj-lib-client/components/connection/connection-service';
import { makeObservableService } from '../lib/gj-lib-client/utils/vue';
import { AppShell } from './components/shell/shell';
import { AppErrorPage } from '../lib/gj-lib-client/components/error/page/page';
import { Analytics } from '../lib/gj-lib-client/components/analytics/analytics.service';

@View
@Component({
	components: {
		AppShell,
		AppErrorPage,
	},
})
export class App extends Vue {
	Connection = makeObservableService(Connection);

	created() {
		if (!GJ_IS_SSR) {
			Analytics.trackTiming('shell', 'vue-init', Date.now() - window._gjStartTime);
		}
	}

	mounted() {
		if (!GJ_IS_SSR) {
			// Let it finish doing all the initial rendering junk and track after
			// that.
			setTimeout(() => {
				Analytics.trackTiming('shell', 'vue-mounted', Date.now() - window._gjStartTime);
			});
		}
	}
}
