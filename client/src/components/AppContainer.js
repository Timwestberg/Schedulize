import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SideNavigation from "./SideNav/index";
import TopNavigation from "./TopNav/index";
import Map from "../pages/Map";
import Schedulize from "../pages/Schedulize";
import AddressBook from "../pages/AddressTable";
import API from "../utils/API";
import "./ApptMapCard/ScrollBarThin/style.css";
import Calendar from "../pages/Calendar";
import createHistory from "history/createBrowserHistory";
import Appointments from "../pages/Appointments";
import Routes from "./RoutesWithNavigation";
const history = createHistory();

class RoutesWithNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      windowWidth: 0,
      currentPage: "",
      sideNavToggled: false,
      breakWidth: 1400,
      contractors: [],
      appointments: [],
      clients: [],
      contractorCoords: [],
      appointmentCoords: []
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
    this.loadContractors();
    this.loadAppointments();
    this.loadClients();
    // console.log(`containter ${appointments}`);
  }

  loadContractors = () => {
    API.getContractors()
      .then(res => {
        // console.log('contractor ', res.data);
        //map through contractor state and adding id to argument
        res.data.map((contractor, contractoridx) => {
          this.ContractorGeocode(contractor.address, contractoridx);
        });
        this.setState({
          contractors: res.data
        });
      })
      .catch(err => console.log(err));
  };

  /**
   * Using API to load information from MONGODB |
   * Appointment infromation |
   * Handles geocoding address*/
  loadAppointments = () => {
    API.getAppts()
      .then(res => {
        // console.log('appointment ', res.data);
        //map through appointment state and adding id to argument
        res.data.map((appointment, appointmentidx) => {
          this.apptGeocode(appointment.address, appointmentidx);
        });
        this.setState({
          appointments: res.data
        });
        // console.log('Appt state:' + this.state.appointments[0].address);
      })
      .catch(err => console.log(err));
  };

  /**
   * Using API to load information from MONGODB |
   * Client infromation |
   * Handles geocoding address*/
  loadClients = () => {
    API.getClients()
      .then(res => {
        // console.log('client ', res.data);
        this.setState({
          clients: res.data
        });
        console.log(`Clients State: ${this.state.clients[0]}`);
      })
      .catch(err => console.log(err));
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth
    });
  };

  toggleSideNav = () => {
    if (this.state.windowWidth < this.state.breakWidth) {
      this.setState({
        sideNavToggled: !this.state.sideNavToggled
      });
    }
  };

  //   renderPage = () => {
  //     const {
  //       contractors,
  //       clients,
  //       appointments,
  //       contractorCoords,
  //       appointmentCoords
  //     } = this.state;
  //     if (this.state.currentPage === "Calendar") {
  //       return (
  //         <Calendar
  //           contractors={contractors}
  //           clients={clients}
  //           appointments={appointments}
  //         />
  //       );
  //     } else if (this.state.currentPage === "AddressBook") {
  //       return (
  //         <AddressBook
  //           contractors={contractors}
  //           clients={clients}
  //           appointments={appointments}
  //         />
  //       );
  //     } else if (this.state.currentPage === "Map") {
  //       // const dynamicLeftPadding = {
  //       //   paddingLeft:
  //       //     this.state.windowWidth > this.state.breakWidth ? "240px" : "0"
  //       // };
  //       return (
  //         <Map
  //           triggerOpening={this.state.sideNavToggled}
  //           contractors={contractors}
  //           clients={clients}
  //           appointments={appointments}
  //           contractorCoords={contractorCoords}
  //           appointmentCoords={appointmentCoords}
  //         />
  //       );
  //     }
  //   };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  /**
   *Documentation for geocoding found here https://www.npmjs.com/package/react-geocode*/
  ContractorGeocode = (location, contractoridx) => {
    console.log(location);
    API.getGeocode(location)
      .then(res => {
        // console.log(res.data);
        const { lat, lng } = res.data.results[0].geometry.location;
        let contractorCoords = this.state.contractorCoords[contractoridx] || {};
        contractorCoords = { lat: lat, lng: lng };
        this.state.contractorCoords[contractoridx] = contractorCoords;
        this.setState({
          contractorCoords: this.state.contractorCoords
        });
        // console.log('COORDS', lat, lng, contractoridx);
        // return res.data.results[0].geometry.location;
      })
      .catch(err => console.log(err));
  };

  /**
   *Documentation for geocoding found here https://www.npmjs.com/package/react-geocode*/
  apptGeocode = (location, appointmentidx) => {
    API.getGeocode(location)
      .then(res => {
        // console.log(res.data);
        const { lat, lng } = res.data.results[0].geometry.location;
        let appointmentCoords =
          this.state.appointmentCoords[appointmentidx] || {};
        appointmentCoords = { lat: lat, lng: lng };
        this.state.appointmentCoords[appointmentidx] = appointmentCoords;
        this.setState({
          appointmentCoords: this.state.appointmentCoords
        });

        // console.log('APPT COORDS', lat, lng, appointmentidx);
        // return res.data.results[0].geometry.location;
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Fragment>
        <Routes
          appointments={this.state.appointments}
          contractors={this.state.contractors}
          clients={this.state.clients}
        />
      </Fragment>
    );
  }
}

export default RoutesWithNavigation;
