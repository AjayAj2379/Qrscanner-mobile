import React from 'react';
import {View} from 'react-native'
import { Container, Header, Content, List, ListItem, Text } from 'native-base';

const ListItems = props =>{

    return(
              <ListItem>
              <Text>{props.RcNumber}</Text>
            </ListItem>
        
    );
}

const 