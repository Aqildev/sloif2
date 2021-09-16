// import logo from './logo.svg';
// import './App.css';
// import {useEffect,useState} from 'react'
// import axios from 'axios'
// import {WebSocketClient,NoderedUtil} from '@openiap/openflow-api'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Users from './component/Users/Users';
import Nav from './component/Nav';
import Deal from './component/deals/Deal';
import Activities from './component/Activities/Activities';
import Organizations from './component/Organization/Oraganizations';
import Stages from './component/Stages/Stages';
import DealDetails from './component/deals/DealDetails';
import DealEdit from './component/deals/DealEdit';
import Reports from './component/Reports/Reports';
import { QueryCall } from './Helper/OpenFlowCalls'

// function App() {
// 	const url= window.location.href;
// 	const arr = url.split(":");
// 	console.log(arr)

// 	const [jwt,setJWT]=useState()
// 	const [Url,setUrl]=useState(arr[0] + ":" + arr[1])
// 	const loadToken=async(jwt)=>{
// 		var result = await NoderedUtil.SigninWithToken(null, jwt.rawAssertion, null);
// 		console.log(result)
// 		setJWT(result.jwt)
// 		console.log(result.user)
// 	}
// 	const logger = {
//         info(msg) { console.log(msg); },
//         verbose(msg) { console.debug(msg); },
//         error(msg) { console.error(msg); },
//         debug(msg) { console.debug(msg); },
//         silly(msg) { console.debug(msg); }
//     }
// 	const f2=	async()=>{
// 		console.log(Url)
// 		let data=await fetch(Url+":5000/jwt");
// 		 data=await data.json();
//         if(data.rawAssertion==undefined)
// 		{
// 			window.location.href = Url+":5000/saml"
// 		}    
//         else
// 		{
// 			let config=await fetch(Url+":5000/config");
// 			 config=await config.json();
// 			if(WebSocketClient.instance==null)
// 			{
// 				const cli=new WebSocketClient(logger,config.wsurl)
// 				cli.agent="webapp";
// 				cli.version=config.version
// 				cli.events.on(
// 					'connect',
// 					() => {
// 						// this.logger.info('connected to ' + wsurl);
// 						loadToken(data);
// 					}

// 				)
// 				 cli.connect()
// 			}
// 		}

// 	}
// 	useEffect(() => {
// 		// const url= window.location.href;
// 		// const arr = url.split("/");
// 		// console.log(arr)
// 		// window.location.href = arr[0] + "//" + arr[2] + '/saml';

// 		f2()
// 	}, [])
// 	if(jwt!=null)
// 	{
// 		return (
// 			<div className="App">
// 			  <Router>
// 			  <Nav/>
// 			  <Route path='/users' component={Users}/>
// 			  <Route path='/deals' component={Deal}/>
// 			  <Route path='/Reportdeals' component={Deal}/>
// 			  <Route path='/DealDetail' component={DealDetails}/>
// 			  <Route path='/DealEdit' component={DealEdit}/>
// 			  <Route path='/activities' component={Activities}/>
// 			  <Route path='/organizations' component={Organizations}/>
// 			  <Route path='/stages' component={Stages}/>
// 			  <Route path='/report' component={Reports}/>
// 			  	{/* <Users jwt={jwt}/> */}
// 			  </Router>

// 			</div>
// 		);				
// 	}
// 	else{
// 		return (
// 			null
// 			// <div>Not logged in</div>
// 		);
// 	}

// }
// export default App;






// import {useEffect,useState} from 'react'
// import axios from 'axios'
// import {WebSocketClient,NoderedUtil} from '@openiap/openflow-api'
// // import React, { Component,useState } from 'react';
// import Authenticate from 'react-openidconnect';
// import {OidcSettings} from './component/Auth/oidcsettings';

// const App=()=>{
//   const [usertoken, setUserToken] = useState()
//   const [jwt,setJWT]=useState()
//   const loadToken=async(usertoke)=>{
// 	  console.log(usertoke)
//     var result = await NoderedUtil.SigninWithToken(null, usertoke.id_token, null);
//     console.log(result)
//     // setJWT(usertoke.id_token)
//     // console.log(usertoke.id_token)
// }
// const logger = {
//     info(msg) { console.log(msg); },
//     verbose(msg) { console.debug(msg); },
//     error(msg) { console.error(msg); },
//     debug(msg) { console.debug(msg); },
//     silly(msg) { console.debug(msg); }
// }

// const getUser=async()=>{
// 	// console.log(jwt.location.jwt)
// 	// let data=await QueryCall('pipedrive',{"_type":'user'},20,0,null,jwt.location.jwt)
// 	// setUsers(data)

// 	// console.log(users)
// 	// console.log(page)
// }


//   const userLoaded=async (usertoke)=> {
//     if (usertoke)
//     {
//       console.log(usertoke)
//       setUserToken(usertoke);
//       if(WebSocketClient.instance==null)
//       {
//           const cli=new WebSocketClient(logger,"wss://demo.sloif.dk/")
//           cli.agent="webapp";
//           cli.version="0.1.45"
//           cli.events.on(
//               'connect',
//               () => {
//                   // this.logger.info('connected to ' + wsurl);
//                   loadToken(usertoke);
//               }

//           )
//            cli.connect()

//       }

//       console.log(usertoke)

//     }
//   } 
//   const userUnLoaded=()=> {
//     setUserToken(undefined);
//   } 
//   const  NotAuthenticated=()=> {
//     console.log(OidcSettings)
//     return <button>Authenticate </button>
//   }
//     return (
//       <Authenticate OidcSettings={OidcSettings} userLoaded={userLoaded} userunLoaded={userUnLoaded} renderNotAuthenticated={NotAuthenticated}>
//  			<div className="App">
//  			  <Router>
//  			  <Nav jwt={jwt} />
//  			  <Route path='/users' component={Users}/>
//  			  <Route path='/deals' component={Deal}/>
//  			  <Route path='/Reportdeals' component={Deal}/>
//  			  <Route path='/DealDetail' component={DealDetails}/>
//  			  <Route path='/DealEdit' component={DealEdit}/>
//  			  <Route path='/activities' component={Activities}/>
//  			  <Route path='/organizations' component={Organizations}/>
//  			  <Route path='/stages' component={Stages}/>
//  			  <Route path='/report' component={Reports}/>
//  			  	{/* <Users jwt={jwt}/> */}
//  			  </Router>

//  			</div>
//  		);				

//       </Authenticate>
//     )

// }
// export default App;


import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import axios from 'axios'
import { WebSocketClient, NoderedUtil } from '@openiap/openflow-api'
import Authenticate from 'react-openidconnect';
import { OidcSettings } from './component/Auth/oidcsettings';
// import Auth from './component/Auth/Auth';
import {userUnLoaded,NotAuthenticated} from './component/Auth/Auth'
function App() {
	const [usertoken, setUserToken] = useState()
	const [jwt, setJWT] = useState()
	const logger = {
		info(msg) { console.log(msg); },
		verbose(msg) { console.debug(msg); },
		error(msg) { console.error(msg); },
		debug(msg) { console.debug(msg); },
		silly(msg) { console.debug(msg); }
	}
	
	const loadToken=async()=>{
		console.log(usertoken.id_token)
		var result = await NoderedUtil.SigninWithToken(null, usertoken.id_token, null);
		console.log(result)
		setJWT(result.jwt)
		console.log(result.usertoken)
	}
	const SocketConnect=async()=>{
		if(WebSocketClient.instance==null)
		{
			const cli=new WebSocketClient(logger,"wss://demo.sloif.dk/")
			cli.agent="webapp";
			cli.version="1.3.75 "
			cli.events.on(
				'connect',
				() => {
					// this.logger.info('connected to ' + wsurl);
					loadToken();
				}
  
			)
			 await cli.connect()
		}
  
	}


	useEffect(()=>{
		console.log('jwt',jwt)
	},[jwt])
	useEffect(()=>{
		console.log("sadsadsaadsad")
		if(usertoken)
		{
			SocketConnect()
		}
	})
	useEffect(()=>{
		if(usertoken && WebSocketClient.instance==null)
		{
			SocketConnect()
		}
	},[usertoken])
	// const userUnLoaded = () => {
	// 	setUserToken(undefined);
	// }
	// const NotAuthenticated = () => {
	// 	console.log(OidcSettings)
	// 	return <button>Authenticate </button>
	// }
	if (jwt && WebSocketClient.instance)
	{
		console.log("jwt is")
		return (
			<div className="App">
			  <Router>
			  <Nav/>
			  <Route path='/users' component={Users}/>
			  <Route path='/deals' component={Deal}/>
			  <Route path='/Reportdeals' component={Deal}/>
			  <Route path='/DealDetail' component={DealDetails}/>
			  <Route path='/DealEdit' component={DealEdit}/>
			  <Route path='/activities' component={Activities}/>
			  <Route path='/organizations' component={Organizations}/>
			  <Route path='/stages' component={Stages}/>
			  <Route path='/report' component={Reports}/>
			  	{/* <Users jwt={jwt}/> */}
			  </Router>

			</div>
		);				


	}
	else
		return (
			<Authenticate OidcSettings={OidcSettings} userLoaded={(token) =>setUserToken(token)} userunLoaded={(setUserToken)=>userUnLoaded(setUserToken)} renderNotAuthenticated={NotAuthenticated}>
				<div></div>
			{/* <div className="App">
			  <Router>
			  <Nav/>
			  <Route path='/users' component={Users}/>
			  <Route path='/deals' component={Deal}/>
			  <Route path='/Reportdeals' component={Deal}/>
			  <Route path='/DealDetail' component={DealDetails}/>
			  <Route path='/DealEdit' component={DealEdit}/>
			  <Route path='/activities' component={Activities}/>
			  <Route path='/organizations' component={Organizations}/>
			  <Route path='/stages' component={Stages}/>
			  <Route path='/report' component={Reports}/>
			  </Router>

			</div> */}
			</Authenticate>

		)
	// if(jwt!=null)
	// {
	// 	return (
	// 		<div className="App">
	// 		  <Router>
	// 		  <Nav/>
	// 		  <Route path='/users' component={Users}/>
	// 		  <Route path='/deals' component={Deal}/>
	// 		  <Route path='/Reportdeals' component={Deal}/>
	// 		  <Route path='/DealDetail' component={DealDetails}/>
	// 		  <Route path='/DealEdit' component={DealEdit}/>
	// 		  <Route path='/activities' component={Activities}/>
	// 		  <Route path='/organizations' component={Organizations}/>
	// 		  <Route path='/stages' component={Stages}/>
	// 		  <Route path='/report' component={Reports}/>
	// 		  	{/* <Users jwt={jwt}/> */}
	// 		  </Router>

	// 		</div>
	// 	);				
	// }
	// else{
	// 	return (
	// 		null
	// 		// <div>Not logged in</div>
	// 	);
	// }

}
export default App;


