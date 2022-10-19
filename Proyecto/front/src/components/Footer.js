import React, { Fragment } from 'react'

const Footer = () => {
  return (
    <Fragment>
        <footer className='py-1'>
            <p className='text-center mt-1'>
                Cursos online proyecto práctico ciclo 4 MinTIC &copy; {new Date().getFullYear()}
            </p>
        </footer>


    </Fragment>
  )
}

export default Footer