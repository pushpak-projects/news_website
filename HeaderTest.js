import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch as RouterSwitch
} from "react-router-dom";
import CardComponent from './CardComponent';
import World from './World';
import Sports from './Sports';
import Technology from './Technology';
import Business from './Business';
import Politics from './Politics';
import DetailedArticle from './DetailedArticle';
import ResultCard from './ResultCard';
import Favourites from './Favourites';
import HeaderComp from './HeaderComp';
import ReactTooltip from 'react-tooltip';
export default class HeaderTest extends Component {
    constructor() {
        super();
        this.state = {checked:null, cardElement : [], dataArr: [], history: null, isLoading: true};
        
        this.handleChange = this.handleChange.bind(this);
        
        ReactTooltip.rebuild();
    }

    componentDidMount()
    {
        
        ReactTooltip.rebuild();
    }
    

    handleChange(checked) {
        this.setState({ checked });
        
    }
    callbackfn(cardElement)
    {
        this.setState({cardElement:cardElement})
        //console.log("hehehehehehehehehe", cardElement.webTitle)
    }
    checkedfn(checked)
    {
        localStorage.setItem('checked',checked)
        this.setState({checked:checked})

    }
    loadingFn(isLoading)
    {
        console.log("inside loadingfn in parent")
        this.setState({isLoading:isLoading})
    }
    optionfn(dataArr)
    {
        this.setState({dataArr:dataArr})
        console.log("result data arr: ",dataArr)
    }
    historyfn(history)
    {
        this.setState({history:history})
    }
    render() {
        //console.log("card element id:",this.state.cardElement.id)
        //console.log(`/article?id=${this.state.cardElement.id}`)
        console.log("welcome back again!!!!")
        return (
            <Router>
                
                <HeaderComp parentHistory={(history)=>this.historyfn(history)} parentChecked={(checked)=>this.checkedfn(checked)} parentLoading={()=>this.loadingFn(true)}></HeaderComp>
                {/* <HeaderComp checked={this.state.checked}></HeaderComp> */}
                <RouterSwitch>
                    <Route exact path="/" component={CardComponent}>
                        {console.log("inside /")}
                        {/* <HeaderComp checked={this.state.checked} parentHistory={(history)=>this.historyfn(history)} parentChecked={(checked)=>this.checkedfn(checked)} parentLoading={()=>this.loadingFn(true)}></HeaderComp> */}
                        <CardComponent isLoading={this.state.isLoading} checked={this.state.checked} parentCallback={(cardElement)=>this.callbackfn(cardElement)}/>
                    </Route>
                    <Route exact path="/world" component={World}>
                    {/* <HeaderComp checked={this.state.checked} parentHistory={(history)=>this.historyfn(history)} parentChecked={(checked)=>this.checkedfn(checked)} parentLoading={()=>this.loadingFn(true)}></HeaderComp> */}
                        <World isLoading={this.state.isLoading}  checked={this.state.checked} parentCallback={(cardElement)=>this.callbackfn(cardElement)}/>
                    </Route>
                    <Route exact path="/politics" component={Politics}>
                    {/* <HeaderComp checked={this.state.checked} parentHistory={(history)=>this.historyfn(history)} parentChecked={(checked)=>this.checkedfn(checked)} parentLoading={()=>this.loadingFn(true)}></HeaderComp> */}
                        <Politics isLoading={this.state.isLoading} checked={this.state.checked} parentCallback={(cardElement)=>this.callbackfn(cardElement)}/>
                    </Route>

                    <Route exact path="/business" component={Business}>
                    {/* <HeaderComp checked={this.state.checked} parentHistory={(history)=>this.historyfn(history)} parentChecked={(checked)=>this.checkedfn(checked)} parentLoading={()=>this.loadingFn(true)}></HeaderComp> */}
                        <Business isLoading={this.state.isLoading} checked={this.state.checked} parentCallback={(cardElement)=>this.callbackfn(cardElement)}/>
                    </Route>
                    <Route exact path="/technology" component={Technology}>
                    {/* <HeaderComp checked={this.state.checked} parentHistory={(history)=>this.historyfn(history)} parentChecked={(checked)=>this.checkedfn(checked)} parentLoading={()=>this.loadingFn(true)}></HeaderComp> */}
                        <Technology isLoading={this.state.isLoading} checked={this.state.checked} parentCallback={(cardElement)=>this.callbackfn(cardElement)}/>
                    </Route>
                    <Route exact path="/sports" component={Sports}>
                       {/* {console.log("inside sports in route: ",this.state.checked)} */}
                       {/* <HeaderComp checked={this.state.checked} parentHistory={(history)=>this.historyfn(history)} parentChecked={(checked)=>this.checkedfn(checked)} parentLoading={()=>this.loadingFn(true)}></HeaderComp> */}
                        <Sports isLoading={this.state.isLoading} checked={this.state.checked} parentCallback={(cardElement)=>this.callbackfn(cardElement)}/>
                    </Route>
                    <Route exact path="/article" component={DetailedArticle}>
                    {/* <HeaderComp checked={this.state.checked} parentHistory={(history)=>this.historyfn(history)} parentChecked={(checked)=>this.checkedfn(checked)} parentLoading={()=>this.loadingFn(true)}></HeaderComp> */}
                        <DetailedArticle isLoading={this.state.isLoading} checked={this.state.checked} cardElement={this.state.cardElement}/>
                    </Route>
                    <Route exact path="/search" component={ResultCard}>
                    {/* <HeaderComp checked={this.state.checked} parentHistory={(history)=>this.historyfn(history)} parentChecked={(checked)=>this.checkedfn(checked)} parentLoading={()=>this.loadingFn(true)}></HeaderComp> */}
                        <ResultCard isLoading={this.state.isLoading} parentCallback={(cardElement)=>this.callbackfn(cardElement)}/>
                    </Route>
                    <Route exact path="/favourites" component={Favourites}> 
                        {/* <HeaderComp checked={this.state.checked} parentHistory={(history)=>this.historyfn(history)} parentChecked={(checked)=>this.checkedfn(checked)} parentLoading={()=>this.loadingFn(true)}></HeaderComp> */}
                        <Favourites isLoading={this.state.isLoading} checked={this.state.checked} parentCallback={(cardElement)=>this.callbackfn(cardElement)}/>
                    </Route>
                    
                </RouterSwitch>
            </Router>

        )

    }
}

