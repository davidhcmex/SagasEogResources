import { takeEvery, call, put, all, cancel } from "redux-saga/effects";
import API from "../api";
import * as actions from "../actions";

/*
  1. The weather service requires us to make a search by lat/lng to find its
  weather ID.
  2. We then use that weather ID to get the weather.

  This process is pretty well defined here with a saga.

  call invokes a method
  put dispatches an action
  takeEvery watches actions and executes a function

  Also -- the `*` in function is important; turns it into a "generator"

*/



function* watchFetchDroneData(action) {
    const { error, data } = yield call(
      API.findLocationDrone,
    );
    if (error) {
      console.log({ error });
      yield put({ type: actions.API_ERROR, code: error.code });
      yield cancel();
      return;
    }
    console.log(data)
    console.log(data.data[data.data.length-1])
    
    yield put({ type: actions.REQUEST_DRONEDATA_SAGAS_RECEIVED, payload: {"data":[data.data[0]]} });
  
  }


function* watchAppLoad() {
  yield all([
    takeEvery(actions.REQUEST_DRONEDATA_SAGAS, watchFetchDroneData)
  ]);
}

export default [watchAppLoad];