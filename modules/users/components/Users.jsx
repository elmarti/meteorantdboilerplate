import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Table } from '../../data';
import { Icon } from 'antd';
export default class Users extends React.Component{
    constructor() {
        super();
        this.state = {
            search:""
        };
        this.columns = [{
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        }, {
            title: 'Created',
            dataIndex: 'created',
            key: 'created'
        }, {
            title: 'Roles',
            dataIndex: 'roles',
            key:'roles'
        },{
            title: 'Actions',
            key: 'actions',
            render: (text, record) => {
                return (
                    <span>
                      <a href="#">Action 一 {record.name}</a>
                      <span className="ant-divider"/>
                      <a href="#">Delete</a>
                      <span className="ant-divider"/>
                      <a href="#" className="ant-dropdown-link">
                        More actions <Icon type="down"/>
                      </a>
                    </span>
                );
            }
        }];

    }
    onSearchChange(search){
        console.log(search);
        this.setState({
            search
        });
    }
    mapTableData() {
        const search =this.state ? this.state.search : "";
        const users = Meteor.users.find({
            "emails.0.address":{$regex:search, $options:"i"}
        }).fetch();
        return users.map(user => {
            return {
                key: user._id,
                email: user.emails[0].address,
                roles: Roles.getRolesForUser(user._id).join(" ,")
            }
        });
    }

    render() {
        return (<Table onSearchChange={this.onSearchChange.bind(this)} searchValue={this.state.search} subscription="users/list" columns={this.columns} mapTableData={this.mapTableData.bind(this)}/>);
    }
}