import View from '!view!./wizard-controls.html';
import { AppFormButton } from 'game-jolt-frontend-lib/components/form-vue/button/button';
import { AppForm } from 'game-jolt-frontend-lib/components/form-vue/form';
import { findVueParent } from 'game-jolt-frontend-lib/utils/vue';
import { AppJolticon } from 'game-jolt-frontend-lib/vue/components/jolticon/jolticon';
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { State } from 'vuex-class';
import {
	RouteStore,
	RouteStoreName,
} from '../../../../views/dashboard/communities/manage/manage.store';

@View
@Component({
	components: {
		AppFormButton,
		AppJolticon,
	},
})
export class AppDashCommunityWizardControls extends Vue {
	@Prop(Boolean)
	disabled?: boolean;

	// The manage route store may not be loaded in if we're in the "add" form.
	// We have to do all this a bit custom so that we don't expect the module to
	// exist.
	@State(RouteStoreName)
	manageCommunityRoute?: RouteStore;

	form?: AppForm;

	created() {
		this.form = findVueParent(this, AppForm);
	}

	get isWizard() {
		return !this.manageCommunityRoute || this.manageCommunityRoute.isWizard;
	}

	get inForm() {
		return !!this.form;
	}

	get canProceed() {
		return !this.form || !this.form.hasErrors || this.disabled;
	}

	async next() {
		if (!this.canProceed) {
			return;
		}

		if (this.form) {
			const result = await this.form.submit();
			if (!result) {
				return;
			}
		}

		if (this.manageCommunityRoute) {
			// Sadly we can't attach directly to this since manageCommunityRoute may not
			// exist.
			this.$store.dispatch(`${RouteStoreName}/wizardNext`);
		}
	}
}
