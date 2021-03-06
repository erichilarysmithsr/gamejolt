import View from '!view!./search.html?style=./search.styl';
import { AppPopper } from 'game-jolt-frontend-lib/components/popper/popper';
import { arrayRemove } from 'game-jolt-frontend-lib/utils/array';
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { AppSearchAutocomplete } from './autocomplete/autocomplete';
import { AppSearchInput } from './input/input';
import { Search } from './search-service';

const KEYCODE_UP = 38;
const KEYCODE_DOWN = 40;
const KEYCODE_ENTER = 13;
const KEYCODE_ESC = 27;

let searchIterator = 0;

@View
@Component({
	components: {
		AppSearchAutocomplete,
		AppSearchInput,
		AppPopper,
	},
})
export class AppSearch extends Vue {
	@Prop({ type: Boolean, default: false })
	autocompleteDisabled!: boolean;

	id = ++searchIterator;

	query = '';
	isFocused = false;
	isShowingAutocomplete = false;
	inputElem: HTMLElement | undefined;
	keydownSpies: Function[] = [];

	readonly Search = Search;

	created() {
		this.query = Search.query;
	}

	// Sync it.
	@Watch('Search.query')
	queryChange() {
		this.query = Search.query;
	}

	isEmpty() {
		return !this.query.trim();
	}

	async focus() {
		await this.$nextTick();

		if (this.inputElem) {
			this.inputElem.focus();
		}
	}

	async blur() {
		await this.$nextTick();

		if (this.inputElem) {
			this.inputElem.blur();
		}
	}

	/**
	 * Ability to set watchers for when a keydown event fires.
	 */
	setKeydownSpy(fn: Function) {
		this.keydownSpies.push(fn);
	}

	removeKeydownSpy(fn: Function) {
		arrayRemove(this.keydownSpies, i => i === fn);
	}

	onKeydown(event: KeyboardEvent) {
		// This stops the default behavior from happening when we press up/down
		// or enter (we don't want to submit form).
		if (
			event.keyCode === KEYCODE_ESC ||
			event.keyCode === KEYCODE_UP ||
			event.keyCode === KEYCODE_DOWN ||
			event.keyCode === KEYCODE_ENTER
		) {
			event.preventDefault();
		}

		// If autocomplete is disabled, then we want to submit the form on enter.
		// Normally the autocomplete will take control of the submission since they
		// technically highlight what they want in autocomplete and go to it.
		if (this.autocompleteDisabled && event.keyCode === KEYCODE_ENTER) {
			this.$router.push({ name: 'search.results', query: { q: this.query } });
		}

		// We want to blur the input on escape.
		if (event.keyCode === KEYCODE_ESC) {
			this.blur();
			event.stopPropagation();
		}

		for (const spy of this.keydownSpies) {
			spy(event);
		}
	}

	onFocus() {
		this.isFocused = true;
		this.isShowingAutocomplete = true;
	}

	onBlur() {
		this.isFocused = false;
		this.isShowingAutocomplete = false;
	}
}
