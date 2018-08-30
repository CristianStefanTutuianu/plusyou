import {PuOkCupidClient} from "./pu-clients"
import testCredentials from "./pu-static-data";

function main() {
    const user = testCredentials.mock_user;
    const okCupidClient = new PuOkCupidClient(user);

    okCupidClient.run();
}

main();


