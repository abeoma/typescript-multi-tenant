import configureApplication from "../lib/configureApplication";
import Root from "./containers/Root";
import { assertIsDefined } from "@barasu/common/asserts";
import rootSaga from "./sagas";
import { viewState, entities } from "./reducers";

const app = configureApplication({
  reducers: { viewState, entities },
  saga: rootSaga,
});

const target = document.getElementById("index");
assertIsDefined(target);
app.render(Root, target);
