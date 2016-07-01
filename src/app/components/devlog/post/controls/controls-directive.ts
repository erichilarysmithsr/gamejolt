import { Component, Input, Inject } from 'ng-metadata/core';
import { Fireside_Post } from './../../../../../lib/gj-lib-client/components/fireside/post/post-model';
import { App } from './../../../../app-service';

@Component({
	selector: 'gj-devlog-post-controls',
	templateUrl: '/app/components/devlog/post/controls/controls.html',
})
export class DevlogPostControls
{
	@Input( '<' ) post: Fireside_Post;

	constructor(
		@Inject( 'App' ) private app: App,
		@Inject( 'Fireside_Post' ) private firesidePostModel: typeof Fireside_Post
	)
	{
	}
}