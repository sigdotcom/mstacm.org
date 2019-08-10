import React from "react";
import styled from "styled-components";
import {Checkbox} from "antd";
import events from "./Events.json";
import {Element} from "react-scroll";
//import {Image, ImageGroup} from "react-fullscreen-image";

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Wrapper = styled.div`
    height: 1000px;
    width: 100%;
    display: flex;
    align-items: center;
    background: #FFFFFF;
    padding: 0 150px;

    @media all and (max-width: 680px) {
        padding: 0;
    }

    .scroll::-webkit-scrollbar-track
    {
        border-radius: 10px;
        background-color: #F5F5F5;
    }

    .scroll::-webkit-scrollbar
    {
        width: 12px;
        background-color: #F5F5F5;
    }

    .scroll::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        background-color: #BBBBBB;
    }
`

const Title = styled.div`
    position: relative;
    top: 50px;
    text-align: center;
    h1 {
        text-transform: uppercase;
        font-weight: bold;
        color: white;
        font-size: 34px;
        margin-top: -65px;
    }

    img {
        width: 260px;
    }
`

const Filter = styled.div`
    height: 470px;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: f7f7f7;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: 1px rgba(0, 0, 0, 0.25) solid;

    @media all and (max-width: 680px) {
        display: none;
    }

    h3{
        padding-top: 25px;
        padding-bottom: 10px;
        text-align: center;
        text-transform: uppercase;
        font-style: normal;
        font-weight: 400;
        font-size: 36px;
        line-height: 25px;
    }

    h4 {
        text-align: left;
        text-transform: uppercase;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        margin-bottom: 25px;
        color: #092B35;
    }
`

const Sigs = styled.div`
    display: flex;

`

const ImgWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-right: 15px;
`

const ImgImg = styled.img`
    width: 30px;
    height: 30px;
    margin-top: 5px;
    margin-bottom: 20px;
`

const SigWrapper = styled.div`
    padding: 5px;
    height: 290px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const EventWrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 730px;
    width: 70%;
    margin-left: 100px;
    overflow-y: scroll;
    box-shadow: 1px 21px 47px -36px rgba(0,0,0,0.75);

    p {
        width: 90%;
    }

    @media all and (max-width: 680px) {
        width: 90%;
        margin-left: 7.5%;
    }
`

const Event = styled.div`
    display: flex;
    flex-direction: row;
    height: 200px;
    width: 100%
    margin-bottom: 50px;
    margin-right: 10px;

    p {
        color: #777777;
        font-size: 17px;
    }

    a {
        color: #092B35;
        font-weight: 600;
    }

    a:hover {
        color: #42C0FC;
    }

    @media all and (max-width: 680px) {
        margin: 0;
    }
`
const CheckBoxWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 9px;
    margin-bottom: 28px;
    padding-left: 20px;

    .ant-checkbox-checked .ant-checkbox-inner{
        background-color: #EF9C6D;
    }

    .ant-checkbox-checked .ant-checkbox-inner, .ant-checkbox-wrapper:hover .ant-checkbox-inner,
    .ant-checkbox:hover .ant-checkbox-inner,
    .ant-checkbox-input:focus + .ant-checkbox-inner, 
    .ant-checkbox-checked::after, .ant-checkbox-inner{
        border: 2px solid #092B35;
        border-color: #092B35;
    }

`

const EventName = styled.div`
    text-transform: uppercase;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    color: #42C0FC;

    @media all and (max-width: 680px){
        font-size: 30px;  
    }
`

const SmallInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 30%;
`

const VerticalLine = styled.div`
    margin-right: 25px;
    margin-left: 18px;
    margin-top: 4px;
    height: 105px;
    border-right: 2px solid #bdbdbd;

    @media all and (max-width: 680px){
        height: 120px;    
    }
`

const DetailInfo = styled.div`
    @media all and (max-width: 680px){
        p {
            
        } 
    }
`

const Location = styled.div`
    margin: 0;
    margin-top: -5px;
    margin-left: -4px;
    display: flex;
    flex-direction: row;

    h2 {
        font-size: 16px;
        font-weight: 600;
        color: #092B35;
    }
`
const Time = styled.div`
    margin-top: -7px;
    margin-bottom: 25px;
    display: flex;
    img {
        margin-right: 8px;
        margin-left: -2px;
        width: 14px;
        height: 16px;
        margin-top: 3px;
    }

    h2 {
        margin: 0;
        color: #777777;
        font-size: 16px;
    }

    span {
        color: #092B35;
        font-weight: 600;
    }
`

const Date = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 30px;
    
    h2 {
        margin: 0;
        margin-top: -18px;
        margin-left: -10px;
        color: #EF9C6D;
        font-weight: 800;
        font-size: 46px;
    }

    h3 {
        color: #EF9C6D;
        font-weight: 800;
        font-size: 23px;
        text-transform: uppercase;
        margin-top: -15px;
        padding-bottom: 25px;
    }

    img {
        width: 45px;
        height: 45px;
    }

    @media all and (max-width: 680px){
        margin-top: -55px;
        margin-left: 0;
        h2 {
            font-size: 34px;
        }

        img {
            width: 35px;
            margin-top: -35px;
        }
    }
`

const FlierImg = styled.img`
    height: 100%;
    box-shadow: -4px 4px 35px -10px rgba(0,0,0,0.38);

    @media all and (max-width: 680px) {
        display: none;
    }
`

const LocImg = styled.img`
    margin-right: 5px;
    width: 18px;
    height: 18px;

    @media all and (max-width: 680px){
        width: 25px;
    }
`

const Events: React.FC<{}> = () => {

    return (
        <Wrap>
            <Element name="events">
                <Title>
                <img src={require('../../../../static/img/rectangle.svg')}/>
                    <h1>Events</h1>
                </Title>
                <Wrapper>
                    <Filter>    
                        <h3>
                            Filter
                        </h3>
                        <Sigs>
                            <ImgWrapper>
                                <ImgImg src={require('../../../../static/img/trophy.png')}/>
                                <ImgImg src={require('../../../../static/img/controller.png')}/>
                                <ImgImg src={require('../../../../static/img/controller.png')}/>
                                <ImgImg src={require('../../../../static/img/lock.png')}/>
                                <ImgImg src={require('../../../../static/img/lock.png')}/>
                                <ImgImg src={require('../../../../static/img/cursor.png')}/>
                                <ImgImg src={require('../../../../static/img/$.png')}/>
                            </ImgWrapper>
                            <SigWrapper>
                                <h4>
                                    ACM Comp
                                </h4>
                                <h4>
                                    ACM Data
                                </h4>
                                <h4>
                                    ACM Game
                                </h4>
                                <h4>
                                    ACM Hack
                                </h4>
                                <h4>
                                    ACM Sec
                                </h4>
                                <h4>
                                    ACM Web
                                </h4>
                                <h4>
                                    ACM-W
                                </h4>
                            </SigWrapper>
                            <CheckBoxWrapper>
                                <Checkbox style={{marginLeft: "8px"}}/>
                                <Checkbox/>
                                <Checkbox/>
                                <Checkbox/>
                                <Checkbox/>
                                <Checkbox/>
                                <Checkbox/>
                            </CheckBoxWrapper>
                        </Sigs>
                    </Filter>
                    <EventWrapper className="scroll" >
                    {
                        events.events.map((event, i) => {
                            return (
                                <Event>
                                    <SmallInfo> {/*
                                        <ImageGroup >
                                        <Image style={{ width: "170px"}} alt="flier" src={require('../../../../static/img/flier.jpg')}/>
                                    </ImageGroup>  */}
                                        <FlierImg src={require("../../../../static/img/" + event.img_path)}/>
                                        <Date>
                                            <h2>{event.day}</h2>
                                            <h3>{event.month}</h3>
                                            <img src={require("../../../../static/img/" + event.sig_logo)}/>
                                        </Date>
                                    </SmallInfo>
                                    <VerticalLine>

                                    </VerticalLine>
                                    <DetailInfo>
                                        <EventName>
                                            {event.title}
                                        </EventName>
                                        <Location>
                                            <LocImg src={require('../../../../static/img/location.svg')}/>
                                            <h2>{event.location}</h2>
                                        </Location>
                                        <Time>
                                            <img src={require('../../../../static/img/clock.svg')}/>
                                            <h2><span>Time:</span> {event.time}</h2>
                                        </Time>
                                        <p>
                                            {event.desc}
                                        </p>
                                    </DetailInfo>
                                </Event>
                            )
                        })
                    }
                    </EventWrapper>
                </Wrapper>
            </Element>
        </Wrap>
    );
};

export { Events };
