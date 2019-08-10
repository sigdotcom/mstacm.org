import * as React from "react";
import styled from "styled-components";
import {Element} from "react-scroll";

const SponsorWrap = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    background: #DFE6E9;
`

const Title = styled.div`
    position: relative;
    text-align: center;
    margin-top: -36px;
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

const Sponsor = styled.div`
    height: 100%;
    width: 100%;
    text-align: center;
    padding-top: 100px;

    @media all and (max-width: 680px) {
        padding-top: 55px;
    }

    h2 {
        font-weight: 800;
        font-size: 50px;
    }

    @media all and (max-width: 680px) {
        h2 {
            font-size: 35px;
        }
    }
`

const Logos = styled.div`
    width: 100%
    background: #DFE6E9;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Big = styled.div`
    margin-top: 30px;

    @media all and (max-width: 680px) {
        display: flex;
        flex-direction: column;
        margin-bottom: 25px;
    }

    img {
        margin: 30px 30px 100px 30px;
        width: 180px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);

        @media all and (max-width: 680px) {
            width: 220px;
            margin: 10px 10px 30px 10px;
        }
    }

    img:hover{
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        width: 190px;
        margin: 25px 25px 95px 25px; 
    }
`


const Sponsors: React.FC<{}> = () => {
    return (
        <SponsorWrap>
            <Element name="sponsors">
                <Title>
                    
                    <img src={require('../../../../static/img/rectangle.svg')}/>
                    <h1>Sponsors</h1>
                </Title>
                <Sponsor>
                    <h2>Big Thanks to our Sponsors and Partners!</h2>
                </Sponsor>
                <Logos>
                    <Big>
                    <img src={require('../../../../static/img/garmin.jpg')}/>
                    <img src={require('../../../../static/img/at&t.jpg')}/>
                    <img src={require('../../../../static/img/tradebot.jpg')}/>
                    </Big>
                </Logos>
            </Element>
        </SponsorWrap>
    );
}

export { Sponsors };