import * as React from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import styled from 'styled-components/native';
import { Ionicons, AntDesign } from '@expo/vector-icons';

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;


export default function NotificationsSettingsScreen(){
    return (
        <Container>
            <Text style={styles.backBox}> 
              <AntDesign style={styles.backBox} name="arrowleft" size={24} color="black" /> Back
            </Text>
            <Ionicons  style={styles.alarm} name="md-alarm" size={50} color="black" />
            <Text style={styles.bigNotiBox}> Notifications </Text>
            <Text style={styles.smallNotiBox}> Notifications 
              <Switch 
              /> 
            </Text>
              <Text style={styles.container}> 1 Week Before 
                <Switch  
                /> 
              </Text>
              <Text style={styles.container}> 2 Day Before 
                <Switch  
                />  
              </Text>
              <Text style={styles.container}> 1 Day Before 
                <Switch    
                /> 
              </Text>
              <Text style={styles.container}> 2 Hour Before 
                <Switch      
                />  
              </Text>
              <Text style={styles.container}> 1 Hour Before
                <Switch  
                />
              </Text>
        </Container>
    )
}

const backBox = styled.View`
  height: 69px;
  width: 126px;
  left: 9px;
  top: 11px;
  border-radius: 23px;
`;

const back = styled.View` `;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    backBox:{
      position: 'absolute',
      width: 126,
      height: 69,
      left: 9,
      top: 11,
      color: "blue",
      borderRadius:23,
      borderWidth: 4,
      justifyContent: 'center'
    },
    back:{
      position: 'absolute',
      width: 70,
      height: 41,
      top: 31,
      left:64,
      fontFamily: 'Roboto',
      fontWeight: 'normal',
      fontStyle: 'normal', 
      fontSize: 26,
      lineHeight: 30.47
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      width:287,
      height:69,
      top:198, 
      left: 46,
      borderWidth:4,
    },
    bigNotiBox: {
      position: 'absolute',
      width: 208,
      height: 57,
      top: 211,
      left: 89,
      fontFamily: 'Roboto',
      fontWeight: '400',
      fontStyle: 'normal',
      fontSize: 36,
      lineHeight: 42.19,
    },
    smallNotiBox: {
      position:'absolute',
      height: 69,
      width: 287,
      left: 46,
      top: 307,
      borderRadius: 23,
      borderWidth:4,
      justifyContent: 'center'
    },
    alarm:{
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      height: 58.4,
      width: 69.67,
      left: '4.17%',
      right: '4.17%',
      top: '8.33%',
      bottom: '12.5%',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    dateBox: {
      position: 'absolute',
      width: 287,
      height: 237,
      left: 46,
      top: 383,
      borderRadius: 23,
      borderColor: "blue",
      borderWidth: 4,
      justifyContent: 'center'
    }
  });
  