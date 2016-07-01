export function DevlogPostFormFactory( Form, Fireside_Post )
{
	const form = new Form( {
		model: 'Fireside_Post',
		template: '/app/components/forms/dashboard/game/devlog-post/devlog-post.html'
	} );

	form.scope.game = '<';
	form.scope.postType = '<?';

	form.onInit = function( scope )
	{
		scope.Fireside_Post = Fireside_Post;

		scope.formModel.game_id = scope.game.id;
		scope.formModel.status = Fireside_Post.STATUS_ACTIVE;

		scope.onDraftSubmit = _ =>
		{
			scope.formModel.status = Fireside_Post.STATUS_DRAFT;
			scope.onSubmit();
		};
	};

	return form;
}
