import configureApplication from "../lib/configureApplication";
import Root from "./containers/Root";
import { assertIsDefined } from "@barasu/common/asserts";

const app = configureApplication();

const target = document.getElementById("index");
assertIsDefined(target);
app.render(Root, target);
