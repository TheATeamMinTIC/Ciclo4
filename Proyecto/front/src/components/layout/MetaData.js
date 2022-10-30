import React from 'react'
import {Helmet} from 'react-helmet'

const MetaData = ({tittle}) =>{
    return(
        <Helmet>
            <tittle>{`${tittle}- NOVA Courses`}</tittle>
        </Helmet>
    )
}
export default MetaData