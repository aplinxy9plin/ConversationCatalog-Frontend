import React from 'react';
import {Panel, PanelHeader, List, Cell} from '@vkontakte/vkui';


class Home extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			data: null
		}
	}
	componentDidMount(){
		fetch("http://localhost:1337/get_all")
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
				<PanelHeader>Список бесед</PanelHeader>
				<List style={{marginTop: "10px"}}>
				{
					this.state.data && this.state.data.map((item) => 
						<Cell
							description={`Количество участников: ${item.count}`}
							id={item._id}
							data-to="this_conv"
							onClick={(e) => this.props.chooseConv(e.currentTarget.id)}
							expandable
							before={<img style={{marginRight: "20px"}} src={item.photo} width="40px" />}
						><div>{item.name}</div></Cell>
					)
				}	
				</List>			
			</Panel>	
		)
	}
}

export default Home;
