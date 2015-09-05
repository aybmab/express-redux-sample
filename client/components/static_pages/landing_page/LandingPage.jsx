import './LandingPage.css';
import React, { Component, PropTypes } from 'react';

class LandingPageHeader extends Component {
	render() {
		return (
			<div className="landing-page-header-container">
				<div className="landing-page-header-container-title">
					Sample App
				</div>
				<div className="landing-page-header-container-subtitle">
					Here's one way to build an App!
				</div>

			</div>);
	}
}

// TODO include option for button
// 			i.e.
// 				// <div className="col-lg-4">
	        //   <img className="img-circle" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Generic placeholder image" width="140" height="140"/>
	        //   <h2>Heading</h2>
	        //   <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
	        //   <p><a className="btn btn-default" href="#" role="button">View details »</a></p>
	        // </div>
// TODO props-isize the image
class LandingPageColumn extends Component {
	render() {
		return (
			<div className="col-lg-4">
        <img className="img-circle" src={this.props.imageSrc} alt="Generic placeholder image" width="140" height="140"/>
        <h2>{this.props.heading}</h2>
        <p>{this.props.text}</p>
      </div>
		);
	}
}

class LandingPageThreeColumnSection extends Component {
	render() {
		return (
			<div className="container landing-page-three-column-section">

	      <div classNames="row">
	      	<LandingPageColumn 
	      		heading={"Express"}
	      		text={"Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna."}
	      		imageSrc={"somePathToAnImage"}
	      	/>
	      	<LandingPageColumn 
	      		heading={"Redux"}
	      		text={"Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna."}
	      		imageSrc={"/somePathToAnImage"}
	      	/>
	      	<LandingPageColumn 
	      		heading={"Other Stuff"}
	      		text={"Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna."}
	      		imageSrc={"somePathToAnImage"}
	      	/>
	      </div>

	    </div>

		);
	}
}


export default class LandingPage extends Component {
  render() {
    return (
      <div className="">
      	<LandingPageHeader />

        <LandingPageThreeColumnSection />
           
      </div>
    );
  }
}
