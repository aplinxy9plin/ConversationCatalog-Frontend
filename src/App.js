import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { View, Epic, Tabbar, TabbarItem } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Icon28More from '@vkontakte/icons/dist/28/more';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';

import Home from './panels/Home';
import Add from './panels/Add';
import ThisConv from './panels/ThisConv'

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'home',
			fetchedUser: null,
			activeStory: 'all'
		};
		this.onStoryChange = this.onStoryChange.bind(this)
	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	go = (e) => {
		this.setState({ activePanel: e.currentTarget.dataset.to })
	};

	onStoryChange (e) {
		this.setState({ activeStory: e.currentTarget.dataset.story, activePanel: "home" })
	}

	render() {
		return (
			<Epic activeStory={this.state.activeStory} tabbar={
				<Tabbar>
				  <TabbarItem
					onClick={this.onStoryChange}
					selected={this.state.activeStory === 'all'}
					data-story="all"
				  ><Icon28More /></TabbarItem>
				  <TabbarItem
					onClick={this.onStoryChange}
					selected={this.state.activeStory === 'add'}
					data-story="add"
				  ><Icon28AddOutline /></TabbarItem>
				</Tabbar>
			  }>
				<View id="all" activePanel={this.state.activePanel}>
					<Home id="home" chooseConv={(id) => this.setState({id: id, activePanel: "this_conv"})} />
					<ThisConv id="this_conv" go={this.go} conv_id={this.state.id} />
				</View>
				<View id="add" activePanel={this.state.activePanel} popout={this.state.popout}>
					<Add id="home" popout={(e) => this.setState({popout: e})} onStoryChange={() => this.setState({activeStory: "all"})} data-story="all" />
				</View>
			  </Epic>
		);
	}
}

export default App;
