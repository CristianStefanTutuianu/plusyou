import {PuOkCupidClient, PuOkCupidModel, PuOkCupidMode} from "./pu-clients"
import puOkCupidCredentials from "./pu-static-data";

function main() {
    const puOkCupidModel = new PuOkCupidModel(PuOkCupidMode.MATCH_USERS, puOkCupidCredentials.mock_user);
    const okCupidClient = new PuOkCupidClient(puOkCupidModel);

    okCupidClient.run();
}

main();


