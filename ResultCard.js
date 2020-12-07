import React, { Component } from 'react'

import _ from 'lodash';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import Card from "react-bootstrap/Card";

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
import { MdShare } from 'react-icons/md';
import { Modal} from 'react-bootstrap';
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/core";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
class ResultCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataArrGA: [],
            dataArrNY: [],
            selectValue: '',
            arr: [],
            option: null,
            showPopup:false,
            isLoading: this.props.isLoading
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        var option = queryString.parse(this.props.location.search).q;
        this.setState({ option: option })
        
            axios.get(`https://p2u1s1h1a1k1hw8-node-final1.wl.r.appspot.com/news/guardian?q=${option}&apiKey=d6d06dbc-9431-4c6f-a539-18e9e6f6fbf7`)
            .then((response) => {
                console.log("response from autosuggest: ", response)
                const data = response.data.response.results;
                this.setState({ dataArrGA: data, isLoading: false})
            });

       
            axios.get(`https://p2u1s1h1a1k1hw8-node-final1.wl.r.appspot.com/news/nytimes?q=${option}&apiKey=xFICtv25WL2BRKqP1YpIGlFhHXbK9CoG`)
            .then((response) => {
                console.log(response)
                console.log("response from autosuggest: ", response)
                const data1 = response.data.response.docs;
                this.setState({ dataArrNY: data1, isLoading: false })
            });
    }

    componentWillReceiveProps() {
        this.setState({ isLoading: true })
        var option = queryString.parse(this.props.location.search).q;

        this.setState({ option: option })
        
            axios.get(`https://p2u1s1h1a1k1hw8-node-final1.wl.r.appspot.com/news/guardian?q=${option}&apiKey=d6d06dbc-9431-4c6f-a539-18e9e6f6fbf7`)
            .then((response) => {
                console.log("response from autosuggest: ", response)
                const data = response.data.response.results;
                this.setState({ dataArrGA: data, isLoading: false })
            });

            axios.get(`https://p2u1s1h1a1k1hw8-node-final1.wl.r.appspot.com/news/nytimes?q=${option}&apiKey=xFICtv25WL2BRKqP1YpIGlFhHXbK9CoG`)
            .then((response) => {
                console.log(response)
                console.log("response from autosuggest: ", response)
                const data1 = response.data.response.docs;
                this.setState({ dataArrNY: data1, isLoading: false })
            });
    }

    handleChange(checked) {
        this.setState({ checked });
    }

    sectionName(section) {
        if(section=='undefined'||section==null)
            return null
        if (section.toUpperCase() === "WORLD") {
            return <span style={{ textTransform: 'uppercase', color: 'white', backgroundColor: '#0066FF',borderRadius: '4px',fontSize:'14px',float: 'right',padding:'3px', marginTop:'2%'}}>WORLD</span>
        }
        else if (section.toUpperCase() === "BUSINESS") {
            return <span style={{ textTransform: 'uppercase', color: 'white', backgroundColor: '#66CCFF',borderRadius: '4px',fontSize:'14px',float: 'right',padding:'3px', marginTop:'2%'}}>BUSINESS</span>
        }
        else if (section.toUpperCase() === "POLITICS") {
            return <span style={{ textTransform: 'uppercase', color: 'white', backgroundColor: '#006666',borderRadius: '4px',fontSize:'14px',float: 'right',padding:'3px', marginTop:'2%'}}>POLITICS</span>
        }
        else if (section.toUpperCase() === "TECHNOLOGY") {
            return <span style={{ textTransform: 'uppercase', color: 'black', backgroundColor: '#CCCC33',borderRadius: '4px',fontSize:'14px',float: 'right',padding:'3px', marginTop:'2%'}}>TECHNOLOGY</span>

        }
        else if (section.toUpperCase() === "SPORT") {
            return <span style={{ textTransform: 'uppercase', color: 'black', backgroundColor: '#FF9933',borderRadius: '4px',fontSize:'14px',float: 'right',padding:'3px', marginTop:'2%'}}>SPORTS</span>

        }
        else {
            return <span style={{ textTransform: 'uppercase', color: 'white', backgroundColor: '#808080',borderRadius: '4px',fontSize:'14px',float: 'right', padding:'3px', marginTop:'2%'}}>{section.toUpperCase()}</span>

        }
    }


    lineClamping(desc) {
        var c = 0;
        var i = 0;
        console.log(i)
        desc = desc.substring(0, 500)
        if (desc.length <= desc.lastIndexOf(" ")) {
            desc = desc.substring(0, desc.length);

        }

        else {
            desc = desc.substring(0, desc.lastIndexOf(" "));
            
        }

        
        desc = desc + "...";
        return desc
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

        return <span style={{ fontStyle: 'italic', textAlign: 'left' }}>{year + '-' + month + '-' + dt}</span>
    }
    
    handleClick(cardElement) {
        
        this.props.parentCallback(cardElement)
        if(typeof cardElement.id !== 'undefined')
            this.props.history.push(`/article?id=${cardElement.id}`)
        else
        {
            this.props.history.push(`/article?id=${cardElement.web_url}`)
        }
            

    }
    handlePopupClose=()=>{this.setState({showPopup:false})};
    handleDisp=()=>{this.setState({showPopup:true})}
    render() {
        if (this.state.isLoading) {
            console.log("isLoading is true")
            
            
            return (
                <div className="loader" style={{position:'absolute',left:'50%',top:'50%'}}>
                    <BounceLoader
                        css={override}
                        size={40}
                        color={"blue"}
                        loading={this.state.isloading}
                        
                    />
                    <span style={{fontWeight:'bold'}}>Loading</span>
                </div>
                
            );
        }
        else{
        var dataArrGA = this.state.dataArrGA;
        var dataArrNY = this.state.dataArrNY;
        
        if(typeof dataArrGA === 'undefined' || dataArrGA === null || typeof dataArrNY === 'undefined' || dataArrNY === null)
        {
            return (
                <Container fluid >
                    <Row xs={1} md={1} lg={1} sm={1} xl={1}>
                        <Col xl={12} style={{textAlign:'center'}}>
                       
            <h2 style={{display:'inline-block'}}>No results</h2>        
            </Col>
            </Row>
            </Container>
            )
        }
            
        
        else if (dataArrGA.length === 0 && dataArrNY.length === 0) {
        
            return (
                <Container fluid >
                    <Row xs={1} md={1} lg={1} sm={1} xl={1}>
                        <Col xl={12} style={{textAlign:'center'}}>
                       
            <h2 style={{display:'inline-block'}}>No results</h2>        
            </Col>
            </Row>
            </Container>
            )
        }
        else
        {
            var arr = [];
        for (var i = 0; i < Math.min(dataArrGA.length, 5); i++) {
            if (dataArrGA[i].webTitle === "" || dataArrGA[i].blocks.body[0].bodyTextSummary === "" || dataArrGA[i].webPublicationDate === "" || dataArrGA[i].sectionId === "") {
                continue;
            }
            arr.push(dataArrGA[i])
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

        
        var arrNY = [];
        
        for (var i = 0; i < Math.min(dataArrNY.length, 5); i++) {
            if (dataArrNY[i].headline.main === "" || dataArrNY[i].abstract === "" || dataArrNY[i].pub_date === "" || dataArrNY[i].news_desk === "" || typeof dataArrNY[i].news_desk === 'undefined'|| typeof dataArrNY[i].multimedia === 'undefined' || dataArrNY[i].multimedia.length===0) {
                continue;
            }
            dataArrNY[i]['imageArr']=[]
                var multArr=dataArrNY[i].multimedia;
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
                    
                    dataArrNY[i]['imageArr'].push(obj);
                    console.log(dataArrNY[i]['imageArr'][0].url)
                }
                else
                {
       
                    dataArrNY[i]['imageArr'].push(multArr[j]) 
                    console.log(dataArrNY[i]['imageArr'][0].url)
                }
            arrNY.push(dataArrNY[i])
        }
        // for (var i in arrNY) {
        //     console.log(arrNY[i])
        //     if (arrNY[i].multimedia === null ||arrNY[i].multimedia === 'undefined') {
        //         var multimedia=[];
        //         console.log("image is not present.Putting default image")
        //         var obj = {
        //             url: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg",
        //         };
        //         arrNY[i].push(multimedia)
                
        //         arrNY[i].multimedia[0].push(obj);

        //     }
            
        //     console.log(assetsArr)
        //     console.log(arrNY[i].multimedia[0])
        //     if(arrNY[i].multimedia[0] === 'undefined')
        //     {
        //         var obj1 = {
        //             url: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg",
        //         };
        //         arrNY[i].multimedia[0].push(obj1);
        //     }
            
        // }

        var i = 0;
        return (
            <div style={{width:'100%'}}>
                <div> <p style={{ textAlign: 'left', marginLeft: '15px', marginBottom: '10px', marginTop: '-4px', fontSize: '20px', fontWeight: 'bold'}}>Results</p></div>
                <Container fluid>

                <Row xs={1} md={2} lg={3} sm={1} xl={4}>
                    {arr.map((cardElement) =>
                    <Col xl ={3} lg ={4} md ={6} sm={12}>
                        <Card onClick={() => this.handleClick(cardElement)} style={{borderStyle: 'solid', borderWidth: '2px', borderRadius:'5px', borderColor: '#D8D8D8', marginRight: '2%', marginBottom: "2%", boxShadow: "0px 7px 7px 0px " + "rgba(" + 0 + "," + 0 + "," + 0 + ",0.2)" }}>                      
                            <Card.Body style={{ width: '100%' }}>
                            <Card.Title style={{ fontStyle: 'italic', fontWeight: 'bold', textAlign: 'left', fontSize: '16px', paddingLeft: '1%'}}>{cardElement.webTitle}
                            <span onClick={(e)=>{e.preventDefault();e.stopPropagation();}}>
                            <MdShare onClick ={this.handleDisp}/>
                        <Modal show={this.state.showPopup} onHide={this.handlePopupClose} style={{opacity:'1'}}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{fontWeight:'500', fontSize:'130%'}}>{cardElement.webTitle}</Modal.Title>
                        </Modal.Header>
                               <Modal.Body>
                                   <p style={{textAlign:'center',fontWeight:'500',fontSize:'130%'}}>Share via</p>
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
                                <div style={{padding:'2%'}}>
                                   
                                    <Card.Img variant="top" src={cardElement.blocks.main.elements[0].assets[cardElement.blocks.main.elements[0].assets.length - 1].file} style={{border: '1px solid #E8E8E8',borderRadius: '4px',padding: '2%',}} />
                                    <div style={{float:'left', marginTop:'4%'}}>{this.convertDate(cardElement.webPublicationDate)}</div>
                                    <div style={{marginTop:'2%'}}>{this.sectionName(cardElement.sectionId)}</div>
                                </div>
                                
                            </Card.Body>                         
                        </Card>
                        </Col>)
                        }
                        

                    {arrNY.map((cardElement) =>
                        <Col  xl ={3} lg ={4} md ={6} sm={12}>
                        <Card onClick={() => this.handleClick(cardElement)} className="carddiv" style={{borderStyle: 'solid', borderWidth: '2px', borderRadius:'5px', borderColor: '#D8D8D8', marginRight: '2%', marginBottom: "2%", boxShadow: "0px 7px 7px 0px " + "rgba(" + 0 + "," + 0 + "," + 0 + ",0.2)" }}>
                            <Card.Body style={{ width: '100%' }}>
                            <Card.Title style={{ fontStyle: 'italic', fontWeight: 'bold', textAlign: 'left', fontSize: '16px', paddingLeft: '1%'}}>{cardElement.headline.main}
                            <span onClick={(e)=>{e.preventDefault();e.stopPropagation();}}>
                                
                                <MdShare onClick ={this.handleDisp}/>
                        <Modal show={this.state.showPopup} onHide={this.handlePopupClose} style={{opacity:'1'}}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{fontWeight:'500', fontSize:'130%'}}>{cardElement.headline.main}</Modal.Title>
                        </Modal.Header>
                               <Modal.Body>
                                   <p style={{textAlign:'center',fontWeight:'500',fontSize:'130%'}}>Share via</p>
                                   <Container>
                                       <Row>
                                           <Col>
                                           <FacebookShareButton
                                        hashtag={'#CSCI_571_NewsApp'}
                                        url={cardElement.web_url}
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
                                        url={cardElement.web_url}
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
                                        body={cardElement.web_url}
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
                            <div style={{padding:'2%'}}>
                            
                                {cardElement['imageArr'][0].url.startsWith("https")?<Card.Img variant="top" src={cardElement['imageArr'][0].url} style={{border: '1px solid #E8E8E8',borderRadius: '4px',padding: '3px',width: '300px',height: '200px'}}/>:<Card.Img variant="top" src={"https://www.nytimes.com/"+cardElement['imageArr'][0].url} style={{border: '1px solid #E8E8E8',borderRadius: '4px',padding: '3px',width: '300px',height: '200px'}}/>}
                                <div  style={{float:'left', marginTop:'4%'}}>{this.convertDate(cardElement.pub_date)}</div>
                                <div style={{marginTop:'2%'}}>{(typeof cardElement.news_desk === 'undefined'|| cardElement.news_Desk===null)?this.sectionName("Other"):this.sectionName(cardElement.news_desk)}</div> 
                                    
                                </div>
                            </Card.Body>
                        </Card>
                        
                        </Col>)
                        }
                        </Row>
                        </Container>)
                </div>
            
        )

    }
}
}


}


export default withRouter(ResultCard)