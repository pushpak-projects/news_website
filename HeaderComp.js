import React, { Component } from 'react'
import axios from 'axios';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { Navbar, Nav } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch as RouterSwitch,
    NavLink
} from "react-router-dom";
import Switch from "react-switch";
import AsyncSelect from 'react-select/lib/Async';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import ReactTooltip from 'react-tooltip'
class HeaderComp extends Component {
    constructor(props) {
        super(props);

        if (localStorage.getItem('checked') == "false") {
            this.state = {
                checked: false,
                selectValue: '',
                onAutoSuggest: false,
                isLoading: true,
                navExpanded: false
            }
            
        }
        else {
            this.state = {
                checked: true,
                selectValue: '',
                onAutoSuggest: false,
                isLoading: true,
                navExpanded: false
            }
            localStorage.setItem('checked','true')
        }
        ReactTooltip.rebuild()
        //console.log("headercomp.js cons:", this.props.checked)


        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps() {
        ReactTooltip.rebuild();
        console.log("componentWillReceiveProps of headercomp.js")

    }
    componentDidMount() {
        console.log("componentDidMount of headercomp.js")
        ReactTooltip.rebuild();


    }
    handleChange(checked) {

        this.props.parentChecked(checked)
        this.props.parentLoading()
        ReactTooltip.rebuild()
        this.setState({ 'checked': checked })
        localStorage.setItem('checked', checked)
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
        ReactTooltip.rebuild()

    }
    showBookmark() {
        ReactTooltip.rebuild()
        console.log("inside showBookmark!!!")

        this.props.history.push(`/favourites`);

    }

    setNavExpanded() {
        this.setState({ navExpanded: true });
    }

    closeNav() {
        this.setState({ navExpanded: false });
    }

    render() {
        ReactTooltip.rebuild()
        const { location } = this.props;

        if (location.pathname === '/' || location.pathname === '/world' || location.pathname === '/sports'
            || location.pathname === '/technology' || location.pathname === '/business' || location.pathname === '/politics') {


            return (

                <header style={headerStyle}>

                    <Navbar expand="lg">
                        <div className="autosuggest mr-auto" style={{ minWidth: '20%', color: 'black', marginRight: '1%' }}>
                            <AsyncSelect style={{ width: '100%' }}
                                placeholder="Enter keyword .."
                                loadOptions={_.debounce((query, callback) => this.loadOptions(query, callback), 1000, { leading: true })}
                                onChange={(option) => this.handleItemSelectChange(option)}
                                value=""
                                noOptionsMessage={() => 'No Match'}
                                type="reset"
                            />
                        </div>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="navclass mr-auto">

                                <NavLink exact as={Link} to="/" href="/" activeClassName="active" className="navbarclass">Home</NavLink>
                                <NavLink as={Link} to="/world" href="/world" activeClassName="active" className="navbarclass">World</NavLink>
                                <NavLink as={Link} to="/politics" href="/politics" activeClassName="active" className="navbarclass">Politics</NavLink>
                                <NavLink as={Link} to="/business" href="/business" activeClassName="active" className="navbarclass">Business</NavLink>
                                <NavLink as={Link} to="/technology" href="/technology" activeClassName="active" className="navbarclass">Technology</NavLink>
                                <NavLink as={Link} to="/sports" href="/sports" activeClassName="active" className="navbarclass">Sports</NavLink>
                            </Nav>
                            <Nav className="ml-auto" style={{ marginTop: '1%' }}>

                                <FaRegBookmark className="rightnav1" data-tip="Bookmark" style={{ marginTop: '1.2%' }} onClick={() => this.showBookmark()}></FaRegBookmark>&nbsp;&nbsp;
                                <ReactTooltip />

                                <p className="rightNav2" style={{ paddingRight: '0.4%' }}>NYTimes</p>&nbsp;&nbsp;
                                <label>

                                    <Switch className="rightNav3" onColor={'#00CCFF'} uncheckedIcon={false} checkedIcon={false} onChange={this.handleChange} checked={this.state.checked} />
                                </label>&nbsp;&nbsp;
                                <p className="rightNav4">Guardian</p>

                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>

                </header>

            )
        }
        else {
            if (location.pathname === '/favourites') {
                return (
                    <header style={headerStyle}>
                        <Navbar className="navbar" expand="lg" style={{ minWidth: '20%', color: 'black', marginRight: '1%' }}>
                            <div className="autosuggest mr-auto">
                                <AsyncSelect style={{ width: '100%' }}
                                    placeholder="Enter keyword .."

                                    loadOptions={_.debounce((query, callback) => this.loadOptions(query, callback), 1000, { leading: true })}
                                    onChange={(option) => this.handleItemSelectChange(option)}
                                    value=""
                                    noOptionsMessage={() => 'No Match'}
                                />
                            </div>

                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className=" navclass mr-auto">

                                    <NavLink exact as={Link} to="/" href="/" activeClassName="active" className="navbarclass">Home</NavLink>
                                    <NavLink as={Link} to="/world" href="/world" activeClassName="active" className="navbarclass">World</NavLink>
                                    <NavLink as={Link} to="/politics" href="/politics" activeClassName="active" className="navbarclass">Politics</NavLink>
                                    <NavLink as={Link} to="/business" href="/business" activeClassName="active" className="navbarclass">Business</NavLink>
                                    <NavLink as={Link} to="/technology" href="/technology" activeClassName="active" className="navbarclass">Technology</NavLink>
                                    <NavLink as={Link} to="/sports" href="/sports" activeClassName="active" className="navbarclass">Sports</NavLink>
                                </Nav>
                                <Nav className="ml-auto" style={{ marginTop: '1%' }}>
                                    <FaBookmark data-tip="Bookmark" style={{ color: 'white', marginTop: '1.2%' }} onClick={() => this.showBookmark()}></FaBookmark>
                                    <ReactTooltip effect="solid" />
                                </Nav>

                            </Navbar.Collapse>
                        </Navbar>
                    </header>
                )
            }
            else {


                return (
                    <header style={headerStyle}>
                        <Navbar className="navbar" expand="lg" style={{ minWidth: '20%', color: 'black', marginRight: '1%' }}>
                            <div className="autosuggest mr-auto">
                                <AsyncSelect style={{ width: '100%' }}
                                    placeholder="Enter keyword .."

                                    loadOptions={_.debounce((query, callback) => this.loadOptions(query, callback), 1000, { leading: true })}
                                    onChange={(option) => this.handleItemSelectChange(option)}
                                    value={this.state.selectValue}
                                    noOptionsMessage={() => 'No Match'}
                                />
                            </div>

                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className=" navclass mr-auto">

                                    <NavLink exact as={Link} to="/" href="/" activeClassName="active" className="navbarclass">Home</NavLink>
                                    <NavLink as={Link} to="/world" href="/world" activeClassName="active" className="navbarclass">World</NavLink>
                                    <NavLink as={Link} to="/politics" href="/politics" activeClassName="active" className="navbarclass">Politics</NavLink>
                                    <NavLink as={Link} to="/business" href="/business" activeClassName="active" className="navbarclass">Business</NavLink>
                                    <NavLink as={Link} to="/technology" href="/technology" activeClassName="active" className="navbarclass">Technology</NavLink>
                                    <NavLink as={Link} to="/sports" href="/sports" activeClassName="active" className="navbarclass">Sports</NavLink>
                                </Nav>

                                <Nav className="ml-auto" style={{ marginTop: '1%' }}>
                                    <FaRegBookmark data-tip="Bookmark" style={{ color: 'white', marginTop: '1.2%' }} className="bookmark" onClick={() => this.showBookmark()}></FaRegBookmark>
                                    <ReactTooltip effect="solid" />

                                </Nav>

                            </Navbar.Collapse>
                        </Navbar>
                    </header>
                )
            }
        }

    }
}


const headerStyle = {
    backgroundImage: 'linear-gradient(to right, #000066 , #0066CC)',
    color: '#fff',

    width: "100%"

}


export default withRouter(HeaderComp);

