import React, { Component } from 'react';
import Card from "react-bootstrap/Card";

import axios from 'axios';

import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'


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

import _ from 'lodash';

import { withRouter } from 'react-router-dom';
import commentBox from 'commentbox.io';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';


import ReactTooltip from 'react-tooltip';
import TextTruncate from 'react-text-truncate';
class DetailedArticle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataArr: [],
            checked: true,
            selectValue: '',
            isAutoSuggest: false,
            isLoading: true
        };
        this.handleChange = this.handleChange.bind(this);
        ReactTooltip.rebuild();
        toast.configure();
    }


    handleChange(checked) {
        this.setState({ checked });
    }


    lineClamping(desc) {

        return <TextTruncate
            line={6}
            element="span"
            truncateText="..."
            text={`${desc}`}></TextTruncate>
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

        return <p style={{ fontStyle: 'italic', fontWeight: 'bold', textAlign: 'left', fontSize: '14px', marginLeft: '20px' }}>{year + '-' + month + '-' + dt}</p>
    }

    expandDesc() {
        var x = document.getElementById('short-desc');
        x.style.display = 'none'
        var y = document.getElementById('long-desc');
        y.style.display = 'block';
        return null
    }
    contractDesc() {
        var x = document.getElementById('short-desc');
        x.style.display = 'block'
        var y = document.getElementById('long-desc');
        y.style.display = 'none';
        return null
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

    handleItemSelectChange(option) {
        this.setState({ selectValue: option, onAutoSuggest: true });
        console.log("option:", option.label)

        this.props.history.push(`/search?q=${option.label}`)

    }

    componentDidMount() {
        console.log("componentDidMount of detailed article")
        this.setState({ isLoading: false });
        ReactTooltip.rebuild();
        this.removeCommentBox = commentBox('5734888082767872-proj');

    }


    componentWillUnmount() {

        this.removeCommentBox();
    }

    displayToast() {

        console.log("calling display toast", this.props)
        // console.log("inside display toast: ", this.state.checked)
        // console.log("detailed article:", this.state.checked)
        //if (this.props.checked) {
        //if(localStorage.getItem('checked')=="true"){
        if(typeof this.props.cardElement.id !== 'undefined'){
            if (localStorage.getItem(this.props.cardElement.id) == null) {

                toast("Saving " + this.props.cardElement.webTitle, {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true,
                    autoClose: 3000,
                    className: css({
                        color: "black"
                    })
                })

                document.getElementById("bookmark-id1").style.display = 'none'
                document.getElementById("bookmark-id2").style.display = 'block'
                this.props.cardElement['news'] = 'GUARDIAN'
                console.log(this.props.cardElement['news'])
                localStorage.setItem(this.props.cardElement.id, JSON.stringify(this.props.cardElement))


            }
            else {
                toast("Removing - " + this.props.cardElement.webTitle, {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true,
                    autoClose: 3000,
                    className: css({
                        color: "black"
                    })
                }
                )
                document.getElementById("bookmark-id1").style.display = 'block';
                document.getElementById("bookmark-id2").style.display = 'none';
                localStorage.removeItem(this.props.cardElement.id)
            }
        }
        else if (typeof this.props.cardElement.url !== 'undefined') {
            if (localStorage.getItem(this.props.cardElement.url) == null) {
                toast("Saving " + this.props.cardElement.title, {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true,
                    autoClose: 3000,
                    className: css({
                        color: "black"
                    })
                }
                )

                document.getElementById("bookmark-id1").style.display = 'none';
                document.getElementById("bookmark-id2").style.display = 'block';
                this.props.cardElement['news'] = 'NYTIMES'
                localStorage.setItem(this.props.cardElement.url, JSON.stringify(this.props.cardElement));
            }
            else {
                toast("Removing - " + this.props.cardElement.title, {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true,
                    autoClose: 3000,
                    className: css({
                        color: "black"
                    })
                }
                )
                document.getElementById("bookmark-id1").style.display = 'block';
                document.getElementById("bookmark-id2").style.display = 'none';
                localStorage.removeItem(this.props.cardElement.url)
            }
        }
        else {
            if (localStorage.getItem(this.props.cardElement.web_url) == null) {
                toast("Saving " + this.props.cardElement.headline.main, {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true,
                    autoClose: 3000,
                    className: css({
                        color: "black"
                    })
                }
                )

                this.props.cardElement['news'] = 'NYTIMES'
                localStorage.setItem(this.props.cardElement.web_url, JSON.stringify(this.props.cardElement));
            }
            else {
                toast("Removing - " + this.props.cardElement.headline.main, {
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: true,
                    autoClose: 3000,
                    className: css({
                        color: "black"
                    })
                }
                )
                localStorage.removeItem(this.props.cardElement.web_url)
            }
        }
    }

    render() {

        var cardElement = this.props.cardElement;
        console.log("card element ", cardElement)

        if (typeof cardElement.id !== 'undefined') {
            console.log(cardElement)
            if (typeof cardElement.blocks === 'undefined') {
                console.log("nothing is there in cardelement")
                return null;
            }
            return (
                <>
                    <div style={{ marginTop: '1%' }}>
                        <Card id='carddiv' className="carddiv" style={{ width: '98%', borderStyle: 'solid', borderWidth: '1px', borderRadius: '5px', borderColor: '#D8D8D8', marginTop: "10px", marginLeft: '10px', display: 'flex', boxShadow: "0px 7px 7px 0px " + "rgba(" + 0 + "," + 0 + "," + 0 + ",0.2)" }}>

                            <Card.Body id='cardbody' style={{ width: '100%' }}>
                                <Card.Title style={{ fontStyle: 'italic', fontWeight: 'bold', textAlign: 'left', marginTop: '7px', fontSize: '20px', paddingLeft: '10px' }}>{cardElement.webTitle}</Card.Title>


                                <div style={{ width: '100%', display: 'flex' }}>
                                    <div style={{ float: 'left', width: '100%' }}>{this.convertDate(cardElement.webPublicationDate)}</div>
                                    <div style={{ display: 'flex', marginRight: '6%' }}>
                                        <FacebookShareButton data-tip="Facebook" className="button"
                                            hashtag={'#CSCI_571_NewsApp'}
                                            url={cardElement.webUrl}
                                            className="button">
                                            <FacebookIcon
                                                size={30}
                                                round={true}
                                            />
                                        </FacebookShareButton>
                                        <TwitterShareButton
                                            data-tip="Twitter"
                                            url={cardElement.webUrl}
                                            hashtags={['CSCI_571_NewsApp']}
                                            className="button">
                                            <TwitterIcon
                                                size={30}
                                                round={true}
                                            />
                                        </TwitterShareButton>
                                        <EmailShareButton
                                            data-tip="Email"
                                            subject={'#CSCI_571_NewsApp'}
                                            body={cardElement.webUrl}
                                            url={''}
                                            className="button">
                                            <EmailIcon
                                                size={30}
                                                round={true}
                                            />
                                        </EmailShareButton>
                                        <ReactTooltip effect="solid" place="top" />
                                    </div>
                                    {localStorage.getItem(cardElement.id) == null ?
                                        <><div data-tip="Bookmark" style={{ marginTop: '5px', marginLeft: '2%' }} id="bookmark-id1">
                                            <FaRegBookmark style={{ color: 'red' }} className="bookmark" onClick={() => this.displayToast()}></FaRegBookmark>
                                            <ReactTooltip effect="solid" place="top" />
                                        </div>
                                            <div data-tip="Bookmark" style={{ marginTop: '5px', marginLeft: '2%', display: 'none' }} id="bookmark-id2">
                                                <FaBookmark style={{ color: 'red' }} className="bookmark" onClick={() => this.displayToast()}></FaBookmark>
                                                <ReactTooltip effect="solid" place="top" />
                                            </div></> :
                                        <> <div data-tip="Bookmark" style={{ marginTop: '5px', marginLeft: '2%' }} id="bookmark-id2">
                                            <FaBookmark style={{ color: 'red' }} className="bookmark" onClick={() => this.displayToast()}></FaBookmark>
                                            <ReactTooltip effect="solid" place="top" />
                                        </div>
                                            <div data-tip="Bookmark" style={{ marginTop: '5px', marginLeft: '2%', display: 'none' }} id="bookmark-id1">
                                                <FaRegBookmark style={{ color: 'red' }} className="bookmark" onClick={() => this.displayToast()}></FaRegBookmark>
                                                <ReactTooltip effect="solid" place="top" />
                                            </div></>
                                    }

                                </div>

                                <div style={{ marginTop: '15px', marginLeft: '7px' }}>
                                    <Card.Img variant="top" src={cardElement.blocks.main.elements[0].assets[cardElement.blocks.main.elements[0].assets.length - 1].file} style={{ width: '98%', height: '70%' }} />
                                    <div id='short-desc'>
                                        <Card.Text>
                                            <p style={{ fontSize: '14px', textAlign: 'justify', marginRight: '1.75%', marginTop: '2%' }}>{this.lineClamping(cardElement.blocks.body[0].bodyTextSummary)}</p>
                                        </Card.Text>
                                        <IoIosArrowDown style={{ float: 'right' }} onClick={this.expandDesc}></IoIosArrowDown>
                                    </div>
                                    <div id='long-desc' style={{ 'display': 'none' }}>
                                        <Card.Text>
                                            <p style={{ fontSize: '14px', textAlign: 'justify', marginRight: '1.75%', marginTop: '2%' }}>{cardElement.blocks.body[0].bodyTextSummary}</p>
                                        </Card.Text>
                                        <IoIosArrowUp style={{ float: 'right' }} onClick={this.contractDesc}></IoIosArrowUp>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                        <div style={{ marginTop: '40px' }} className="commentbox" id={cardElement.id} />
                    </div>

                </>
            )
        }

        else if (typeof cardElement.web_url !== 'undefined')   {
            var cardElement = this.props.cardElement;
            console.log(cardElement)
            // if (typeof cardElement.title === 'undefined') {
                return (
                    <>
                        <div style={{ marginTop: '1%' }}>
                            <Card id='carddiv' className="carddiv" style={{ width: '98%', borderStyle: 'solid', borderWidth: '1px', borderRadius: '5px', borderColor: '#D8D8D8', marginTop: "10px", marginLeft: '10px', display: 'flex', boxShadow: "0px 7px 7px 0px " + "rgba(" + 0 + "," + 0 + "," + 0 + ",0.2)" }}>

                                <Card.Body id='cardbody' style={{ width: '100%' }}>
                                    <Card.Title style={{ fontStyle: 'italic', fontWeight: 'bold', textAlign: 'left', marginTop: '7px', fontSize: '20px', paddingLeft: '10px' }}>{cardElement.headline.main}</Card.Title>

                                    <div style={{ width: '100%', display: 'flex' }}>
                                        <div style={{ width: '100%', float: 'left' }}>{this.convertDate(cardElement.pub_date)}</div>
                                        <div style={{ display: 'flex', marginRight: '6%' }}>

                                            <FacebookShareButton className="button"
                                                data-tip="Facebook"
                                                hashtag={'#CSCI_571_NewsApp'}
                                                url={cardElement.web_url}
                                            >
                                                <FacebookIcon
                                                    size={30}
                                                    round={true}
                                                />
                                            </FacebookShareButton>
                                            <TwitterShareButton
                                                data-tip="Twitter"
                                                url={cardElement.web_url}
                                                hashtags={['CSCI_571_NewsApp']}
                                                className="button">
                                                <TwitterIcon
                                                    size={30}
                                                    round={true}
                                                />
                                            </TwitterShareButton>
                                            <EmailShareButton
                                                data-tip="Email"
                                                subject={'#CSCI_571_NewsApp'}
                                                body={cardElement.web_url}
                                                url={''}
                                                className="button">
                                                <EmailIcon
                                                    size={30}
                                                    round={true}
                                                />
                                            </EmailShareButton>
                                            <ReactTooltip effect="solid" place="top" />
                                        </div>
                                        {localStorage.getItem(cardElement.web_url) == null ?
                                            <><div data-tip="Bookmark" style={{ marginTop: '5px', marginLeft: '2%' }} id="bookmark-id1">
                                                <FaRegBookmark style={{ color: 'red' }} className="bookmark" onClick={() => this.displayToast()}></FaRegBookmark>
                                                <ReactTooltip effect="solid" place="top" />
                                            </div>
                                                <div data-tip="Bookmark" style={{ marginTop: '5px', marginLeft: '2%', display: 'none' }} id="bookmark-id2">
                                                    <FaBookmark style={{ color: 'red' }} className="bookmark" onClick={() => this.displayToast()}></FaBookmark>
                                                    <ReactTooltip effect="solid" place="top" />
                                                </div></> :
                                            <> <div data-tip="Bookmark" style={{ marginTop: '5px', marginLeft: '2%' }} id="bookmark-id2">
                                                <FaBookmark style={{ color: 'red' }} className="bookmark" onClick={() => this.displayToast()}></FaBookmark>
                                                <ReactTooltip effect="solid" place="top" />
                                            </div>
                                                <div data-tip="Bookmark" style={{ marginTop: '5px', marginLeft: '2%', display: 'none' }} id="bookmark-id1">
                                                    <FaRegBookmark style={{ color: 'red' }} className="bookmark" onClick={() => this.displayToast()}></FaRegBookmark>
                                                    <ReactTooltip effect="solid" place="top" />
                                                </div></>
                                        }
                                    </div>
                                    <div style={{ marginTop: '15px', marginLeft: '7px' }}>
                                    {cardElement['imageArr'][0].url.startsWith("https")?<Card.Img variant="top" src={cardElement['imageArr'][0].url} style={{ width: '98%', height: '70%' }}/>:<Card.Img variant="top" src={"https://www.nytimes.com/"+cardElement['imageArr'][0].url} style={{ width: '98%', height: '70%' }}/>}
                                        {/* {cardElement.multimedia[0].url.startsWith("https") ? <Card.Img variant="top" src={cardElement.multimedia[0].url} style={{ width: '98%', height: '70%' }} /> : <Card.Img variant="top" src={"https://static01.nyt.com/" + cardElement.multimedia[0].url} style={{ width: '98%', height: '70%' }} />} */}
                                        <div id='short-desc'>
                                            <Card.Text>
                                                <p style={{ fontSize: '14px', textAlign: 'justify', marginRight: '1.75%', marginTop: '2%' }}>{this.lineClamping(cardElement.abstract)}</p>
                                            </Card.Text>
                                            <IoIosArrowDown style={{ float: 'right' }} onClick={this.expandDesc}></IoIosArrowDown>
                                        </div>
                                        <div id='long-desc' style={{ 'display': 'none' }}>
                                            <Card.Text>
                                                <p style={{ fontSize: '14px', textAlign: 'justify', marginRight: '1.75%', marginTop: '2%' }}>{cardElement.abstract}</p>
                                            </Card.Text>
                                            <IoIosArrowUp style={{ float: 'right' }} onClick={this.contractDesc}></IoIosArrowUp>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                            <div style={{ marginTop: '40px' }} className="commentbox" id={cardElement.web_url} />
                        </div>

                    </>
                )
            }
            else {
                return (
                    <>
                        <div style={{ marginTop: '1%' }}>
                            <Card id='carddiv' style={{ width: '98%', borderStyle: 'solid', borderWidth: '1px', borderRadius: '5px', borderColor: '#D8D8D8', marginTop: "10px", marginLeft: '10px', display: 'flex', boxShadow: "0px 7px 7px 0px " + "rgba(" + 0 + "," + 0 + "," + 0 + ",0.2)" }}>

                                <Card.Body id='cardbody' style={{ width: '100%' }}>
                                    <Card.Title style={{ fontStyle: 'italic', fontWeight: 'bold', textAlign: 'left', marginTop: '7px', fontSize: '20px', paddingLeft: '10px' }}>{cardElement.title}</Card.Title>
                                    <div style={{ width: '100%', display: 'flex' }}>
                                        <div style={{ width: '100%', float: 'left' }}>{this.convertDate(cardElement.published_date)}</div>
                                        <div style={{ display: 'flex', marginRight: '6%' }}>

                                            <FacebookShareButton
                                                className="button"
                                                data-tip="Facebook"
                                                hashtag={'#CSCI_571_NewsApp'}
                                                url={cardElement.url}
                                            >
                                                <FacebookIcon
                                                    size={30}
                                                    round={true}
                                                />
                                            </FacebookShareButton>
                                            <TwitterShareButton
                                                url={cardElement.url}
                                                hashtags={['CSCI_571_NewsApp']}
                                                className="button"
                                                data-tip="Twitter">
                                                <TwitterIcon
                                                    size={30}
                                                    round={true}
                                                />
                                            </TwitterShareButton>
                                            <EmailShareButton
                                                subject={'#CSCI_571_NewsApp'}
                                                body={cardElement.url}
                                                url={''}
                                                className="button"
                                                data-tip="Email">
                                                <EmailIcon
                                                    size={30}
                                                    round={true}
                                                />
                                            </EmailShareButton>
                                            <ReactTooltip effect="solid" place="top" />
                                        </div>
                                        {localStorage.getItem(cardElement.url) == null ?
                                            <><div data-tip="Bookmark" style={{ marginTop: '5px', marginLeft: '2%' }} id="bookmark-id1">
                                                <FaRegBookmark style={{ color: 'red' }} className="bookmark" onClick={() => this.displayToast()}></FaRegBookmark>
                                                <ReactTooltip effect="solid" place="top" />
                                            </div>
                                                <div data-tip="Bookmark" style={{ marginTop: '5px', marginLeft: '2%', display: 'none' }} id="bookmark-id2">
                                                    <FaBookmark style={{ color: 'red' }} className="bookmark" onClick={() => this.displayToast()}></FaBookmark>
                                                    <ReactTooltip effect="solid" place="top" />
                                                </div></> :
                                            <> <div data-tip="Bookmark" style={{ marginTop: '5px', marginLeft: '2%' }} id="bookmark-id2">
                                                <FaBookmark style={{ color: 'red' }} className="bookmark" onClick={() => this.displayToast()}></FaBookmark>
                                                <ReactTooltip effect="solid" place="top" />
                                            </div>
                                                <div data-tip="Bookmark" style={{ marginTop: '5px', marginLeft: '2%', display: 'none' }} id="bookmark-id1">
                                                    <FaRegBookmark style={{ color: 'red' }} className="bookmark" onClick={() => this.displayToast()}></FaRegBookmark>
                                                    <ReactTooltip effect="solid" place="top" />
                                                </div></>
                                        }
                                    </div>
                                    <div style={{ marginTop: '15px', marginLeft: '7px' }}>
                                        {/* {cardElement.multimedia[0].url.startsWith("https") ? <Card.Img variant="top" src={cardElement.multimedia[0].url} style={{ width: '98%', height: '70%' }} /> : <Card.Img variant="top" src={"https://static01.nyt.com/" + cardElement.multimedia[0].url} style={{ width: '98%', height: '70%' }}></Card.Img>} */}
                                        {cardElement['imageArr'][0].url.startsWith("https")?<Card.Img variant="top" src={cardElement['imageArr'][0].url} style={{ width: '98%', height: '70%' }}/>:<Card.Img variant="top" src={"https://www.nytimes.com/"+cardElement['imageArr'][0].url} style={{ width: '98%', height: '70%' }}/>}
                                        <div id='short-desc'>
                                            <Card.Text>
                                                <p style={{ fontSize: '14px', textAlign: 'justify', marginRight: '1.75%', marginTop: '2%' }}>{this.lineClamping(cardElement.abstract)}</p>
                                            </Card.Text>
                                            <IoIosArrowDown style={{ float: 'right' }} onClick={this.expandDesc}></IoIosArrowDown>
                                        </div>
                                        <div id='long-desc' style={{ 'display': 'none' }}>
                                            <Card.Text>
                                                <p style={{ fontSize: '14px', textAlign: 'justify', marginRight: '1.75%', marginTop: '2%' }}>{cardElement.abstract}</p>
                                            </Card.Text>
                                            <IoIosArrowUp style={{ float: 'right' }} onClick={this.contractDesc}></IoIosArrowUp>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                            <div style={{ marginTop: '40px' }} className="commentbox" id={cardElement.url} />
                        </div>

                    </>
                )
            }
        }
    
}


export default withRouter(DetailedArticle)