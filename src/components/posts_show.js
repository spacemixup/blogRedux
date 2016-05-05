import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

//the id is coming from the url - pull the id from url - pass it to fetchPost 
// fetchPost makes back end request - resolves w/ data reducer picks it up

class PostsShow extends Component { 
	static contextTypes = {
		router: PropTypes.object
	};

	componentWillMount() {
		this.props.fetchPost(this.props.params.id);
	}

	onDeleteClick() {
		this.props.deletePost(this.props.params.id)
			.then(() => { this.context.router.push('/'); });
	}

	render() {
		const { post } = this.props;
		// const post = this.props.post;

		if (!this.props.post) {
			return <div>loading..</div>
		}

		return (
			<div>
				<Link to="/">Back to Index</Link>
				<button 
					className="btn btn-danger pull-xs-right"
					onClick={this.onDeleteClick.bind(this)}>
					Delete Post
				</button>
				<h3>{post.title}</h3>
				<h3>Categories: {post.categories}</h3>
				<p>{post.content}</p>
			</div>
		)
	}
}

// export default PostsShow;

function mapStateToProps(state) {
	return { post: state.posts.post };
}

// export default connect(null, { fetchPost })(PostsShow);
export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);