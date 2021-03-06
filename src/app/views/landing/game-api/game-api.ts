import View from '!view!./game-api.html';
import { Component } from 'vue-property-decorator';
import { Api } from '../../../../lib/gj-lib-client/components/api/api.service';
import {
	BaseRouteComponent,
	RouteResolver,
} from '../../../../lib/gj-lib-client/components/route/route-component';
import { AppThemeSvg } from '../../../../lib/gj-lib-client/components/theme/svg/svg';
import { AppTooltip } from '../../../../lib/gj-lib-client/components/tooltip/tooltip';
import { number } from '../../../../lib/gj-lib-client/vue/filters/number';

@View
@Component({
	name: 'RouteLandingGameApi',
	components: {
		AppThemeSvg,
	},
	directives: {
		AppTooltip,
	},
	filters: {
		number,
	},
})
@RouteResolver({
	cache: true,
	lazy: true,
	deps: {},
	resolver: () => Api.sendRequest('/web/landing/game-api'),
})
export default class RouteLandingGameApi extends BaseRouteComponent {
	totalScores = 0;
	totalAchievedTrophies = 0;
	sessionTime = 0;

	routeResolved($payload: any) {
		this.totalScores = $payload.totalScores || 0;
		this.totalAchievedTrophies = $payload.totalAchievedTrophies || 0;
		this.sessionTime = $payload.sessionTime ? Math.floor($payload.sessionTime / 60 / 60) : 0;
	}
}
