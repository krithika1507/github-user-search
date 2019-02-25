import React, { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';

class App extends Component {

	constructor(props){ 
        super(props); 
        this.state = { 
          	isDisplayed:true,
           	username: '',
           	repo:'',
        };
    }

	toggleDisplay() {

		this.setState({isDisplayed: !this.state.isDisplayed})
	}

	getUsers(username) {

		return fetch(`https://api.github.com/users/${username}`)
		.then(resp => resp.json())
		.then(resp => {
			return resp;
		})
		.catch((err) => console.log(err) )
	}

	getUserRepo(username) {
        return fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(response => {
        return response;
        })
        .catch((err) => console.log(err) )
    }

	async searchUsers(e) {
		e.preventDefault();
     
        let user = await this.getUsers(this.refs.username.value);

        this.setState({
        	avatar_url: user.avatar_url,
       		username: user.login,
        	publicRepos: user.public_repos,
           	blog: user.blog,
       		followers: user.followers,
        	following: user.following,
    	})   

    	 let repo = await this.getUserRepo(this.refs.username.value);
    	 this.setState({repo,
    	 })
    } 
	
	displayRepos(repo) {

    	return repo.map(item => {
      		return <div key={item.id} className="repoResults">
       	    <p>
          		{item.name}
        	</p>
      		</div>
   		})
  	}

	render() {
		const { repo } = this.state

		return(
	
			<div className="App">
				<div className="searchButton">
					<form onSubmit={e => this.searchUsers(e)}>
						<input ref="username" type="text" placeholder="Enter a GitHub Username..." required />
						<button className="searchButton" type="submit">Search</button>
					</form>
				</div>
				<div className="userName">
					<a href="#" onClick={this.toggleDisplay.bind(this)}>{this.state.username}</a>
					{!this.state.isDisplayed && <div>
					<h2><span>User Details</span></h2>
          				<div className="display-user-details">
            				<img className="user-image" src={this.state.avatar_url}/>
            					<div className="basic-user-details">
            						<p>{this.state.username} </p> 
            						<p>Public Repos: {this.state.publicRepos}</p>
            						<p>Blog: {this.state.blog}</p>
            						<p>{this.state.followers} followers</p>
            						<p>{this.state.following} following</p>
           						</div>
           				</div>
               			<div>
               				<h4><span>User Repositories</span></h4>
                 			<p>{this.displayRepos(repo)}</p>
              			</div>       				
          			</div>
					}
				</div>
			</div>
		);
	}

}

ReactDOM.render(<App />, document.getElementById('searchUser'));
