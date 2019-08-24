import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";

import Calendar from "./Calendar";
import Map from "./Map";
import TopBar from "../components/TopNav/index";
import AddressBook from "./AddressTable";

class Schedulize extends React.Component {
  render() {
    const { contractors, clients } = this.props;
    console.log({ contractors });
    return (
      
        <Switch>
          <Route path='/calendar' exact component={Calendar} />
          <Route path='/map' exact component={Map} />
          <Route path='/addressbook' exact component={AddressBook} />
        </Switch>
      
    );
  }
  //   state = {
  //     currentPage: "AddressBook"
  //   };

  //   handlePageChange = page => {
  //     this.setState({ currentPage: page });
  //   };

  //   renderPage = () => {
  //     const { contractors, clients } = this.props;
  //     switch (this.state.currentPage) {
  //       case "calendar":
  //         return (
  //           <Route path='/calendar' exact component={Calendar}>
  //             <Calendar />
  //           </Route>
  //         );
  //       case "addressBook":
  //         return (
  //           <Route path='/addressbook' exact component={AddressBook}>
  //             <AddressBook contractors={contractors} clients={clients} />
  //           </Route>
  //         );
  //       case "map":
  //         return (
  //           <Route path='/map' exact component={Map}>
  //             <Map />
  //           </Route>
  //         );
  //     }
  //   };

  //   render() {
  //     return (
  //       <div>
  //         <TopBar
  //           currentPage={this.state.currentPage}
  //           handlePageChange={this.handlePageChange}
  //         />
  //         {this.renderPage()}
  //       </div>
  //     );
  //   }
}

export default Schedulize;
