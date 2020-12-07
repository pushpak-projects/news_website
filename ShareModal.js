import React, { Component } from 'react'
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

export default class ShareModal extends Component {
    /*close()
    {
        //this.props.display='none'
        var x=document.getElementById("share-popup")
        x.style.display='none'
        x=document.getElementById("icons")
        x.style.display='none'
        x=document.getElementById("cross")
        x.style.display='none'
    }*/
    render() {
        return (
            <div id="share-popup" style={{ display: 'flex', width: 'auto' }}>
                <div id="icons">
                    <h3 style={{ textAlign: 'left' }}>{this.props.title}</h3>
                    <hr />
                    <h2 style={{ textAlign: 'center' }}>Share via</h2>
                    <FacebookShareButton className="button"
                        hashtag={'#CSCI_571_NewsApp'}
                        url={this.props.shareUrl}
                        className="button">
                        <FacebookIcon
                            size={80}
                            round={true}
                            style={{ padding: '10px' }} />
                    </FacebookShareButton>
                    <TwitterShareButton
                        url={this.props.shareUrl}
                        hashtags={['CSCI_571_NewsApp']}
                        className="button">
                        <TwitterIcon
                            size={80}
                            round={true}
                            style={{ padding: '10px' }} />
                    </TwitterShareButton>
                    <EmailShareButton
                        subject={'#CSCI_571_NewsApp'}
                        body={this.props.shareUrl}
                        className="button">
                        <EmailIcon
                            size={80}
                            round={true}
                            style={{ padding: '10px' }} />
                    </EmailShareButton>
                </div>
                <div id="cross">
                    {/* <a className="close" onClick={()=>close()}>&times;</a> */}
                </div>
                </div>
        )
    }
}
