

import {  } from "../sagas/CartSaga"
;



export default function* rootSaga() {
    yield all([
      CartSaga(),
    ])
  }