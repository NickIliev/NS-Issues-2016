var wd = require('wd');

describe("Appium", function() {
    this.timeout(100000);
    var driver;
    
    before("Appium Setup", function() {
        driver = wd.promiseChainRemote('localhost', 4723);
        var testFramework = {
                browserName: '',
                'appium-version': '1.5.2',
                platformName: 'Android', // 'iOS' 
                platformVersion: '5.1.0', // '8.1' 
                deviceName: '', // 'iPhone Simulator'
                app: __dirname + '/../platforms/android/build/outputs/apk/NccmtOutbreakHelp-debug.apk' 
                // __dirname + '/../platforms/ios/build/emulator/crossCommunicator.app' 
            }; return driver.init(testFramework).setImplicitWaitTimeout(3000); 
        }); 
        
    after("Appium Setup", function () { 
        return driver.quit(); 
    }); 
    
    it("should type in an element", function (done) { 
        driver .elementByXPath('//android.widget.EditText[@text=\'Enter your name\']') // '//UITextField[@id=\'name\']' 
        .sendKeys('Testing') 
        .text() 
        .then(function (v) { 
            if ('Testing' !== v) { 
                done(new Error("Value in name field does not match")); 
            } else { 
                done(); 
            } 
        }, done); 
    }); 
});