import {PuOkCupidClient, PuOkCupidModel, PuOkCupidMode} from "./pu-clients"
import {puOkCupidCredentials, puOkCupidSearchQueryModels} from "./pu-static-data";

function main() {
    const puOkCupidModel = new PuOkCupidModel(PuOkCupidMode.MATCH_USERS, puOkCupidCredentials.mock_user);
        puOkCupidModel.withSearchQuery(puOkCupidSearchQueryModels.London);

    const okCupidClient = new PuOkCupidClient(puOkCupidModel);

    okCupidClient.run();
}

main();


