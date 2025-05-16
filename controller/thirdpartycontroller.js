const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../config/thirdparty.json');

let thirdPartyData = require('../config/thirdparty.json');

const saveData = () => {
  fs.writeFileSync(dataPath, JSON.stringify(thirdPartyData, null, 2), 'utf-8');
};

const thirdpartygetAllPlans = (req, res) => {
  res.json(thirdPartyData);
};

const thirdpartycreatePlan = (req, res) => {
  const newPlan = req.body;
  if (
    !newPlan.company ||
    !newPlan.planName ||
    !newPlan.coverage ||
    typeof newPlan.startingPrice !== 'number' ||
    !newPlan.planUrl
  ) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (thirdPartyData.find(p => p.company.toLowerCase() === newPlan.company.toLowerCase())) {
    return res.status(409).json({ message: 'Company already exists' });
  }

  thirdPartyData.push(newPlan);
  saveData();
  res.status(201).json(newPlan);
};

const thirdpartyupdatePlan = (req, res) => {
  const { company } = req.params;
  const index = thirdPartyData.findIndex(p => p.company.toLowerCase() === company.toLowerCase());

  if (index === -1) return res.status(404).json({ message: 'Company not found' });

  thirdPartyData[index] = { ...thirdPartyData[index], ...req.body };
  saveData();
  res.json(thirdPartyData[index]);
};

const thirdpartydeletePlan = (req, res) => {
  const { company } = req.params;
  const index = thirdPartyData.findIndex(p => p.company.toLowerCase() === company.toLowerCase());

  if (index === -1) return res.status(404).json({ message: 'Company not found' });

  const removed = thirdPartyData.splice(index, 1);
  saveData();
  res.json({ message: 'Deleted', data: removed[0] });
};

module.exports = {
  thirdpartygetAllPlans,
  thirdpartycreatePlan,
  thirdpartyupdatePlan,
  thirdpartydeletePlan
};
