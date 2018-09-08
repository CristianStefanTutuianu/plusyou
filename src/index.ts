import {PuOkCupidMode} from "./pu-clients"
import { puOkCupidCredentials, puOkCupidSearchQueryModels} from "./pu-static-data";
import { PuOkCupidBot } from "./pu-bots";


function main() {
    const puOkCupidBot = new PuOkCupidBot(puOkCupidCredentials.mock_user);
    puOkCupidBot.run(PuOkCupidMode.MATCH_USERS, puOkCupidSearchQueryModels.London);
}

main();


