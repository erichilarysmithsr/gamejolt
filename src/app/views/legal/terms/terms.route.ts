import VueRouter from 'vue-router';
import { asyncComponentLoader } from '../../../../lib/gj-lib-client/utils/utils';

export const routeLegalTerms: VueRouter.RouteConfig = {
	name: 'legal.terms',
	path: '/terms',
	component: () => asyncComponentLoader( $import( './terms' ) ),
};