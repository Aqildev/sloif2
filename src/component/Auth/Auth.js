import React, { Component,useState } from 'react';
import Authenticate from 'react-openidconnect';
import {OidcSettings} from './oidcsettings';
import {WebSocketClient,NoderedUtil} from '@openiap/openflow-api'
import { Button } from '@material-ui/core';


// const Auth=()=>{
//   const loadToken=async(usertoken,setJWT)=>{
//     console.log(usertoken.id_token)
//     var result = await NoderedUtil.SigninWithToken(null, usertoken.id_token, null);
//     console.log(result)
//     setJWT(result.jwt)
//     console.log(result.usertoken)
// }
// const logger = {
//     info(msg) { console.log(msg); },
//     verbose(msg) { console.debug(msg); },
//     error(msg) { console.error(msg); },
//     debug(msg) { console.debug(msg); },
//     silly(msg) { console.debug(msg); }
// }

// export   const userLoaded=async (usertoken,setUserToken,setJWT)=> {
//     if (usertoken)
//     {
//       await setUserToken(usertoken);
//       if(WebSocketClient.instance==null)
//       {
//           const cli=new WebSocketClient(logger,"wss://demo.sloif.dk/")
//           cli.agent="webapp";
//           cli.version="1.3.75 "
//           cli.events.on(
//               'connect',
//               () => {
//                   // this.logger.info('connected to ' + wsurl);
//                   loadToken(usertoken,setJWT);
//               }

//           )
//            cli.connect()
//       }
//       console.log(usertoken)

//     }
//   } 
export  const userUnLoaded=(setUserToken)=> {
    setUserToken(undefined);
  } 
export  const  NotAuthenticated=()=> {
    console.log(OidcSettings)
    return( 
    <div>
      <Button variant="contained" color="primary">Authenticate</Button>
    </div>
    )
  }
    // return (
    //   <Authenticate OidcSettings={OidcSettings} userLoaded={userLoaded} userunLoaded={userUnLoaded} renderNotAuthenticated={NotAuthenticated}>
    //   </Authenticate>
    // )

// }
// export default Auth;