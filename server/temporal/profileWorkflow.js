// const { proxyActivities } = require("@temporalio/workflow");
// const { sleep } = require("@temporalio/workflow");

const activities = proxyActivities({
  startToCloseTimeout: "1 minute",
});

async function profileWorkflow(profile) {
  // Wait 10 seconds
  await sleep(10000);
  // Send to crudcrud.com
  await activities.sendToCrudCrud(profile);
}

exports.profileWorkflow = profileWorkflow;
