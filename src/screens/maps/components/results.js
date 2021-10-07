import { Header, Icon } from "native-base";
import React from 'react';
import { Modal, TouchableOpacity } from "react-native";


const ResultSearch = (props) => {
    

    return (
        <Modal visible={props.visible}
        style={{flex:1}}
        >
            <Header>
                <TouchableOpacity>
                    <Icon name='arrow-lefth' type='MaterialCommunityIcons'></Icon>
                </TouchableOpacity>
                <Text>{props.headerName}</Text>
                <TouchableOpacity>
                    <Icon name='clase' type='MaterialCommunityIcons'></Icon>
                </TouchableOpacity>

</Header>
        </Modal>
    )
}