import * as React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

//Settings text
const Stext = styled.View`
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  border: solid 3px blue;
  border-radius: 8px;
  padding: 12px 48px;
  justify-content: center;
`;

//Back Button
const Back = styled.TouchableOpacity`
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  border: solid 3px blue;
  border-radius: 8px;
  padding: 4px 20px;
  justify-content: center;
`;

//Settings Icon
const Sicon = styled.View`
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  padding: 4px 20px;
  justify-content: center;
`;

// Dark Mode button
const Dark = styled.TouchableOpacity`
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  border: solid 3px blue;
  border-radius: 8px;
  padding: 4px 22px;
  justify-content: center;
`;

// Notifcations Button
const Noti = styled.TouchableOpacity`
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  border: solid 3px blue;
  border-radius: 8px;
  padding: 4px 20px;
  justify-content: center;
`;

//Interests buttons 
const Inter = styled.TouchableOpacity`
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  border: solid 3px blue;
  border-radius: 8px;
  padding: 4px 28px;
  justify-content: center;
`;

//Blank Spaces for formating  
const Space1 = styled.View`
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  justify-content: center;
`;

const Space2 = styled.View`
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  padding: 40px 20px;
  justify-content: center;
`;


export default function Settings(){
    return(
        <Container>
        <Text></Text>

        <Back><Ionicons name="md-arrow-round-back" size={32} color="black" /><Text>  Back</Text></Back>
        <Space2><Text></Text></Space2>
        <Sicon><Ionicons name="md-settings" size={95} color="black" /><Text></Text></Sicon>
        <Stext><Text>Settings</Text></Stext>
        <Space1><Text></Text></Space1>
        <Dark><Ionicons name="md-moon" size={32} color="black" /><Text>  Dark Mode</Text></Dark>
        <Space1><Text></Text></Space1>
        <Noti><Ionicons name="ios-notifications" size={32} color="black" /><Text>  Notifications</Text></Noti>
        <Space1><Text></Text></Space1>
        <Inter><Ionicons name="ios-star" size={32} color="black" /><Text>  Interests</Text></Inter>


        </Container> 
        );


}

