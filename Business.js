import React, { Component } from 'react';
import './Card.css';
import Card from "react-bootstrap/Card";
import axios from 'axios';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

import { Modal } from 'react-bootstrap';
import {
    EmailIcon,
    FacebookIcon,
    TwitterIcon
} from "react-share";

import {
    FacebookShareButton,
    TwitterShareButton,
    EmailShareButton
} from 'react-share';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import { MdShare } from 'react-icons/md';
import TextTruncate from 'react-text-truncate';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
class Business extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataArrGA: [],
            dataArrNY: [],
            selectValue: '',
            onAutoSuggest: false,
            isLoading: this.props.isLoading,
            showPopup: false
        };
    }

    componentDidMount() {
        try {
            console.log("inside Business.js component did mount")
            this.state.isLoading = "true"
            console.log("This is Guardian")

            axios.get(`https://p2u1s1h1a1k1hw8-node-final1.wl.r.appspot.com/news/guardianSection?section=business&apiKey=d6d06dbc-9431-4c6f-a539-18e9e6f6fbf7`)
                .then((response) => {
                    console.log(response)
                    const data = response.data.response.results;
                    this.setState({ dataArrGA: data, isLoading: false })
                });


            axios.get(`https://p2u1s1h1a1k1hw8-node-final1.wl.r.appspot.com/news/nytimes?section=business&apiKey=xFICtv25WL2BRKqP1YpIGlFhHXbK9CoG`)
                .then((response) => {
                    console.log(response)
                    const data1 = response.data.results;
                    this.setState({ dataArrNY: data1 })
                    this.setState({ isLoading: false })
                });


        }
        catch (error) {
            console.error(error);
        }

    }

    componentWillReceiveProps() {
        this.setState({ isLoading: true })
        axios.get(`https://p2u1s1h1a1k1hw8-node-final1.wl.r.appspot.com/news/guardianSection?section=business&apiKey=d6d06dbc-9431-4c6f-a539-18e9e6f6fbf7`)
            .then((response) => {
                console.log(response)
                const data = response.data.response.results;
                this.setState({ dataArrGA: data, isLoading: false })
            });


        axios.get(`https://p2u1s1h1a1k1hw8-node-final1.wl.r.appspot.com/news/nytimes?section=business&apiKey=xFICtv25WL2BRKqP1YpIGlFhHXbK9CoG`)
            .then((response) => {
                console.log(response)
                const data1 = response.data.results;
                this.setState({ dataArrNY: data1 })
                this.setState({ isLoading: false })
            });
    }
    sectionName(section) {
        if (section.toUpperCase().includes("WORLD")) {
            return <p style={{ textTransform: 'uppercase', color: 'white', backgroundColor: '#0066FF', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', float: 'right', padding: '2px' }}>WORLD</p>
        }
        else if (section.toUpperCase().includes("BUSINESS")) {
            return <p style={{ textTransform: 'uppercase', color: 'white', backgroundColor: '#66CCFF', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', float: 'right', padding: '2px' }}>BUSINESS</p>
        }
        else if (section.toUpperCase().includes("POLITICS")) {
            return <p style={{ textTransform: 'uppercase', color: 'white', backgroundColor: '#006666', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', float: 'right', padding: '2px' }}>POLITICS</p>
        }
        else if (section.toUpperCase().includes("TECHNOLOGY")) {
            return <p style={{ textTransform: 'uppercase', color: 'black', backgroundColor: '#CCCC33', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', float: 'right', padding: '2px' }}>TECHNOLOGY</p>

        }
        else if (section.toUpperCase().includes("SPORT")) {
            return <p style={{ textTransform: 'uppercase', color: 'black', backgroundColor: '#FF9933', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', float: 'right', padding: '2px' }}>SPORTS</p>

        }
        else {
            return <p style={{ textTransform: 'uppercase', color: 'white', backgroundColor: '#808080', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', float: 'right', padding: '2px' }}>{section}</p>

        }
    }

    lineClamping(desc) {

        return <TextTruncate
            line={3}
            element="span"
            truncateText="..."
            text={`${desc}`}

        />
    }

    convertDate(dateVar) {
        var date = new Date(dateVar);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return <p style={{ fontStyle: 'italic', fontWeight: 'bold', textAlign: 'left', fontSize: '14px' }}>{year + '-' + month + '-' + dt}</p>
    }

    handleClick(cardElement) {
        this.props.parentCallback(cardElement)
        if (localStorage.getItem('checked') == "true")
            this.props.history.push(`/article?id=${cardElement.id}`)
        else
            this.props.history.push(`/article?id=${cardElement.url}`)

    }
    handlePopupClose = () => { this.setState({ showPopup: false }) };
    handleDisp = () => { this.setState({ showPopup: true }) }
    render() {


        //console.log("render called: ", this.props.checked)
        //console.log("initial value of loading in business.js: ", this.state.isLoading)

        if (this.state.isLoading) {
            console.log("isLoading is true")


            return (
                <div className="loader" style={{ position: 'absolute', left: '50%', top: '50%' }}>
                    <BounceLoader
                        css={override}
                        size={40}
                        color={"blue"}
                        loading={this.state.isloading}

                    />
                    <span style={{ fontWeight: 'bold' }}>Loading</span>
                </div>

            );
        }
        else {
            console.log("inside else after loader goes off")

            if (localStorage.getItem('checked') == "true") {
                console.log("guardian news")
                var dataArr1 = this.state.dataArrGA;
                if (typeof dataArr1 === 'undefined' || dataArr1 === null)
                    return null;
                if (dataArr1.length === 0) {
                    return null;
                }
                console.log(dataArr1.length)
                var arr = []
                var imgElement = ""
                for (var i = 0; i < Math.min(dataArr1.length, 10); i++) {
                    if (dataArr1[i].webTitle === "" || dataArr1[i].blocks.body[0].bodyTextSummary === "" || dataArr1[i].webPublicationDate === "" || dataArr1[i].sectionId === "" || dataArr1[i].sectionId !== 'business' || typeof dataArr1[i].blocks.main === 'undefined') {
                        continue;
                    }
                    arr.push(dataArr1[i])
                }
                for (var i in arr) {
                    console.log(arr[i].blocks.main.elements[0].assets)
                    var assetsArr = arr[i].blocks.main.elements[0].assets
                    if (assetsArr.length === 0) {
                        console.log("image is not present.Putting default image")
                        var obj = {
                            file: "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png",
                        };
                        assetsArr.push(obj);

                    }
                }

                var i = 0;
                return (
                    <div style={{ marginTop: '1%' }}>
                        {arr.map((cardElement) =>

                            <div>
                                <Card onClick={() => this.handleClick(cardElement)} style={{ borderStyle: 'solid', borderWidth: '2px', borderRadius: '5px', borderColor: '#D8D8D8', marginBottom: "3%", marginLeft: "2%", marginRight: '2%', padding: '1%', boxShadow: "0px 7px 7px 0px " + "rgba(" + 0 + "," + 0 + "," + 0 + ",0.2)" }}>
                                    <Container fluid>
                                        <Row xs={1} md={1} lg={2} sm={1} xl={1}>
                                            <Col xl={3} lg={3} md={3}>
                                                <div>
                                                    <Card.Img variant="top" src={cardElement.blocks.main.elements[0].assets[cardElement.blocks.main.elements[0].assets.length - 1].file} style={img} />
                                                </div>

                                            </Col>
                                            <Col xl={9} lg={9} md={9}>

                                                <div>
                                                    <Card.Title style={{ fontStyle: 'italic', fontWeight: 'bold', textAlign: 'left', fontSize: '18px' }}>{cardElement.webTitle}
                                                        <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>

                                                            <MdShare onClick={this.handleDisp} />
                                                            <Modal show={this.state.showPopup} onHide={this.handlePopupClose} style={{ opacity: '1' }}>
                                                                <Modal.Header closeButton>
                                                                    <Modal.Title style={{ fontWeight: '500', fontSize: '130%' }}>{cardElement.webTitle}</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                    <p style={{ textAlign: 'center', fontWeight: '500', fontSize: '130%' }}>Share via</p>
                                                                    <Container>
                                                                        <Row>
                                                                            <Col>
                                                                                <FacebookShareButton
                                                                                    hashtag={'#CSCI_571_NewsApp'}
                                                                                    url={cardElement.webUrl}
                                                                                    className="button"
                                                                                    style={{ marginLeft: '6%' }}>
                                                                                    <FacebookIcon
                                                                                        size={60}
                                                                                        round={true}

                                                                                    />
                                                                                </FacebookShareButton>
                                                                            </Col>
                                                                            <Col>
                                                                                <TwitterShareButton
                                                                                    url={cardElement.webUrl}
                                                                                    hashtags={['CSCI_571_NewsApp']}

                                                                                    className="button"
                                                                                    style={{ marginLeft: '25%' }}>

                                                                                    <TwitterIcon
                                                                                        size={60}
                                                                                        round={true}
                                                                                    />
                                                                                </TwitterShareButton>
                                                                            </Col>
                                                                            <Col>
                                                                                <EmailShareButton
                                                                                    subject={'#CSCI_571_NewsApp'}
                                                                                    body={cardElement.webUrl}
                                                                                    url={''}
                                                                                    className="button"
                                                                                    style={{ marginLeft: '40%' }}>
                                                                                    <EmailIcon
                                                                                        size={60}
                                                                                        round={true}
                                                                                    />
                                                                                </EmailShareButton>
                                                                            </Col>

                                                                        </Row>
                                                                    </Container>
                                                                </Modal.Body>
                                                            </Modal>
                                                        </span>
                                                    </Card.Title>
                                                    <Card.Text>
                                                        <p style={{ fontSize: '14px', textAlign: 'left', marginLeft: '0px' }}>{this.lineClamping(cardElement.blocks.body[0].bodyTextSummary)}</p>
                                                        <div>
                                                            <div style={{ float: 'left' }}>{this.convertDate(cardElement.webPublicationDate)}</div>
                                                            <div style={{ paddingRight: '1%' }}>{this.sectionName(cardElement.sectionId)}</div>
                                                        </div>
                                                    </Card.Text>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card>
                            </div>

                        )}
                    </div>

                )
            }
            else {
                console.log("render for nytimes")


                var dataArr1 = this.state.dataArrNY;
                if (typeof dataArr1 === 'undefined' || dataArr1 === null)
                    return null;
                console.log("hehehehdatarr: ", dataArr1)
                console.log("dataarrlength: ", dataArr1.length)
                if (dataArr1.length === 0)
                    return null;
                console.log(dataArr1.length)
                var arr = []
                
                for (var i = 0; i < Math.min(dataArr1.length, 10); i++) {
                    if (dataArr1[i].title === "" || dataArr1[i].abstract === "" || dataArr1[i].published_date === "" || dataArr1[i].section === "" || typeof dataArr1[i].multimedia === 'undefined' || dataArr1[i].multimedia.length===0) {
                        continue;
                    }
                    dataArr1[i]['imageArr']=[]
                    var multArr=dataArr1[i].multimedia;
                for(var j=0;j<multArr.length;j++)
                {
                    if(multArr[j].width>=2000)
                        break;
                }
                if(j===multArr.length)//all images are of width <2000, display default nytimes image
                {
                    var obj = {
                        url: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg",
                    };
                    
                    dataArr1[i]['imageArr'].push(obj);
                    console.log(dataArr1[i]['imageArr'][0].url)
                }
                else
                {
       
                    dataArr1[i]['imageArr'].push(multArr[j]) 
                    console.log(dataArr1[i]['imageArr'][0].url)
                }
                    arr.push(dataArr1[i])
                }
                // for (var i in arr) {
                //     console.log(arr[i])
                //     if (arr[i].multimedia === null) {
                //         console.log("image is not present.Putting default image")
                //         var obj = {
                //             url: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg",
                //         };
                //         arr[i].multimedia = []
                //         arr[i].multimedia.push(obj);

                //     }
                //     var assetsArr = arr[i].multimedia[0];
                //     if (assetsArr.length === 0) {
                //         console.log("image is not present.Putting default image")
                //         var obj = {
                //             url: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg",
                //         };
                //         assetsArr.push(obj);

                //     }
                // }

                var i = 0;
                return (
                    <div style={{ marginTop: '1%' }}>
                        {arr.map((cardElement, i) =>
                            <div>
                                <Card onClick={() => this.handleClick(cardElement)} style={{ borderStyle: 'solid', borderWidth: '2px', borderRadius: '5px', borderColor: '#D8D8D8', marginBottom: "3%", marginLeft: "2%", marginRight: '2%', padding: '1%', boxShadow: "0px 7px 7px 0px " + "rgba(" + 0 + "," + 0 + "," + 0 + ",0.2)" }}>
                                    <Container fluid>
                                        <Row xs={1} md={1} lg={2} sm={1} xl={1}>
                                            <Col xl={3} lg={3} md={3}>
                                                <div>
                                                    <Card.Img variant="top" src={cardElement['imageArr'][0].url} style={img} />
                                                </div>
                                            </Col>
                                            <Col xl={9} lg={9} md={9}>

                                                <div>
                                                    <Card.Title style={{ fontStyle: 'italic', fontWeight: 'bold', textAlign: 'left', fontSize: '18px' }}>{cardElement.title}
                                                        <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                                                            <MdShare onClick={this.handleDisp} />
                                                            <Modal show={this.state.showPopup} onHide={this.handlePopupClose} style={{ opacity: '1' }}>
                                                                <Modal.Header closeButton>
                                                                    <Modal.Title style={{ fontWeight: '500', fontSize: '130%' }}>{cardElement.title}</Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                    <p style={{ textAlign: 'center', fontWeight: '500', fontSize: '130%' }}>Share via</p>
                                                                    <Container>
                                                                        <Row>
                                                                            <Col>
                                                                                <FacebookShareButton
                                                                                    hashtag={'#CSCI_571_NewsApp'}
                                                                                    url={cardElement.url}
                                                                                    className="button"
                                                                                    style={{ marginLeft: '6%' }}>
                                                                                    <FacebookIcon
                                                                                        size={60}
                                                                                        round={true}

                                                                                    />
                                                                                </FacebookShareButton>
                                                                            </Col>
                                                                            <Col>
                                                                                <TwitterShareButton
                                                                                    url={cardElement.url}
                                                                                    hashtags={['CSCI_571_NewsApp']}

                                                                                    className="button"
                                                                                    style={{ marginLeft: '25%' }}>

                                                                                    <TwitterIcon
                                                                                        size={60}
                                                                                        round={true}
                                                                                    />
                                                                                </TwitterShareButton>
                                                                            </Col>
                                                                            <Col>
                                                                                <EmailShareButton
                                                                                    subject={'#CSCI_571_NewsApp'}
                                                                                    body={cardElement.url}
                                                                                    url={''}
                                                                                    className="button"
                                                                                    style={{ marginLeft: '40%' }}>
                                                                                    <EmailIcon
                                                                                        size={60}
                                                                                        round={true}
                                                                                    />
                                                                                </EmailShareButton>
                                                                            </Col>

                                                                        </Row>
                                                                    </Container>
                                                                </Modal.Body>
                                                            </Modal>
                                                        </span>

                                                    </Card.Title>
                                                    <Card.Text>
                                                        <p style={{ fontSize: '14px', textAlign: 'left', marginLeft: '0px' }}>{this.lineClamping(cardElement.abstract)}</p>
                                                        <div>
                                                            <div style={{ float: 'left' }}>{this.convertDate(cardElement.published_date)}</div>
                                                            <div style={{ paddingRight: '1%' }}>{this.sectionName(cardElement.section)}</div>
                                                        </div>
                                                    </Card.Text>

                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card>

                            </div>
                        )}
                    </div>
                )
            }
        }
    }
}



const img = {
    border: '1px solid 	#E8E8E8',
    borderRadius: '4px',
    padding: '3px',

}

export default withRouter(Business);