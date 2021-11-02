import configureApplication from "../lib/configureApplication";
import Root from "./containers/Root";
import { assertIsDefined } from "@barasu/common/asserts";
import rootSaga from "./sagas";

const app = configureApplication(rootSaga);

const target = document.getElementById("index");
assertIsDefined(target);
app.render(Root, target);
