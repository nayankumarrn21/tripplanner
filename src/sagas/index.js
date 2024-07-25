import { all, fork } from "redux-saga/effects";
import toursSaga from "./toursSaga";

export default function* rootSaga() {
  yield all([fork(toursSaga)]);
}
