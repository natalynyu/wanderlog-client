import React, { Component } from 'react'
import './Home.scss'
import balloon from '../../css/1.jpg'
import cherry from '../../css/2.jpg'
import snow from '../../css/3.png'
import pic16 from '../../css/16.png'
import pic17 from '../../css/17.png'
import pic18 from '../../css/18.png'

import Map from './Map.js'

class Home extends Component {
  render () {
    return (
      <React.Fragment>
        <section className="welcome">
          <h4>Welcome!</h4>
          <p>Wanderlog is an application where you can share your own curated lists of places to go and things to see as well as find hidden gems shared by others. Whether you’re searching for the most romantic restaurants in town to the highest cliff diving spots in the world, Wanderlog will point you in the right direction. </p>
          <h5>Never Stop Exploring</h5>
          <p>We believe that you should always push yourself to learn, grow, and explore. Our aim is to introduce you to new places and connect you with others who have the same set of interests.</p>
        </section>
        <Map />
        <section className="pictures">
          <img className="balloon" src={balloon} alt="balloon" />
          <img className="snow" src={snow} alt="snow" />
          <img className="cherry" src={cherry} alt="cherry" />
          <img className="pic17" src={pic17} alt="pic17" />
          <img className="pic16" src={pic16} alt="pic16" />
          <img className="pic18" src={pic18} alt="pic18" />
        </section>
      </React.Fragment>
    )
  }
}

export default Home
