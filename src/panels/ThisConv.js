import React from 'react';
import {Panel, PanelHeader, platform, Group, IOS, List, Cell, HeaderButton} from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

const osname = platform();

class ThisConv extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			data: null
		}
    }
    componentDidMount(){
        fetch('http://localhost:1337/get?id='+this.props.conv_id)
        .then(response => response.json())
        .then(data => {
            this.setState({
                data: data
            })
        })
    }
	render(){
		return(
			<Panel id={this.props.id}>
				<PanelHeader
        			left={<HeaderButton onClick={this.props.go} data-to="home">
        				{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}
        			</HeaderButton>}
        		>
        		    Текущая беседа
        		</PanelHeader>
                {
                    this.state.data && <Group>
                        <List>
                            <Cell before={
                                <img style={{
                                    marginRight: "20px"
                                }} width="50px" src={this.state.data.photo} />
                            }>{this.state.data.name}</Cell>
                            <Cell>Количество участников: {this.state.data.count}</Cell>
                            <Cell>Категория: {this.state.data.category}</Cell>
                            <Cell multiline>Описание: {this.state.data.description}</Cell>
                            <Cell>Ссылка на беседу: <a target="_blank" href={this.state.data.link.indexOf("https://") !== -1 ? this.state.data.link : ("https://"+this.state.data.link)}>{this.state.data.link}</a></Cell>
                            <Cell>Ссылка на создателя: <a target="_blank" href={this.state.data.admin.indexOf("https://") !== -1 ? this.state.data.admin : ("https://"+this.state.data.admin)}>{this.state.data.admin}</a></Cell>
                        </List>
                    </Group>
                }
			</Panel>	
		)
	}
}

export default ThisConv;
