import configureApplication from "../lib/configureApplication";
import Root from "./containers/Root";
import { assertIsDefined } from "shared/asserts";

const app = configureApplication();

const target = document.getElementById("index");
assertIsDefined(target);
app.render(Root, target);
