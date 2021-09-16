import React from 'react'
import { Link } from 'react-router-dom'
export default function Nav(jwt) {
    return (
        <div>
            <li><Link to={{ pathname: '/users'} }>
                users
            </Link></li>
            <li><Link to='/deals'>
                deals
            </Link></li>
            <li><Link to='/activities'>
                activities
            </Link></li>
            <li><Link to='/organizations'>
                oraganizations
            </Link></li>
            <li><Link to='/stages'>
                stages
            </Link></li>
            <li><Link to='/Report'>
                Reports
            </Link></li>

        </div>
    )
}
