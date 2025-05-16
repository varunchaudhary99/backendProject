const InsuranceCompany = require('../model/InsuranceCompany');


getAllCompanies = async (req, res) => {
  try {
    const companies = await InsuranceCompany.find();
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


getCompanyById = async (req, res) => {
  try {
    const company = await InsuranceCompany.findById(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


createCompany = async (req, res) => {
  try {
    const newCompany = new InsuranceCompany(req.body);
    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


updateCompany = async (req, res) => {
  try {
    const updated = await InsuranceCompany.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


deleteCompany = async (req, res) => {
  try {
    const deleted = await InsuranceCompany.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Company not found' });
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  getAllCompanies,
  createCompany,
  updateCompany,
  deleteCompany
};