const OnDamagePlan = require('../model/ondamage_schema');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../config/onDamage.json');

const getAllPlans = async (req, res) => {
  try {
    const plans = await OnDamagePlan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


  getPlanByCompany = async (req, res) => {
  const company = req.params.company.toLowerCase();
  try {
    const plan = await OnDamagePlan.findOne({ company: { $regex: new RegExp(company, 'i') } });
    if (!plan) return res.status(404).json({ message: 'Company not found' });
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


const createPlan = async (req, res) => {
  try {
    const newPlan = new OnDamagePlan(req.body);
    const saved = await newPlan.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Error creating plan', error });
  }
};


const updatePlan = async (req, res) => {
  const company = req.params.company.toLowerCase();
  try {
    const updated = await OnDamagePlan.findOneAndUpdate(
      { company: { $regex: new RegExp(company, 'i') } },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Company not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating plan', error });
  }
};


const deletePlan = async (req, res) => {
  const company = req.params.company.toLowerCase();
  try {
    const deleted = await OnDamagePlan.findOneAndDelete({ company: { $regex: new RegExp(company, 'i') } });
    if (!deleted) return res.status(404).json({ message: 'Company not found' });
    res.json({ message: 'Deleted', data: deleted });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting plan', error });
  }
};


seedPlans = async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    await OnDamagePlan.deleteMany({});
    const saved = await OnDamagePlan.insertMany(data);
    res.status(201).json({ message: 'Seeded successfully', count: saved.length });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding data', error });
  }
};
module.exports = {
  getAllPlans,
  createPlan,
  updatePlan,
  deletePlan
};