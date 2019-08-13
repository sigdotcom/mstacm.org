import React, { useLayoutEffect, useState } from "react";
import styled from "styled-components";
import { Checkbox } from "antd";
import events from "./Events.json";
import { Element } from "react-scroll";
import windowSize from "react-window-size";
//import console = require('console');

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background: #FFFFFF;
  padding: 50px 0;

  @media all and (max-width: 1000px) {
    padding: 20px 0 100px 0;
    height: 100%;
  }

  button {
    width: 225px;
    height: 45px;
    padding: 0;
    font-size: 17px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
    background: #42C0FC;
    border: none;
    border-radius: 30px;
    color: #FFF;
    font-family: "Nunito Sans";
    font-weight: bold;
    vertical-align: top;
    margin: 0 auto;
    margin-bottom: 15px;
    display: inline;
  }
`

const FilterWrapper = styled.div`
  height: 400px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7f7f7;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px rgba(0, 0, 0, 0.25) solid;
  margin-left: 5%;

  h3 {
    padding-top: 25px;
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
    color: #092B35;
  }

  @media all and (max-width: 1000px) {
    display: none;
  }
`

const Sigs = styled.div`
  display: flex;
  height: 300px;
`

const ImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 15px;
  height: 300px;
  margin-top: 8px;
`

const ImgImg = styled.img`
  width: 25px;
  height: 25px;
`

const SigWrapper = styled.div`
  padding: 5px;
  height: 325px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const CheckBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 295px;
  margin-top: 10px;

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

const EventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  margin-left: 50px;
  margin-right: 50px;
  overflow-x: hidden;
  overflow-y: hidden;

  @media all and (max-width: 1000px) {
    width: 90%;
    margin-left: 5%;
    max-height: 100%;
    box-shadow: none;
  }
`

const Event = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%
  margin-bottom: 10px;
  margin-left: 5px;

  p {
    font-size: 17px;
  }

  a {
    font-weight: 600;
  }

  a:hover {
    color: #42C0FC;
  }

  @media all and (max-width: 1000px) {
    flex-direction: column;
    margin: 0;
    margin-bottom: 10px;
    height: 100%;
  }
`

const EventName = styled.h1`
  width: 95%;
  text-transform: uppercase;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  color: #42C0FC;
  margin: 0;

  @media all and (max-width: 1000px){
    font-size: 30px;  
  }
`

const LeftWrapper = styled.div`
  width: 225px;
  display: flex;

  a {
    width: 150px;
  }

  @media all and (max-width: 1000px){
    a {
      display: none;
    }
  }
`

const FlierImg = styled.img`
  width: 100%;
`

const SmallInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75px;

  img {
    margin-top: -15px;
    width: 45px;
    height: 45px;
  }

  @media all and (max-width: 1000px){
    width: auto;
    align-items: flex-start;
    justify-content: flex-start;

    img {
      display: none;
    }
  }
`

const VerticalLine = styled.div`
  margin-right: 25px;
  margin-left: 18px;
  margin-top: 4px;
  height: 130px;
  border-right: 2px solid #bdbdbd;

  @media all and (max-width: 1000px){
    display: none;
    height: 120px;  
    margin-left: 0;  
  }
`

const Details = styled.div`
  margin-bottom: 10px;
`

const Time = styled.div`
  display: flex;

  img {
    width: 15px;
    height: 15px;
    margin-top: 3px;
    margin-right: 0;
  }

  h2 {
    margin: 0;
    margin-left: 5px;
    color: #092B35;
    font-size: 16px;
  }
`

const Date = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  
  h2 {
    margin: 0;
    margin-bottom: -20px;
    color: #EF9C6D;
    font-size: 46px;
  }

  h3 {
    color: #EF9C6D;
    font-size: 28px;
    text-transform: uppercase;
  }

  @media all and (max-width: 1000px){
    flex-direction: row;
    width: 100%;
    margin: 0;
    margin-bottom: -10px;
    
    h2, h3 {
      font-size: 30px;
      font-weight: normal;
      margin:0;
      margin-right: 10px;
    }
  }
`

const Description = styled.p`FlierImg
  color: #777777;
  margin-bottom: 10px;
  width: 95%;

  @media all and (max-width: 1000px){
    width: 100%;
  }
`

const Show = styled.p`
  color: black;
  font-weight: bold;
  margin-top: 10px;

  @media all and (min-width: 1001px){
    display: none;
  }
`

const FlierLink = styled.a`
  color: #376B83;
  font-size: 17px;
  margin-bottom: 10px;

  @media all and (min-width: 1001px){
    display: none;
  }
`

interface IProps {
  windowWidth?: any // Used to check if user is on mobile for initially hiding text input
}

// Initalize all events to show abbreviated description
const descArr: Boolean[] = events.events.map((event) => {
  return false;
})

// Initalize no filters
const filterArr: Boolean[] = events.events.map((event) => {
  return false;
})

const Events: React.FC<IProps> = (props) => {
  const [numEvents, setNumEvents] = useState(3);
  const [isMobile, setIsMobile] = useState(true);
  const [showLongDesc, setShowLongDesc] = useState([descArr]);
  const [filters, setFilters] = useState([filterArr]);

  useLayoutEffect(() => {
    if(props.windowWidth > 1000) {
      setIsMobile(false);

      for(var i = 0; i < events.events.length; i++) {
        toggleDesc(i);
      }
    }
  }, [])

  const toggleNumEvents = () => {
    if(numEvents > 3) {
      setNumEvents(3);
    } else {
      setNumEvents(events.events.length);
    }
  }

  const toggleDesc = (i: number) => {
    if(isMobile) {
      descArr[i] = !descArr[i];
      setShowLongDesc([descArr]);
      setFilters([filterArr]);
    }
  }

  const showDesc = (i: number) => {
    if(!showLongDesc[0][i]) {
      return false;
    }
    return true;
  }

  const toggleCheckbox = (index: number) => {
    filterArr[index] = !filterArr[index];
    setFilters([filterArr]);
  }
  
  const showEvent = (i: number, group: string) => {
    if(filters[0].every((filter) => {
      return filter === false;
    })) {
      return true;
    } else if(group === "ACM Comp" && filters[0][0]) {
      return true;
    } else if(group === "ACM Data" && filters[0][1]) {
      return true;
    } else if(group === "ACM Game" && filters[0][2]) {
      return true;
    } else if(group === "ACM General" && filters[0][3]) {
      return true;
    } else if(group === "ACM Hack" && filters[0][4]) {
      return true;
    } else if(group === "ACM Sec" && filters[0][5]) {
      return true;
    } else if(group === "ACM-W" && filters[0][6]) {
      return true;
    }
    return false;
  }

  const countEvents = () => {
    var count = 0;

    for(var i = 0; i < events.events.length; i++) {
      if(showEvent(i, events.events[i].group)) {
        count++;
      }
    }
    console.log(count);

    return count;
  }

  return (
    <Element name="events">
      <Wrapper>
      <div style={{ display: "flex"}}>
        <FilterWrapper>    
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
                ACM General
              </h4>
              <h4>
                ACM Hack
              </h4>
              <h4>
                ACM Sec
              </h4>
              <h4>
                ACM-W
              </h4>
            </SigWrapper>
            <CheckBoxWrapper>
              <Checkbox onChange={() => {toggleCheckbox(0)}} style={{marginLeft: "8px"}}/>
              <Checkbox onChange={() => {toggleCheckbox(1)}}/>
              <Checkbox onChange={() => {toggleCheckbox(2)}}/>
              <Checkbox onChange={() => {toggleCheckbox(3)}}/>
              <Checkbox onChange={() => {toggleCheckbox(4)}}/>
              <Checkbox onChange={() => {toggleCheckbox(5)}}/>
              <Checkbox onChange={() => {toggleCheckbox(6)}}/>
            </CheckBoxWrapper>
          </Sigs>
        </FilterWrapper>
          <EventWrapper className="scroll" >
            {
              events.events.slice(0, numEvents).map((event, i) => {
                return (
                  <Event style={{display: (showEvent(i, event.group) ? "" : "none")}} key={i}>
                    <LeftWrapper>
                      <a href={require("../../../../static/img/" + event.img_path)} target="_blank"><FlierImg src={require("../../../../static/img/" + event.img_path)}/></a>
                      <SmallInfo>
                        <Date>
                          <h3>{event.month}</h3>
                          <h2>{event.day}</h2>
                        </Date>
                        <img src={require("../../../../static/img/" + event.sig_logo)}/>
                      </SmallInfo>
                    </LeftWrapper>
                    <VerticalLine></VerticalLine>
                    <div>
                      <EventName>{event.title}</EventName>
                      <Details>
                        <Time>
                          <img src={require('../../../../static/img/location.png')}/>
                          <h2>{event.location}</h2>
                        </Time>
                        <Time>
                          <img src={require('../../../../static/img/clock.png')}/>
                          <h2>{event.time}</h2>
                        </Time>
                        <Time>
                          <img src={require('../../../../static/img/groups.png')}/>
                          <h2>{event.group}</h2>
                        </Time>
                      </Details>
                      <Description onClick={() => toggleDesc(i)}>{(showDesc(i) ? event.desc : event.shortDesc)}</Description>
                      <FlierLink style={{display: (showDesc(i) ? "" : "none")}} href={require("../../../../static/img/" + event.img_path)} target="_blank">Click here to see the flier for this event.</FlierLink>
                      <Show onClick={() => toggleDesc(i)}>{(showDesc(i) ? "See less..." : "See more...")}</Show>
                    </div>
                  </Event>
                )
              })
            }
          </EventWrapper>
        </div>
        <button style={{ display: (countEvents() <= 3 ? "none" : "") }} onClick={toggleNumEvents}>{(numEvents === 3 ? "SHOW ALL EVENTS" : "SHOW FEWER EVENTS")}</button>
      </Wrapper>
    </Element>
  );
};

export default windowSize(Events);
