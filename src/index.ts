import {PuOkCupidClient, PuOkCupidModel} from "./pu-clients"
import testCredentials from "./pu-static-data";
import { OkCupidMode } from "./pu-clients/pu-okcupid/SharedTypes";

function main() {
    const puOkCupidModel = new PuOkCupidModel(OkCupidMode.MATCH_USERS, testCredentials.mock_user);
    const okCupidClient = new PuOkCupidClient(puOkCupidModel);

    okCupidClient.run();
}

main();


