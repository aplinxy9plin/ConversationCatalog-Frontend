import React from 'react';
import {Panel, PanelHeader, Input, FormLayout, Select, Textarea, Button, Group, Alert} from '@vkontakte/vkui';
import Icon24Camera from '@vkontakte/icons/dist/24/camera';


class Add extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			photo: null
		}
	}
	onChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
	}
	onChooseFile = () => {
	   var self = this;
	   var file = document.getElementById("add_photo").files[0];
	   var reader = new FileReader();
	   reader.readAsDataURL(file);
	   reader.onload = function () {
		self.setState({
			photo: reader.result
		})
	   };
	   reader.onerror = function (error) {
	     console.log('Error: ', error);
	   };
	}
	submit = () => {
		if(this.state.name && this.state.count && this.state.description && this.state.category && this.state.link && this.state.admin){
			fetch("http://localhost:1337/add_conv", {
				method: 'POST',
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state)
			})
			.then(response => response.json())
			.then(data => {
				if(data.type === "ok"){
					this.props.popout(<Alert
						actions={[{
						  title: 'Ок',
						  autoclose: true,
						}]}
						onClose={() => {this.props.popout(null); this.props.onStoryChange()}}
					  >
						<h2>Готово</h2>
					  </Alert>)
				}
			})
		}else{
			this.props.popout(<Alert
				actions={[{
				  title: 'Ок',
				  autoclose: true,
				  style: 'cancel'
				}]}
				onClose={() => this.props.popout(null)}
			  >
				<h2>Заполнены не все поля</h2>
			  </Alert>)
		}
	}
	render(){
		return(
			<Panel id={this.props.id}>
				<PanelHeader>Добавить беседу</PanelHeader>
				<Group>
				<FormLayout>
		            <Input
		              type="text"
		              top="Название"
		              name="name"
		              onChange={this.onChange}
		            />
					<Input
		              type="text"
		              top="Количество участников"
		              name="count"
		              onChange={this.onChange}
		            />
					<Input
		              type="text"
		              top="Ссылка на беседу"
		              name="link"
		              onChange={this.onChange}
		            />
					<Input
		              type="text"
		              top="Ссылка на создателя"
		              name="admin"
		              onChange={this.onChange}
		            />
					<Textarea name="description" top="Описание" onChange={this.onChange} />

		            <Select onChange={this.onChange} name="category" top="Категория" placeholder="Выберите категорию">
		              <option value="Знакомства">Знакомства</option>
		              <option value="Хобби">Хобби</option>
		              <option value="Политика">Политика</option>
		              <option value="Образ жизни">Образ жизни</option>
		              <option value="Бизнес, управления">Бизнес, управления</option>
		              <option value="Городские беседы">Городские беседы</option>
		              <option value="Социальные группы">Социальные группы</option>
		              <option value="Наука и образование">Наука и образование</option>
		            </Select>

					{this.state.photo && <center><img width="20%" src={this.state.photo} /></center>}

					<Button onClick={() => document.getElementById('add_photo').click()} before={<Icon24Camera/>} size="xl">Добавить иконку</Button>

					<input accept="image/x-png,image/gif,image/jpeg" onChange={this.onChooseFile} id="add_photo" type="file" style={{display: "none"}} />

		            <Button onClick={this.submit} level="commerce" size="xl">Добавить беседу</Button>
		          </FormLayout>
				</Group>
			</Panel>	
		)
	}
}

export default Add;
