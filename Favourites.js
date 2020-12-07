import React, { Component } from 'react'
import Card from "react-bootstrap/Card";
import LinesEllipsis from 'react-lines-ellipsis'
import { Icon, InlineIcon } from '@iconify/react';
import mdShare from '@iconify/icons-ion/md-share';
import ShareModal from './ShareModal';
import { Modal, Button } from 'react-bootstrap';
import Popup from "reactjs-popup";
import { FaRegBookmark } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { Navbar, Nav } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch as RouterSwitch
} from "react-router-dom";
import AsyncSelect from 'react-select/lib/Async';
import _ from 'lodash';
import axios from 'axios';
import { MdDelete } from 'react-icons/md';
import { withRouter } from 'react-router-dom';
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
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
class Favourites extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectValue: '',
            isAutoSuggest: false,
            isLoading:this.props.isLoading,
            showPopup: false
        };
    }

    
    componentDidMount()
    {
        setTimeout(() => {  this.setState({isLoading:false}); }, 2000);
        
    }
    sectionName(section) {
        if (section.toUpperCase().includes("WORLD")){
            return <>&nbsp;<span style={{ textTransform: 'uppercase', color: 'white', backgroundColor: '#0066FF',borderRadius: '4px',fontSize:'12px',float: 'right',padding:'1px', marginTop:'2%', marginLeft:'17%',fontWeight:'bold'}}>WORLD</span></>
        }
        else if (section.toUpperCase().includes("BUSINESS")) {
            return <>&nbsp;&nbsp;<span style={{ textTransform: 'uppercase', color: 'white', backgroundColor: '#66CCFF',borderRadius: '4px',fontSize:'12px', float: 'right',padding:'1px', marginTop:'2%', marginLeft:'17%',fontWeight:'bold'}}>BUSINESS</span></>
        }
        else if (section.toUpperCase().includes("POLITICS")) {
            return <span style={{ textTransform: 'uppercase', color: 'white', backgroundColor: '#006666',borderRadius: '4px',fontSize:'12px',float: 'right',padding:'1px', marginTop:'2%', marginLeft:'17%',fontWeight:'bold'}}>POLITICS</span>
        }
        else if (section.toUpperCase().includes("TECHNOLOGY")) {
            return <span style={{ textTransform: 'uppercase', color: 'black', backgroundColor: '#CCCC33',borderRadius: '4px',fontSize:'12px',float: 'right',padding:'1px', marginTop:'2%', marginLeft:'17%',fontWeight:'bold'}}>TECHNOLOGY</span>

        }
        else if (section.toUpperCase().includes("SPORT")) {
            return <span style={{ textTransform: 'uppercase', color: 'black', backgroundColor: '#FF9933',borderRadius: '4px',fontSize:'12px',float: 'right',padding:'1px', marginTop:'2%', marginLeft:'17%',fontWeight:'bold'}}>SPORTS</span>

        }
        else {
            return <span style={{ textTransform: 'uppercase', color: 'white', backgroundColor: '#808080',borderRadius: '4px',fontSize:'12px', float: 'right', padding:'1px', marginTop:'2%', marginLeft:'17%',fontWeight:'bold'}}>{section.toUpperCase()}</span>

        }
    }
    
    handlePopupClose = () => { this.setState({ showPopup: false }) };
    handleDisp = () => { this.setState({ showPopup: true }) }

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

        return <p style={{ fontStyle: 'italic', textAlign: 'left'}}>{year + '-' + month + '-' + dt}</p>
    }
    
    handleItemSelectChange(option) {
        this.setState({selectValue: option, onAutoSuggest: true});
        console.log("option:",option.label)
       
        this.props.history.push(`/search?q=${option.label}`)

    }

    handleClick(cardElement) {
        console.log("inside Favourites",this.props)
        this.props.parentCallback(cardElement)
        if(cardElement.news ==='GUARDIAN')
            this.props.history.push(`/article?id=${cardElement.id}`)
        else
        {
            if(typeof cardElement.url !== 'undefined')
                this.props.history.push(`/article?id=${cardElement.url}`)
            else
                this.props.history.push(`/article?id=${cardElement.web_url}`)
        }
            

    }

    loadOptions(query, callback) {
        try {
            if (query) {
                console.log("hello")
                axios.get(`https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q=${query}`, {
                    headers: {
                        "Ocp-Apim-Subscription-Key": "6ac88f7f6bad45aabc23b9e76ef10b03"
                    }
                })
                    .then(function (response) {
                        //const data = response.json();   
                        console.log(response)
                        const resultsRaw = response.data.suggestionGroups[0].searchSuggestions;
                        let options = resultsRaw.map(function (result) {
                            return {
                                value: result.url,
                                label: result.displayText,
                            };
                        });
                        callback(options);
                    });
            }
        }
        catch (error) {
            console.error(`Error fetching search ${query}`);
        }

    }

    favDel(cardElement)
    {
        console.log("favourite delete")
        if(cardElement.news ==='GUARDIAN')
        {
            localStorage.removeItem(cardElement.id);
            this.props.history.push(`/favourites`);
        }
            
        else
        {
            
            localStorage.removeItem(cardElement.url)
            this.props.history.push(`/favourites`);
        }
            
    }

    showBookmark(){
        console.log("inside showBookmark!!!")
        this.props.history.push(`/favourites`);
    }

    newsFn(news)
    {
            if (news.toUpperCase() === "GUARDIAN") {
                return <>&nbsp;<span style={{ textTransform: 'uppercase', color: 'white', backgroundColor: '#000033',borderRadius: '4px',fontSize:'12px',fontWeight: 'bold',padding:'1px',marginTop: '2%'}}>GUARDIAN</span></>
            }
            else{
                return <>&nbsp;<span style={{ textTransform: 'uppercase', color: 'black', backgroundColor: '#D0D0D0',borderRadius: '4px',fontSize:'12px',fontWeight: 'bold',padding:'1px',marginTop: '2%'}}>NYTIMES</span></>
            }
            
    }
    
    render() {

        if (this.state.isLoading) {
            console.log("isLoading is true")
            //this.setState({isLoading: false})
            
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
        else
        {
        var favItems=[];
        var keys=Object.keys(localStorage);
        var i=keys.length;
        console.log("no. of items in local storage: ",i)
        while(i--){
            if(keys[i] === 'checked')
                continue;
            favItems.push(JSON.parse(localStorage.getItem(keys[i])));
            //console.log(favItems[i])
            
        }
        if(favItems.length === 0)
        {
            return (
                <Container fluid >
                    <Row xs={1} md={1} lg={1} sm={1} xl={1}>
                        <Col xl={12} style={{textAlign:'center'}}>
                       
            <h2 style={{display:'inline-block'}}>You have no saved articles</h2>
            
            </Col>
            </Row>
            </Container>
            )
        }
        else{
        return (
            
            <div style={{width:'100%'}}>
            <p style={{ textAlign: 'left', marginLeft: '15px', marginBottom: '10px', paddingTop:'1%', fontSize: '20px', fontWeight: 'bold'}}>Favourites</p>
            <Container fluid>

                <Row xs={1} md={2} lg={3} sm={1} xl={4}>
            { favItems.map((cardElement) => {
                console.log("fav: ",favItems[0].news)
                console.log("fav1: ",cardElement)
           if(cardElement.news === 'GUARDIAN')     
                return(<Col xl ={3} lg ={4} md ={6} sm={12}> 
            <Card onClick={()=>this.handleClick(cardElement)} style={{borderStyle: 'solid', borderWidth: '2px', borderRadius:'5px', borderColor: '#D8D8D8', marginRight: '2%', marginBottom: "2%", boxShadow: "0px 7px 7px 0px " + "rgba(" + 0 + "," + 0 + "," + 0 + ",0.2)" }}>
            <Card.Body style={{ width: '100%' }}>
                <Card.Title style={{ fontStyle: 'italic', fontWeight: 'bold', textAlign: 'left', fontSize: '16px', paddingLeft: '1%'}}>{cardElement.webTitle}
                <span onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>          
                <MdShare onClick ={this.handleDisp}/>
                        <Modal show={this.state.showPopup} onHide={this.handlePopupClose} style={{opacity:'1'}}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{fontWeight: '500', fontSize: '130%'}}>{cardElement.webTitle}</Modal.Title>
                        </Modal.Header>
                               <Modal.Body>
                                   <p style={{textAlign:'center',fontWeight: '500', fontSize: '130%' }}>Share URL</p>
                                   <Container>
                                       <Row>
                                           <Col>
                                           <FacebookShareButton className="button"
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
                                        style={{ marginLeft: '25%' }}
                                        className="button">

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
                                        style={{ marginLeft: '40%' }}
                                        className="button">
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
                   <span> <MdDelete onClick={(e) => {e.preventDefault(); e.stopPropagation();this.favDel(cardElement)}}></MdDelete> </span>
                </Card.Title>
                <div style={{padding:'2%'}}>
                <Card.Img variant="top" src={cardElement.blocks.main.elements[0].assets[cardElement.blocks.main.elements[0].assets.length - 1].file} style={{border: '1px solid #E8E8E8',borderRadius: '4px',padding: '2%'}} />
                    
                    <div style={{float:'left', marginTop:'4%'}}>{this.convertDate(cardElement.webPublicationDate)}</div>
                    <div style={{display:'flex', marginTop: '3%',float:'right'}}>
                        {this.sectionName(cardElement.sectionId)}
                        {this.newsFn(cardElement.news)}
                    </div>
                    </div>
                </Card.Body>
            </Card>
            </Col>)
            else

                    if(typeof cardElement.web_url==='undefined')
                  return(<Col xl ={3} lg ={4} md ={6} sm={12}> 
                <Card onClick={()=>this.handleClick(cardElement)} style={{borderStyle: 'solid', borderWidth: '2px', borderRadius:'5px', borderColor: '#D8D8D8', marginRight: '2%', marginBottom: "2%", boxShadow: "0px 7px 7px 0px " + "rgba(" + 0 + "," + 0 + "," + 0 + ",0.2)" }}>
                <Card.Body style={{ width: '100%' }}>
                <Card.Title style={{ fontStyle: 'italic', fontWeight: 'bold', textAlign: 'left', fontSize: '16px', paddingLeft: '1%'}}>{cardElement.title}
                <span onClick={(e)=>{e.preventDefault();e.stopPropagation();}}>
                <MdShare onClick ={this.handleDisp}/>
                        <Modal show={this.state.showPopup} onHide={this.handlePopupClose} style={{opacity:'1'}}>
                        <Modal.Header closeButton>
                            <Modal.Title style={{fontWeight:'500', fontSize:'130%'}}>{cardElement.title}</Modal.Title>
                        </Modal.Header>
                               <Modal.Body>
                                   <p style={{textAlign:'center',fontWeight:'500',fontSize:'130%'}}>Share via</p>
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
                <span>    <MdDelete onClick={(e) => {e.preventDefault(); e.stopPropagation();this.favDel(cardElement)}}></MdDelete></span>
                    
                </Card.Title>
                <div style={{padding:'2%'}}>
                {/* {cardElement.multimedia[0].url !== 'undefined'? <Card.Img variant="top" src={cardElement.multimedia[0].url} style={{border: '1px solid #E8E8E8',borderRadius: '4px',padding: '2%'}} />:<Card.Img variant="top" src={"https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"} style={{border: '1px solid #E8E8E8',borderRadius: '4px',padding: '2%'}}/>} */}
                {/* <Card.Img variant="top" src={cardElement.multimedia[0].url} style={{border: '1px solid #E8E8E8',borderRadius: '4px',padding: '2%'}} /> */}
                {cardElement['imageArr'][0].url.startsWith("https")?<Card.Img variant="top" src={cardElement['imageArr'][0].url} style={{border: '1px solid #E8E8E8',borderRadius: '4px',padding: '3px',width: '300px',height: '200px'}}/>:<Card.Img variant="top" src={"https://www.nytimes.com/"+cardElement['imageArr'][0].url} style={{border: '1px solid #E8E8E8',borderRadius: '4px',padding: '3px',width: '300px',height: '200px'}}/>}
                {/* {(cardElement.multimedia === 'undefined'|| cardElement.multimedia.length===0)?<Card.Img variant="top" src={'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg'} style={{border: '1px solid #E8E8E8',borderRadius: '4px',padding: '3px',width: '300px',height: '200px'}}></Card.Img> : cardElement.multimedia[0].url.startsWith("https")?<Card.Img variant="top" src={cardElement.multimedia[0].url} style={{border: '1px solid #E8E8E8',borderRadius: '4px',padding: '3px',width: '300px',height: '200px'}}/>:< Card.Img variant="top" src={"https://static01.nyt.com/"+cardElement.multimedia[0].url} style={{border: '1px solid #E8E8E8',borderRadius: '4px',padding: '3px',width: '300px',height: '200px'}}/>} */}
                <div style={{float:'left', marginTop:'4%'}}>{this.convertDate(cardElement.published_date)}</div>
                <div style={{display:'flex', marginTop: '3%',float:'right'}}>
                {this.sectionName(cardElement.section)}
                {this.newsFn(cardElement.news)}
                    </div>
                    </div>
                </Card.Body>
            </Card>
            </Col>)
            else
            return(<Col xl ={3} lg ={4} md ={6} sm={12}> 
                <Card onClick={()=>this.handleClick(cardElement)} style={{borderStyle: 'solid', borderWidth: '2px', borderRadius:'5px', borderColor: '#D8D8D8', marginRight: '2%', marginBottom: "2%", boxShadow: "0px 7px 7px 0px " + "rgba(" + 0 + "," + 0 + "," + 0 + ",0.2)" }}>
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
                <span>    <MdDelete onClick={(e) => {e.preventDefault(); e.stopPropagation();this.favDel(cardElement)}}></MdDelete></span>
                    
                </Card.Title>
                <div style={{padding:'2%'}}>
                {/* {cardElement.multimedia[0].url !== 'undefined'? <Card.Img variant="top" src={cardElement.multimedia[0].url} style={{border: '1px solid #E8E8E8',borderRadius: '4px',padding: '2%'}} />:<Card.Img variant="top" src={"https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg"} style={{border: '1px solid #E8E8E8',borderRadius: '4px',padding: '2%'}}/>} */}
                {/* <Card.Img variant="top" src={cardElement.multimedia[0].url} style={{border: '1px solid #E8E8E8',borderRadius: '4px',padding: '2%'}} /> */}
                {cardElement['imageArr'][0].url.startsWith("https")?<Card.Img variant="top" src={cardElement['imageArr'][0].url} style={{border: '1px solid #E8E8E8',borderRadius: '4px',padding: '3px',width: '300px',height: '200px'}}/>:<Card.Img variant="top" src={"https://www.nytimes.com/"+cardElement['imageArr'][0].url} style={{border: '1px solid #E8E8E8',borderRadius: '4px',padding: '3px',width: '300px',height: '200px'}}/>}
                {/* {(cardElement.multimedia === 'undefined'|| cardElement.multimedia.length===0)?<Card.Img variant="top" src={'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg'} style={{border: '1px solid #E8E8E8',borderRadius: '4px',padding: '3px',width: '300px',height: '200px'}}></Card.Img> : cardElement.multimedia[0].url.startsWith("https")?<Card.Img variant="top" src={cardElement.multimedia[0].url} style={{border: '1px solid #E8E8E8',borderRadius: '4px',padding: '3px',width: '300px',height: '200px'}}/>:< Card.Img variant="top" src={"https://static01.nyt.com/"+cardElement.multimedia[0].url} style={{border: '1px solid #E8E8E8',borderRadius: '4px',padding: '3px',width: '300px',height: '200px'}}/>} */}
                <div style={{float:'left', marginTop:'4%'}}>{this.convertDate(cardElement.pub_date)}</div>
                <div style={{display:'flex', marginTop: '3%',float:'right'}}>
                {this.sectionName(cardElement.section_name)}
                {this.newsFn(cardElement.news_desk)}
                    </div>
                    </div>
                </Card.Body>
            </Card>
            </Col>)
        })         
                }
                </Row>
                </Container>   
                        
        </div>)
        } 
    }  
    }
    
}

export default withRouter(Favourites);