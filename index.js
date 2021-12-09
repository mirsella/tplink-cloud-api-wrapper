require('dotenv').config({ path: '~/.config/token/tapo.token'});
const { login } = require("tplink-cloud-api");
(async () => {
  const tplink = await login(process.env.user, process.env.password);
  const deviceList = await tplink.getDeviceList();
  // doesn't support P100 plug which is what i got :(
  const device = await tplink.getHS100(deviceList[0].deviceId);
  console.log(device)
  //check if node argument include on/off
  if(process.argv.includes('on')) {
    await device.powerOn();
  } else if(process.argv.includes('off')) {
    await device.powerOff();
  } else if(process.argv.includes('toggle')) {
    await device.toggle();
  } else if(process.argv.includes('powerinfo')) {
    console.log(device.getPowerUsage())
  } else {
    console.log('no argument')
  }
})();
