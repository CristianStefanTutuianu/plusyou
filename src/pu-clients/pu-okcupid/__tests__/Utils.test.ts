import {getOkCupidHeaders} from "../Utils";

describe("Utils", ()=> {
    
    describe("getOkCupidHeaders", ()=> {
        
        test("# should get headers with oauthToken if argument is present", () => {
            const mockOauthToken = "mockOauthToken";
            const expectedOutput = {
                'x-okcupid-platform':'DESKTOP',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36',
                'authorization' : 'Bearer mockOauthToken'
              }
           
            const actual =  getOkCupidHeaders(mockOauthToken);
    
            expect(actual).toEqual(expectedOutput);
        });

        test("# should get headers without oauthToken if argument is not present", () => {
            const expectedOutput = {
                'x-okcupid-platform':'DESKTOP',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.143 Safari/537.36',
              }
           
            const actual = getOkCupidHeaders();
    
            expect(actual).toEqual(expectedOutput);
        });
    });
})