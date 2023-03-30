import React from 'react';
import "./App.css";

const App = () => {
  return (
    <>
      <body>
        <h1>Where are you working this week?</h1>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name"/><br/><br/>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email"/><br/><br/>

        <div id="dateContainer">Loading...</div>

        <div className="calendar">
          <header>
              <button className="secondary">Today</button>
              <div className="calendar__title">
                <div className="icon secondary chevron_left">‹</div>
                <h1 className=""><span></span><strong>18 JAN – 24 JAN</strong> 2016</h1>
                <div className="icon secondary chevron_left">›</div>
              </div> 
              <div></div>
          </header>
          
          <div className="outer">
          
          
            <table>
              <thead>
                <tr>
                  <th className="headcol"></th>
                  <th>Mon, 18</th>
                  <th>Tue, 19</th>
                  <th className="today">Wed, 20</th>
                  <th>Thu, 21</th>
                  <th>Fri, 22</th>
                </tr>
              </thead>
            </table>
        
            <div className="wrap"> 
              <table className="offset">
            
                <tbody>
                  <tr>
                    <td className="headcol">Work location</td>
                    <td ></td>      
                    <td id="dayTwo"></td>
                    <td></td>
                    <td></td>
                    <td></td>      
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      
      </body>
    </>
)};

export default App;