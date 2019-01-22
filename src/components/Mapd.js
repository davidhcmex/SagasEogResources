import React, { Component } from 'react';
import { connect } from "react-redux"
import { withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import * as actions from "../store/actions";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'

class Map extends Component {

    componentDidMount() {
        setInterval(() => {
            this.props.loadDataSagas()
        }, 4000)

    }


    render() {
        const GoogleMapDronePosition = withGoogleMap(props => (
            <GoogleMap
                defaultCenter={{ lat: 29.7604, lng: -95.3698 }}
                defaultZoom={5}
            >

                {(this.props.data.length !== 0) ?
                    (

                        <Marker

                            position={{ lat: this.props.data[0].latitude, lng: this.props.data[0].longitude }}
                        />)


                    :
                    (null)
                }

            </GoogleMap>

        ));

        if (this.props.loading) {
            return <div>Loading...</div>;
        }
        let arr = []

        this.props.data.map((elem) => {
            arr.push([elem.timestamp, elem.metric])
            return null
        })

        return (
            <Table>
                <TableBody>
                    <TableRow >

                        <TableCell><GoogleMapDronePosition
                            containerElement={<div style={{ height: `400px`, width: '400px' }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        /></TableCell>
                        <TableCell>
                            <TextField
                               value = {this.props.data.length !== 0 ? this.props.data[0].latitude : ""}
                               label= "Latitude"
                            />
                            <br />
                             <TextField
                               value = {this.props.data.length !== 0 ? this.props.data[0].longitude : ""}
                               label= "Latitude"
                            />
                             <br />
                             <TextField
                               value = {this.props.data.length !== 0 ? this.props.data[0].metric : ""}
                               label= "Latitude"
                            />
                            <br />

                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        );
    }
};

const mapStateToProps = (state) => {
    console.log(state.droneData.data)
    return {
        data: state.droneData.data,
        loading: state.droneData.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        loadDataSagas: () =>
            dispatch({
                type: actions.REQUEST_DRONEDATA_SAGAS,
            })
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)