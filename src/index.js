import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import CardSpace from './Projects';
import NavBar from './NavBar';
import { Footer } from './Footer';
import { SummarySpace } from './Summary';



// const greeting = <h2>Hi myki :)</h2>;



// class CarouselCards extends React.Component {
//   render() {
//     return(
//         <div></div>
//     );
//   }
// }


class PageLayout extends React.Component {
  render() {
    return(
      <div class="container-fluid">
          <div class="row" id="introSpace">
            <div class="col-md">
              <NavBar />
            </div>
            <div class="col-md" id="summarySpace">
              <SummarySpace />
            </div>
          </div>
          <div class="row" id="projectSpace">
            <CardSpace/>
          </div>
          <div class="row" id="footerSpace">
            <div class="col-md">
              <Footer />
            </div>
          </div>
      </div>
    );
  }
}



ReactDOM.render(
  <PageLayout />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
